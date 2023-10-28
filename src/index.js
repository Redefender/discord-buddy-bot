require('dotenv').config();
const { Client, IntentsBitField, GuildMember, SlashCommandBuilder, Events, Collection } = require('discord.js');
const fs = require('node:fs');
const parser = require('./Utils/parser')
const path = require('node:path');

const sheetdb = require('./sheetdb.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences,
    ],
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Grab commands from command directory
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


client.on('ready', (c) => {
    console.log(`${c.user.username} is online`);

});

client.on('messageCreate', (message) => {


    if (message.author.bot && message.author.username == "MEE6" && message.content.includes("Hey ")) {

        newJoinerId = parser.parseUserIDFromMessage(message.content);

        //iterate through current member list and match with newjoiner id
        client.guilds.fetch(process.env.GUILD_ID).then(guild => {
            guild.members.fetch().then((memberList) => {
                for (mem of memberList) {

                    if (mem[1] == newJoinerId) {

                        console.log(`member is ${JSON.stringify(mem)}`)
                        let newMemberModel = {
                            displayName: mem[1].displayName,
                            userId: mem[0]
                        }
                        sheetdb.postNewJoiner(newMemberModel);

                    }
                }
            });
        });
    }

});

// Interactions are modal inputs, slash commands, etc.
client.on(Events.InteractionCreate, async (interaction) => {
    // return if not slash command
    if (!interaction.isChatInputCommand) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

client.on(Events.InteractionCreate, interaction => {
    let redefenders_test_id = 1165057140466122802;
    if (interaction.commandName === 'reminder') {
        interaction.reply(`Reminder! @<${redefenders_test_id}>, @redefender, @buddy3 Cycle ends tonight. Please nominate new buddies before then by typing /add-buddy`)
    }

})

client.login(process.env.TOKEN)

