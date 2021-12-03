const botconfig = require("./config/config.json");
const fs = require("fs");
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(botconfig.token, {polling: true});

bot.commands = new Map();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on('getUpdates', (update) => {
    console.log(update);
});


bot.on('message', (msg) => {
    try {
        let messageArray = '';
        (async () => {
            try {
                messageArray = msg.text.split(" ");
                let cmd = messageArray[0];
                let args = msg.text.slice(cmd.length + 1);
                let commandRequest = cmd.slice(1);
                if (cmd.substring(0, 1) !== '/') {
                    return;
                }
                let commandfile = bot.commands.get(commandRequest.substring(0, (commandRequest.indexOf('@') === -1 ? commandRequest.length : commandRequest.indexOf('@'))));

                if (commandfile) {
                    bot.sendMessage(msg.chat.id, await commandfile.run(botconfig, null, bot, msg, args));
                }
            } catch (e) {
                console.log(e.message);
            }
        })();

    } catch (e) {
        console.log(e.message);
    }
});

bot.on('inline_query', (msg) => {
    try {
        let commandfile = bot.commands.get('exchange');
        if (commandfile) {
            let query = encodeURIComponent(msg.query.trim());
            let returntext = commandfile.run(botconfig, null, bot, msg, msg.query).then(returntext => {
                bot.answerInlineQuery(msg.id, [
                    {
                        type: 'article',
                        id: query + '_exchange',
                        title: `Exchange ${msg.query}`,
                        input_message_content: {
                            message_text: returntext,
                        }
                    }
                ]);
            });
        }
    } catch (e) {
        console.log(e.message);
    }
});
