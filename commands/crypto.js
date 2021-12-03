const currencies = require("./../config/crypto.json");
module.exports.run = (botconfig, dbclient, bot, message, args) => {
    let currenciesList = "";
    for (var i = 0; i < currencies.data.length; i++) {
        currenciesList += currencies.data[i].id + " " + currencies.data[i].name + "\n";
    }
    return "Crypto Curencies Available: \n" + currenciesList + "\n\nYou can check our services on @TheWNetwork.";
};

module.exports.help = {
    name: "crypto"
};