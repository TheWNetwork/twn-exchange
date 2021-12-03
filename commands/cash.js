const currencies = require("./../config/currencies.json");
const axios = require("axios");
module.exports.run = async (botconfig, sql, bot, message, args) => {
    let re = args.split(" ");
    let integer = re[0];
    let currency1 = re[1];
    let currency2 = re[2];
    if (!Object.prototype.hasOwnProperty.call(currencies, currency1) || !Object.prototype.hasOwnProperty.call(currencies, currency2)) {
        return 'There is a currency not allowed.\nCheck /\currencies to view them.';
    }

    return axios({
        method: 'get',
        url: `https://api.coinbase.com/v2/exchange-rates?currency=${currency1}`,
    }).then(function (result) {
        let exchange = parseFloat(result.data.data.rates[currency2]) * parseInt(integer);
        return `${integer} ${currency1} = ${exchange.toFixed(2)} ${currency2}\n\nYou can check our services on @TheWNetwork.`;
    }).catch(function (error) {
        console.log(error);
    });
};

module.exports.help = {
    name: "cash"
};
