module.exports.run = async (botconfig, pool, bot, message, args) => {
    return `Group Id: ${message.chat.id}\n\nYou can check our services on @TheWNetwork.`;
};

module.exports.help = {
    name: "id"
};