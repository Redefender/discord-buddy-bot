
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
    }
}