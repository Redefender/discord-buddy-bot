const {EmbedBuilder} = require('discord.js');

module.exports = {
    buildBuddyPoolEmbed: (buddyPool)=>{
        const buddyPoolEmbed = new EmbedBuilder()
        .setTitle('Buddy Pool')
        .setDescription('Pool of buddy candidates. Use this to determine who to nominate for upcoming cycle.');
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
    },

    buildNewJoinersEmbed: (newJoiners)=>{
        const newJoinersEmbed = new EmbedBuilder()
        .setTitle('Buddy Pool')
        .setDescription('List of new joiners. When new joiner added to list (handled by buddy-system bot), buddy-system bot automatically scans for and removes those in ' + 
        'list longer than 30 days');
        for (newJoinerRow of newJoiners) {
            let nameField = {
                name: 'New Joiner',
                value: newJoinerRow.username,
                inline: true
            }

            let dateJoinedField = {
                name: 'Date Joined',
                value: newJoinerRow.dateJoined,
                inline: true
            }
            newJoinersEmbed.addFields(nameField, dateJoinedField)
                .addFields({ name: '\u200b', value: '\u200b' })

        }
        return newJoinersEmbed;
    }
}