const Discord = require("discord.js");
const Jimp = require("jimp");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Please specify a gender ``<M or F>``  :no_entry:");
    }

    if(szArgs[0].toLowerCase() === "m" || szArgs[0].toLowerCase() === "f")
    {
        message.channel.startTyping();

        Jimp.read(encodeURI(`https://belikebill.ga/billgen-API.php?default=1&name=${message.author.username}&sex=${szArgs[0].toLowerCase()}`)).then((image) =>
        {
            image.getBuffer(Jimp.MIME_PNG, (err, buffer) =>
            {
                if(err)
                {
                    console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Be Like Bill)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
                }

                message.channel.send(new Discord.MessageAttachment(buffer, "belikebill.png")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
            });
        });
    }

    else
    {
        return message.reply(" :no_entry: Invalid gender specified :facepalm: ! Type **!belike** ``<M or F> `` (M = male / F = female)  :no_entry:");
    }
};

module.exports.help =
{
    name: "belike"
};