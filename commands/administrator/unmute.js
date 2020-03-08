const Discord = require("discord.js");
const CookieMonsta = require("../../CookieMonstaBOT.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(!message.channel.permissionsFor(message.member).has("ADMINISTRATOR", false)
    || !message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES", false)
    || message.author.id !== "266677298051153920")
    {
        return message.channel.send(":no_entry: You can't mate! You need either ``ADMINISTRATOR`` or ``MANAGE_MESSAGES`` permission for this command. :laughing: :no_entry:");
    }

    const user = message.author;
    const TargetMember = message.mentions.members.first();

    if(!TargetMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(TargetMember.user === user)
    {
        return message.reply(" :no_entry: You can't 🔊 **UNMUTE** yourself LMFAO! :face_palm:  :no_entry:");
    }

    if(TargetMember.roles.highest.position >= message.member.roles.highest.position)
    {
        return message.reply(" :no_entry:  You can't 🔊 **UNMUTE** a member that has a role equal or higher than yours :cold_face: !  :no_entry:");
    }

    if(TargetMember.id === "683822854462111754" || TargetMember.id === "412067927333011470")
    {
        return message.reply(" :no_entry: Really? Me? :angry: NO!  :no_entry:");
    }

    const MutedRole = await message.guild.roles.cache.find(role => role.name === "🔇 MUTED");

    if(!MutedRole || !TargetMember.roles.cache.has(MutedRole.id))
    {
        return message.reply(" :no_entry: This user is not 🔇 **MUTED** :cold_face: !  :no_entry:");
    }

    await TargetMember.roles.remove(MutedRole);

    const DiscordRichEmbed = new Discord.MessageEmbed()
    .setAuthor("Cookie Monsta | Admin Log", bot.user.displayAvatarURL())
    .setColor(2003199)
    .setDescription(`${user}  🔊 **UNMUTED**  ${TargetMember.user}`)
    .setThumbnail("https://i.imgur.com/p6nQ6Dk.jpg")
    .setFooter("Used by: @" + user.username, user.displayAvatarURL())
    .setTimestamp();

    message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "unmute"
};