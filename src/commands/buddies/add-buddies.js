const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('add-buddies')
    .setDescription('add buddies for the upcoming buddy cycle')
    .addUserOption(option=>
        option.setName('buddy1')
            .setDescription('first buddy')
            .setRequired(true))
    .addUserOption(option=>
        option.setName('buddy2')
            .setDescription('second buddy')
            .setRequired(true))
    .addUserOption(option=>
        option.setName('buddy3')
            .setDescription('third buddy')
            .setRequired(true))

module.exports = {
    data: data,
    async execute(interaction){
        const buddy1 = interaction.options.getUser('buddy1');
        const buddy2 = interaction.options.getUser('buddy2');
        const buddy3 = interaction.options.getUser('buddy3');

        await interaction.reply(`${buddy1}, ${buddy2}, and ${buddy3} was added to the upcoming cycle!`);
    }
}

