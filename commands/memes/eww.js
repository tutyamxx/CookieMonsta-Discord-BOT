const Discord = require("discord.js");
const gm = require("gm").subClass({ imageMagick: true });

module.exports.run = (bot, message, args) =>
{
    const user = message.author;
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(GuildMember.user === user)
    {
        return message.reply("eww, but... why? :facepalm:");
    }

    message.channel.startTyping();

    const EwwImagePath = "./BOTImages/DankEww";
    const EwwImage = "ewww.png";

    let FontSize = (GuildMember.user.username.length >= 20) ? 14 : 20;

    gm(EwwImagePath + "/" + EwwImage)
    .font("Helvetica.ttf", FontSize)
    .fill("#111111")
    //.stroke("#800000")
    .draw(["rotate -55 text -430, 480 '" + GuildMember.user.username.trim() + "'"])
    .toBuffer(EwwImage, (err, buffer) =>
    {
        if(err)
        {
            console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Eww)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
        }

        message.channel.send(new Discord.MessageAttachment(buffer, EwwImage)).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "eww"
};