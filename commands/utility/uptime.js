const Discord = require("discord.js");
const os = require("os");

const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, args) =>
{
    const DiscordRichEmbed = new Discord.MessageEmbed()
    .setAuthor("Cookie Monsta | BOT Uptime", bot.user.displayAvatarURL())
    .setColor(26367)
    .setDescription(`:robot: **Uptime:** ${CustomFunctions.secondsToString(process.uptime())}\n\n:desktop: **Uptime:** ${CustomFunctions.secondsToString(os.uptime())}`)
    .setThumbnail("https://i.imgur.com/df79Q6S.png")
    .setFooter("⏰")
    .setTimestamp()

    message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "uptime"
};