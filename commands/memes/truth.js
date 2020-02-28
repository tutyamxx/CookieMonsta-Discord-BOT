const Discord = require("discord.js");
const Jimp = require("jimp");
const gm = require("gm").subClass({ imageMagick: true });
const wrap = require("word-wrap");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Add some text maybe?  :no_entry:");
    }

    let ArgumentText = szArgs.join(" ");

    if(ArgumentText.length >= 158)
    {
        return message.reply(" :no_entry: please don't exceed **158** characters in your truth description! :no_entry:");
    }

    if(message.mentions.members.first())
    {
        return message.reply(" :no_entry: please don't mention people in your truth description! :no_entry:");
    }

    message.channel.startTyping();

    let TruthImagePath = "./BOTImages/Truth/truth.jpg";
    let FontSize = (ArgumentText.length >= 50) ? 16 : 22;
    let FormattedArgumentText = ArgumentText.replace(/'/g, "`").trim();

    gm(TruthImagePath)
    .font("./BOTFonts/MangaSpeak.ttf", FontSize)
    .fill("#111111")
    .draw(["text 0, 193 '" + wrap(FormattedArgumentText, { width: (FormattedArgumentText.length >= 50) ? 21 : 15 }) + "'"])
    .toBuffer("truth.jpg", (err, buffer) =>
    {
        if(err)
        {
            console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Truth)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
        }

        message.channel.send(new Discord.Attachment(buffer, "truth.png")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "truth"
};