
const Discord = require("discord.js");
const os = require("os");

const CustomFunctions = require("../functions/funcs.js");

module.exports.run = async (bot, message, args) =>
{
    const embed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | BOT Uptime", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(26367)
    .setDescription(`:robot: **Uptime:** ${CustomFunctions.secondsToString(process.uptime())}\n\n:desktop: **Uptime:** ${CustomFunctions.secondsToString(os.uptime())}`)
    .setThumbnail("https://i.imgur.com/df79Q6S.png")
    .setFooter("⏰")
    .setTimestamp()

    await message.channel.send({embed})
};

module.exports.help =
{
    name: "uptime"
};
