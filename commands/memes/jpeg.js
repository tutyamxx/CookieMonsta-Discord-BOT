const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports.run = async (bot, message, szArgs) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    }

    message.channel.startTyping();

    let ImageURL = await Jimp.read(GuildMember.user.displayAvatarURL({ format: "png", size: 2048 }));

    ImageURL.quality(1).getBuffer(Jimp.MIME_JPEG, (err, buffer) =>
    {
        if(err)
        {
            console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Needs More JPEG)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
        }

        message.channel.send(new Discord.MessageAttachment(buffer, "needs_more_jpeg.jpeg")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "jpeg"
};