const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");
const Jimp = require("jimp");

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Add some text please...  :no_entry:");
    }

    if(szArgs[0].length > 30)
    {
        return message.reply(" :no_entry: too many characters in this name! Maximum **30** :no_entry:");
    }

    message.channel.startTyping();

    let ArgumentText = szArgs.join(" ");
    const RandomAvatar = Math.round(Math.random());

    const GenerateRandomAvatar = "https://api.adorable.io/avatar" + (RandomAvatar === 1 ? "" : "s") +  "/285/" + encodeURI(ArgumentText) + ".png";
    let GetAvatarBuffer = await Jimp.read(GenerateRandomAvatar);

    GetAvatarBuffer.getBuffer(Jimp.MIME_PNG, (err, buffer) =>
    {
        if(err)
        {
            console.log("\x1b[31m*\x1b[0m Error while creating \x1b[33m(Nameavatar)\x1b[0m: \x1b[31m" + err + "\x1b[0m");
        }

        message.channel.send(new Discord.MessageAttachment(buffer, "nameavatar.png")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "nameavatar"
};