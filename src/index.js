require('dotenv').config();
const { Client, IntentsBitField, GuildMember, ModalBuilder,TextInputBuilder,
     TextInputStyle, ActionRowBuilder, Events  } = require('discord.js');
const sheetdb = require('./sheetdb.js')
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildPresences,
    ],
});
const guildMember = new GuildMember({


})


client.on('ready', (c) => {
    console.log(`${c.user.username} is online`);

});

client.on('messageCreate', (message) => {


    if (message.author.bot && message.author.username == "MEE6" && message.content.includes("Hey ")) {

        newJoinerId = parseUserIDFromMessage(message.content);

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

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand) return;

    console.log(interaction.commandName);
    if (interaction.commandName === 'add-buddy') {
        const modal = new ModalBuilder()
            .setCustomId('buddy-modal')
            .setTitle('Add Buddies')

        // Create the text input components
        const firstBuddy = new TextInputBuilder()
            .setCustomId('firstBuddy')
            // The label is the prompt the user sees for this input
            .setLabel("First Buddy")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);

        const secondBuddy = new TextInputBuilder()
            .setCustomId('secondBuddy')
            .setLabel("Second Buddy")
            .setStyle(TextInputStyle.Short);
    
        const thirdBuddy = new TextInputBuilder()
        .setCustomId('thirdBuddy')
        .setLabel("Third Buddy")
        .setStyle(TextInputStyle.Short);

        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(firstBuddy);
        const secondActionRow = new ActionRowBuilder().addComponents(secondBuddy);
        const thirdActionRow = new ActionRowBuilder().addComponents(thirdBuddy);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

        await interaction.showModal(modal);
        console.log('in add-buddy handler');
    }
});

client.on(Events.InteractionCreate, interaction =>{
    let redefenders_test_id = 1165057140466122802;
    if(interaction.commandName === 'reminder'){
        interaction.reply(`Reminder! @<${redefenders_test_id}>, @redefender, @buddy3 Cycle ends tonight. Please nominate new buddies before then by typing /add-buddy`)
    }

})

client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isModalSubmit()) return;
	console.log(interaction);
    interaction.reply('Modal submitted!');
});


client.login(process.env.TOKEN)

/*
**Welcome Message is formatted as "Hey <102425264>, ...."
*/
function parseUserIDFromMessage(message) {

    messageList = message.split(' ');

    unparsedUserID = messageList[1];

    // take out <@ >
    userID = unparsedUserID.replace('<', '');
    userID = userID.replace('@', '');
    userID = userID.replace('>', '');

    //take out ,
    userID = userID.replace(',', '');

    return userID;
}