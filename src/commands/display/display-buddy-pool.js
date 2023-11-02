const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sheetDB = require('../../sheetdb.js');
const embeds = require('../../Utils/embeds.js');
const data = new SlashCommandBuilder()
    .setName('buddy-pool')
    .setDescription('display the pool of buddy candidates')

module.exports = {
    data: data,
    execute(interaction) {
        sheetDB.fetchBuddyPool().then(async (buddyPool) => {
            console.log(buddyPool);
            let buddyPoolEmbed = embeds.buildBuddyPoolEmbed(buddyPool.data)
            await interaction.reply({ embeds: [buddyPoolEmbed] });
        })


    }
}