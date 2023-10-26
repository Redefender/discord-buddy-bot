const { SlashCommandBuilder } = require('discord.js');
const sheetDB = require('../../sheetdb.js');
const axios = require('axios');
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
        try{
            sheetDB.postNewBuddies(buddy1,buddy2,buddy3);
        } catch(error){
            console.log('error SheetDB postNewBuddies: ' + error);
        }
        

        await interaction.reply(`${buddy1}, ${buddy2}, and ${buddy3} was added to the upcoming cycle!`);
    }
}

