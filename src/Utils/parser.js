
module.exports = {
    /*
    **Welcome Message is formatted as "Hey <102425264>, ...."
    */
    parseUserIDFromMessage: (message) => {

        messageList = message.split(' ');

        unparsedUserID = messageList[1];

        // take out <@ >
        userID = unparsedUserID.replace('<', '');
        userID = userID.replace('@', '');
        userID = userID.replace('>', '');

        //take out ,
        userID = userID.replace(',', '');

        return userID;
    },

    formatBuddyCycleThreadMessage: (buddies) =>{
        let formattedMessage = 
        `current buddy cycle: 10/29/23-11/12/23\n Current buddies:
        ${buddies[0]}
        ${buddies[1]}
        ${buddies[2]}`

        return formattedMessage;
    },
}