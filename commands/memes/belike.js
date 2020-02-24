const Discord = require("discord.js");
const Jimp = require("jimp");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Please specify a gender ``<M or F>``  :no_entry:");
    }

    if(szArgs[0].toLowerCase() === "m" || szArgs[0].toLowerCase() === "f")
    {
        await message.channel.startTyping();

        let BillURL = "https://belikebill.ga/billgen-API.php?default=1&name=" + message.author.username.toString() + "&sex=" + szArgs[0].toLowerCase();

        await Jimp.read(encodeURI(BillURL)).then(async (image) =>
        {
            image.getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
            {
                if(err)
                {
                    console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Be Like Bill)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
                }

                await message.channel.send(new Discord.Attachment(buffer, "belikebill.png")).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
            });
        });
    }

    else
    {
        return await message.reply(" :no_entry: Invalid gender specified :facepalm: ! Type **!belike** ``<M or F> `` (M = male / F = female)  :no_entry:");
    }
};

module.exports.help =
{
    name: "belike"
};