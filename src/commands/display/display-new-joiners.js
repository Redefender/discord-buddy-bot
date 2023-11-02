const { SlashCommandBuilder } = require('discord.js');
const sheetDB = require('../../sheetdb.js');
const embeds = require('../../Utils/embeds.js');
const data = new SlashCommandBuilder()
    .setName('new-joiners')
    .setDescription('display the list of new joiners')

module.exports = {
    data: data,
    execute(interaction) {
        sheetDB.fetchNewJoiners().then(async (newJoiners) => {
            console.log(newJoiners);
            let newJoinersEmbed = embeds.buildNewJoinersEmbed(newJoiners.data)
            await interaction.reply({ embeds: [newJoinersEmbed] });
        })


    }
}