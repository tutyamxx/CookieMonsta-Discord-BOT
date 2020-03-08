const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports.run = (bot, message, args) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    }

    message.channel.startTyping();

    let i1 = Jimp.read(GuildMember.user.displayAvatarURL({ format: "png", size: 2048 }));
    let i2 = Jimp.read("./BOTImages/Pride/pride.png");

    Promise.all([i1, i2]).then((images) =>
    {
        images[0].resize(400, 400).quality(100);
        images[1].resize(400, 400).quality(100);

        images[1].composite(images[0], 0, 0, { mode: Jimp.BLEND_SOURCE_OVER, opacitySource: 0.2, opacityDest: 0.6 }).quality(100).getBuffer(Jimp.MIME_PNG, (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Pride)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
            }

            message.channel.send(new Discord.MessageAttachment(buffer, "pride.png")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        });
    });
}

module.exports.help =
{
    name: "pride"
};