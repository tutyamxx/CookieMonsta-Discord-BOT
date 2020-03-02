const Discord = require("discord.js");
const moment = require("moment");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;
    const GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :facepalm:  :no_entry:");
    }

    const GetTargetAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;
    const TargetName = GuildMember.user.username;

    const GetGameName = (GuildMember.presence.game === null) ? "Nothing" : GuildMember.presence.game;
    const GetTargetRegistrationDate = moment(GuildMember.user.createdAt).format('lll') + " *(" + moment(new Date()).diff(GuildMember.user.createdAt, "days") + " days ago)*";
    const GetUserPresenceClient = GuildMember.presence.clientStatus;

    let GetClientStatus = [];

    if(GetUserPresenceClient !== null)
    {
        if(GetUserPresenceClient.hasOwnProperty("web"))
        {
            GetClientStatus.push("🌐");
        }

        if(GetUserPresenceClient.hasOwnProperty("mobile"))
        {
            GetClientStatus.push("📱");
        }

        if(GetUserPresenceClient.hasOwnProperty("desktop"))
        {
            GetClientStatus.push("👨‍💻");
        }
    }

    else
    {
        GetClientStatus.push("🚫");
    }

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | User Info", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor("#1E90FF")
    .addField(":id: ID:", GuildMember.user.id + "\n\n:satellite: Status:\n" + CustomFunctions.capitalizeFirstLetter(GuildMember.user.presence.status) + " (" + GetClientStatus.join(", ") + ")" + "\n\n:video_game: Playing:\n" + GetGameName + "\n", true)
    .addField(":spy: Username:", TargetName + "\n\n:hash: User Tag:\n" + GuildMember.user.tag + "\n\n:floppy_disk: Joined Discord:\n" + GetTargetRegistrationDate, true)
    .setThumbnail(GetTargetAvatar)
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

    message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "userinfo"
};