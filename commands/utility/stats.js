const Discord = require("discord.js");
const os = require("os");
const CustomFunctions = require("../../functions/funcs.js");
const CookieMonsta = require("../../CookieMonstaBOT.js");
const BotVersion = require("../../package.json");

const szBotVersionNow = BotVersion.version;

module.exports.run = async (bot, message, args) =>
{
    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | BOT Stats", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL :  bot.user.avatarURL)
    .setColor("#FFE4B5")
    .addField(":bar_chart: Client Stats", "**" + bot.guilds.size + "** servers\n**" + bot.channels.size + "** channels\n**" + bot.users.size + "** users\n**" + CookieMonsta.iCommandNumber + "** commands", true )
    .addField(":chart_with_upwards_trend: Server Stats", "Running on: **" + os.platform() + "**\nArchitecture: **" + os.arch() + "**\nVs: **" + os.release() + "**\nRAM: **" + CustomFunctions.bytesToSize(process.memoryUsage().heapUsed) + "**/**" + CustomFunctions.bytesToSize(os.totalmem()) + "**", true)
    .addField(":chart: Various Stats", "Version: **v" + szBotVersionNow + "**\nAuthor: **tuty4amxx#3969**\nNode.JS: **" + process.version + "**\nDiscord.JS: **" + Discord.version + "**", true)

    await message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "stats"
};