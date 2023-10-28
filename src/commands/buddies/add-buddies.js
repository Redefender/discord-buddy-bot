const { SlashCommandBuilder } = require('discord.js');
const sheetDB = require('../../sheetdb.js');
const axios = require('axios');
const data = new SlashCommandBuilder()
    .setName('add-buddies')
    .setDescription('add buddies for the upcoming buddy cycle')
    .addUserOption(option =>
        option.setName('buddy1')
            .setDescription('first buddy')
            .setRequired(true))
    .addUserOption(option =>
        option.setName('buddy2')
            .setDescription('second buddy')
            .setRequired(true))
    .addUserOption(option =>
        option.setName('buddy3')
            .setDescription('third buddy')
            .setRequired(true))

module.exports = {
    data: data,
    async execute(interaction) {
        const buddy1 = interaction.options.getUser('buddy1');
        const buddy2 = interaction.options.getUser('buddy2');
        const buddy3 = interaction.options.getUser('buddy3');

        const postNewBuddies = new Promise(function (resolve, reject) {
            console.log('inside executor function')
            try {
                sheetDB.postNewBuddies(buddy1, buddy2, buddy3);
                let buddies = [buddy1, buddy2, buddy3];
                resolve(buddies);
            } catch (error) {
                reject(error)
            }

        });
        postNewBuddies.then((buddies) => {
            /*
            * Wish I could put it all in one request, but
            * batch_update is a premium feature in sheetDB
            */
            console.log("posted to currCycle, now update first buddy in buddy pool: ");
            sheetDB.updateBuddyPool(buddies[0]);
            console.log("posted to currCycle, now update second buddy in buddy pool: ");
            sheetDB.updateBuddyPool(buddies[1]);
            console.log("posted to currCycle, now update third buddy in buddy pool: ");
            sheetDB.updateBuddyPool(buddies[2]);
        })
            .catch((e) => {
                console.log(e);
            })

        await interaction.reply(`${buddy1}, ${buddy2}, and ${buddy3} was added to the upcoming cycle!`);
    }
}

