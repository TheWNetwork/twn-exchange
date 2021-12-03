const currencies = require("./../config/currencies.json");
const axios = require("axios");
module.exports.run = async (botconfig, sql, bot, message, args) => {
    let re = args.split(" ");
    let integer = re[0];
    let currency1 = re[1];
    let currency2 = re[2];

    return axios({
        method: 'get',
        url: `https://api.coinbase.com/v2/prices/${currency1}-${currency2}/spot`,
    }).then(function (result) {
        let exchange = parseFloat(result.data.data.amount) * parseInt(integer);
        return `${integer} ${currency1} = ${exchange.toFixed(2)} ${currency2}\n\nYou can check our services on @TheWNetwork.`;
    }).catch(function (error) {
        return axios({
            method: 'get',
            url: `https://api.coinbase.com/v2/prices/${currency2}-${currency1}/spot`,
        }).then(function (result) {
            let exchange = parseFloat(result.data.data.amount) * parseInt(integer);
            return `${integer} ${currency2} = ${exchange.toFixed(2)} ${currency1}\n\nYou can check our services on @TheWNetwork.`;
        }).catch(function (error) {
            return 'Currency Unavailable';
        });
    });
};

module.exports.help = {
    name: "exchange"
};
