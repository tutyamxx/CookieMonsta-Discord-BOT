const Discord = require("discord.js");
const gm = require("gm").subClass({ imageMagick: true });

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(GuildMember.user === user)
    {
        return await message.reply("eww, but... why? :facepalm:");
    }

    message.channel.startTyping();

    let EwwImagePath = "./BOTImages/DankEww";
    let EwwImage = "ewww.png";

    let FontSize = (GuildMember.user.username.length >= 20) ? 14 : 20;

    await gm(EwwImagePath + "/" + EwwImage)
    .font("Helvetica.ttf", FontSize)
    .fill("#111111")
    //.stroke("#800000")
    .draw(["rotate -55 text -430, 480 '" + GuildMember.user.username.trim() + "'"])
    .toBuffer(EwwImage, async function (err, buffer)
    {
        if(err)
        {
            await message.channel.stopTyping(true).catch(err => message.channel.stopTyping(true));
            console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");

            return;
        }

        await message.channel.send(new Discord.Attachment(buffer, EwwImage)).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "eww"
};