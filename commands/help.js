module.exports.run = async (botconfig, dbclient, bot, message, provider) => {
    return`@${botconfig.name} is a exchange bot.
    Try me using: 
    \/currencies
    \/crypto
    \/cash [Quantity] [ORIGIN-CURRENCY] [EXCHANGED CURRENCY]
    \/exchange [Quantity] [ORIGIN-CURRENCY] [EXCHANGED CURRENCY]
    
    You can use @${botconfig.name} with inline mode using Exchange Command Automatically
    
    Did you expect something else? Sorry better go to @TheWNetwork to ask.`;
};

module.exports.help = {
    name: "help"
};
