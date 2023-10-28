const axios = require('axios');
const moment = require('moment');
require('dotenv').config();

let postNewJoiner = (newMember) => {
    console.log('newMember in sheetDB is ' + JSON.stringify(newMember))
    try {

        axios.post(process.env.NEW_JOINER_LIST_ID, {
            data: {
                username: newMember.displayName,
                userId: newMember.userId,
                dateJoined: moment().format('D MMM, YYYY'),
                dateUpdated: moment().format('D MMM, YYYY')

            }
        })
    } catch (error) {
        console.log('error at sheetDB - postNewJoiner: ' + error);
    }

}

let postNewBuddies = (buddy1, buddy2, buddy3) => {
    console.log(`new buddies are ${buddy1}, ${buddy2}, ${buddy3}`);
    console.log(`buddy1 is: ${JSON.stringify(buddy1)}`)


    axios.post(process.env.CURRENT_BUDDY_CYCLE_ID, {
        data: [
            {
                'currentBuddy': buddy1.username,
                'userId': buddy1.id,
            },

            {
                'currentBuddy': buddy2.username,
                'userId': buddy2.id,
            },

            {
                'currentBuddy': buddy3.username,
                'userId': buddy3.id
            }
        ]
    });
}

let updateBuddyPool = (buddy) => {

    console.log('buddy is ' + JSON.stringify(buddy))

    axios.patch(process.env.BUDDY_LIST_ID + '/userId/' + buddy.id, {

        'numTimesServed': 'INCREMENT'
    })

}
module.exports = {
    postNewJoiner, postNewBuddies, updateBuddyPool
}