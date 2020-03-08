const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Add some text in order to convert.  :no_entry:");
    }

    if(message.mentions.members.first())
    {
        return message.reply(" :no_entry: this isn't a plain text you m0ng0l! :face_palm:  :no_entry:");
    }

    let ArgumentText = szArgs.join(" ");
    const TextToQR = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&bgcolor=${(Math.random() * 0xFFFFFF << 0).toString(16)}&data=${ArgumentText}`;

    message.channel.send("Your :regional_indicator_q::regional_indicator_r:  :arrow_heading_down:", await new Discord.MessageAttachment(encodeURI(TextToQR), "qrcode.png"));
};

module.exports.help =
{
    name: "qr"
};