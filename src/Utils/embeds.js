const {EmbedBuilder} = require('discord.js');

module.exports = {
    buildBuddyPoolEmbed: (buddyPool)=>{
        const buddyPoolEmbed = new EmbedBuilder()
        .setTitle('Buddy Pool')
        .setDescription('Pool of buddy candidates. Use this to determine who to nominate for upcoming cycle');
        for (buddyRow of buddyPool) {
            let nameField = {
                name: 'Buddy',
                value: buddyRow.buddy,
                inline: true
            }

            let numTimesServedField = {
                name: '# Times Served',
                value: buddyRow.numTimesServed,
                inline: true
            }
            buddyPoolEmbed.addFields(nameField, numTimesServedField)
                .addFields({ name: '\u200b', value: '\u200b' })

        }
        return buddyPoolEmbed;
    }
}