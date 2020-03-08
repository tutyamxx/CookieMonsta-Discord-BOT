const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports.run = (bot, message, args) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    message.channel.startTyping();

    Jimp.read(GuildMember.user.displayAvatarURL({ format: "png", size: 2048 })).then((image) =>
    {
        image.pixelate(20).quality(100).getBuffer(Jimp.MIME_PNG, (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Pixel)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
            }

            message.channel.send(new Discord.MessageAttachment(buffer, "pixelated.png")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "pixel"
};