const Discord = require("discord.js");
const BotConfig = require("../../config/botconfig.json");
const ameClient = require("amethyste-api");

const ameApi = new ameClient(BotConfig.AmeAPI_Token.trim());

module.exports.run = (bot, message, args) =>
{
    const GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :facepalm:  :no_entry:");
    }

    message.channel.startTyping();

    const GetUserAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

    ameApi.generate("missionpassed", { url: GetUserAvatar }).then((szImageBuffer) =>
    {
        message.channel.send(new Discord.Attachment(szImageBuffer, "respect.png")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Uhh, something went wrong, try again? :confused:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "respect"
};