const { SlashCommandBuilder } = require('discord.js');
const sheetDB = require('../../sheetdb.js');
const axios = require('axios');
const parser = require('../../Utils/parser.js')
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
    execute(interaction) {
        const buddy1 = interaction.options.getUser('buddy1');
        const buddy2 = interaction.options.getUser('buddy2');
        const buddy3 = interaction.options.getUser('buddy3');

        new Promise(function (resolve) {

            //sheetDB.postNewBuddies(buddy1, buddy2, buddy3);
            let buddies = [buddy1, buddy2, buddy3];
            resolve(buddies);
        })
            .then((buddies) => {
                /*
                * Wish I could put it all in one request, but
                * batch_update is a premium feature in sheetDB
                */
                console.log("posted to currCycle, now update first buddy in buddy pool: ");
                //sheetDB.updateBuddyPool(buddies[0]);
                console.log("posted to currCycle, now update second buddy in buddy pool: ");
                //sheetDB.updateBuddyPool(buddies[1]);
                console.log("posted to currCycle, now update third buddy in buddy pool: ");
                //sheetDB.updateBuddyPool(buddies[2]);

                return buddies
            })
            .then(async (buddies) => {
                console.log(`this is where I'm supposed to add message to the thread for buddies: ${buddies}`);

                interaction.client.channels.fetch(process.env.BUDDY_CYCLE_THREAD_ID)
                    .then(async channel => {
                        //parser.formatBuddyCycleThreadMessage(buddies)
                        console.log('hope this shit only appears once');
                        console.log('the channel: ' + JSON.stringify(channel));
                        await channel.send(parser.formatBuddyCycleThreadMessage(buddies));
                    });
                await interaction.reply(`${buddy1}, ${buddy2}, and ${buddy3} was added to the upcoming cycle!`);
            })
            .catch(async (e) => {
                console.log('error caught in .catch()' + e);
                await interaction.reply(`error on command /add-buddies: ${e}`);
            })


    }
}

