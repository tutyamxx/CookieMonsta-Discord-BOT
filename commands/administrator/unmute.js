const Discord = require("discord.js");
const CookieMonsta = require("../../CookieMonstaBOT.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(!message.channel.permissionsFor(message.member).has("ADMINISTRATOR", false)
    || !message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES", false)
    || message.author.id !== "266677298051153920")
    {
        return message.channel.send(":no_entry: You don't have permission to use this command! :laughing: :no_entry:");
    }

    const user = message.author;
    let TargetMember = message.mentions.members.first();

    if(!TargetMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(TargetMember.user === user)
    {
        return message.reply(" :no_entry: You can't 🔊 **UNMUTE** yourself LMFAO! :face_palm:  :no_entry:");
    }

    if(TargetMember.highestRole.position >= message.member.highestRole.position)
    {
        return message.reply(" :no_entry:  You can't 🔊 **UNMUTE** a member that has a role equal or higher than yours :cold_face: !  :no_entry:");
    }

    const MutedRole = await message.guild.roles.find(role => role.name === "🔇 MUTED");

    if(!MutedRole || !TargetMember.roles.has(MutedRole.id))
    {
        return message.reply(" :no_entry: This user is not 🔇 **MUTED** :cold_face: !  :no_entry:");
    }

    await TargetMember.removeRole(MutedRole);

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Admin Log", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(2003199)
    .setDescription("**" + user + "** 🔊 **UNMUTED** " + TargetMember.user)
    .setThumbnail("https://i.imgur.com/p6nQ6Dk.jpg")
    .setFooter("Used by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
    .setTimestamp();

    message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "unmute"
};