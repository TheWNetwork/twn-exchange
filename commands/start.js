module.exports.run = async (botconfig, dbclient, bot, message, args) => {
    if (message.chat.type !== 'private') {
        return;
    }

    return "Welcome to The W Network - Exchange. \n\n" +
        "You can check our services on @TheWNetwork.";
};

module.exports.help = {
    name: "start"
};