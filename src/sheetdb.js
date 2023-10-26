const axios = require('axios');
const moment = require('moment');


let postNewJoiner = (newMember) => {
    console.log('newMember in sheetDB is ' + JSON.stringify(newMember))
    axios.post(process.env.NEW_JOINER_LIST_ID, {
        data:{
            username: newMember.displayName,
            userId: newMember.userId,
            dateJoined: moment().format('D MMM, YYYY'),
            dateUpdated: moment().format('D MMM, YYYY')

        }
    })
}

module.exports = {
    postNewJoiner
}