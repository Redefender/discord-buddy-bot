require('dotenv').config();
const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: 'add-buddy',
        description: 'add a buddy to the upcoming buddy cycle'
    },
    {
        name: 'reminder',
        description: 'remind current buddies to nominate new buddy'
    }
]

const rest = new REST().setToken(process.env.TOKEN);
(async () => {
    try {
        console.log('registering commands');
        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        )
        console.log('slash commands registered succesfully!');
    } catch (error) {
        console.log('Error at: ' + error);
    }

})();

