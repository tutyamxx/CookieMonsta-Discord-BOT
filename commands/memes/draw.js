const Discord = require("discord.js");
const Jimp = require("jimp");
const gm = require("gm");

module.exports.run = async (bot, message, szArgs) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    }

    message.channel.startTyping();

    const szDrawnImageName = "draw.png";
    let ImageURL = await Jimp.read(GuildMember.user.displayAvatarURL({ format: "png", size: 2048 }));

    ImageURL.getBuffer(Jimp.MIME_PNG, (err, buffer) =>
    {
        if(err)
        {
            console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Draw)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
        }

        gm(buffer).border(1, 1).borderColor("black").charcoal(0.1).coalesce().despeckle().autoOrient().toBuffer(szDrawnImageName, (err, buffer2) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Draw)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
            }

            message.channel.send(new Discord.MessageAttachment(buffer2, szDrawnImageName)).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "draw"
};