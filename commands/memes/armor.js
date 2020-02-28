const Discord = require("discord.js");
const gm = require("gm").subClass({ imageMagick: true });
const wrap = require("word-wrap");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Add some mean text?  :no_entry:");
    }

    let ArgumentText = szArgs.join(" ");

    if(ArgumentText.length >= 100)
    {
        return message.reply(" :no_entry: please don't exceed **100** characters in your mean text! :no_entry:");
    }

    if(message.mentions.members.first())
    {
        return message.reply(" :no_entry: please don't mention people in your armor mean text! :no_entry:");
    }

    message.channel.startTyping();

    const ArmorImagePath = "./BOTImages/NothingGets/armor.png";

    let FontSize = (ArgumentText.length >= 20) ? 20 : 28;
    let FormattedArgumentText = ArgumentText.replace(/'/g, "`").trim().toUpperCase();

    gm(ArmorImagePath)
    .font("./BOTFonts/AgencyFB-Bold.ttf", FontSize)
    .fill("#111111")
    .draw(["text 0, 350 '" + wrap(FormattedArgumentText, { width: (FormattedArgumentText.length >= 20) ? 30 : 25 }) + "'"])
    .toBuffer("armor.png", (err, buffer) =>
    {
        if(err)
        {
            console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Armor)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
        }

        message.channel.send(new Discord.Attachment(buffer, "armor.png")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "armor"
};