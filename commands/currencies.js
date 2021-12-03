const currencies = require("./../config/currencies.json");
module.exports.run = (botconfig, dbclient, bot, message, args) => {
    let currenciesList = "";
    for (var i = 0; i < currencies.data.length; i++) {
        currenciesList += currencies.data[i].id + " " + currencies.data[i].name + "\n";
    }
    return "Currencies: \n" + currenciesList + "\n\nYou can check our services on @TheWNetwork.";
};

module.exports.help = {
    name: "currencies"
};