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
    let MuteTargetMember = message.mentions.members.first();

    if(!MuteTargetMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(MuteTargetMember.user === user)
    {
        return message.reply(" :no_entry: You can't 🔇 **MUTE** yourself LMFAO! :face_palm:  :no_entry:");
    }

    if(MuteTargetMember.highestRole.position >= message.member.highestRole.position)
    {
        return message.reply(" :no_entry:  You can't 🔇 **MUTE** a member that has a role equal or higher than yours :cold_face: !  :no_entry:");
    }

    let MutedRole = await message.guild.roles.find(role => role.name === "🔇 MUTED");

    if(!MutedRole)
    {
        try
        {
            MutedRole = await message.guild.createRole({ name: "🔇 MUTED", color: "#FF0000", hoist: true, mentionable: false, permissions: [] });

            message.guild.channels.forEach(async (channel, id) =>
            {
                await channel.overwritePermissions(MutedRole,
                {
                    USE_EXTERNAL_EMOJIS: false,
                    ADD_REACTIONS: false,
                    SEND_MESSAGES: false,
                    SEND_TTS_MESSAGES: false,
                    EMBED_LINKS: false,
                    ATTACH_FILES: false,
                    MENTION_EVERYONE: false,
                    CONNECT: false,
                    SPEAK: false,
                    USE_VAD: false,
                    PRIORITY_SPEAKER: false
                });
            });
        }

        catch(error)
        {
            return message.channel.send("<:cookiemonsta:634866060465537034> **|** I have encountered an error during the 🔇 **MUTE** command: ``" + error.message + "``\n<:cookiemonsta:634866060465537034> **|** You might want to take a look here: (https://tutyamxx.github.io/cookie-monsta-website/tutorial.html)");
        }
    }

    if(MuteTargetMember.roles.has(MutedRole.id))
    {
        return message.reply(" :no_entry: This user is already 🔇 **MUTED** !  :no_entry:");
    }

    await MuteTargetMember.addRole(MutedRole);

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Admin Log", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(2003199)
    .setDescription("**" + user + "** 🔇 **MUTED** " + MuteTargetMember.user)
    .setThumbnail("https://i.imgur.com/h17kd5m.png")
    .setFooter("Used by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
    .setTimestamp();

    message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "mute"
};