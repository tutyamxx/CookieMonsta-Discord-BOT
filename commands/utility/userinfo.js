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

    const GetTargetAvatar = GuildMember.user.avatarURL();
    const GetTargetName = GuildMember.user.username;
    const GetTargetRegistrationDate = moment(GuildMember.user.createdAt).format("lll") + " *(" + moment(new Date()).diff(GuildMember.user.createdAt, "days") + " days ago)*";
    const GetUserPresenceClient = GuildMember.presence.clientStatus;

    let GenerateCustomActivityName;
    let GetUserGameName;

    if(GuildMember.presence.activities.length > 0)
    {
        switch(GuildMember.presence.activities[0].type)
        {
            case "STREAMING":
                GenerateCustomActivityName = ":earth_africa: Streaming:";
                GetUserGameName = `[${GuildMember.presence.activities[0].name}](${GuildMember.presence.activities[0].url})`;

                break;

            case "LISTENING":
                GenerateCustomActivityName = ":musical_note: Listening:";
                GetUserGameName = GuildMember.presence.activities[0].name;

                break;

            case "PLAYING":
                GenerateCustomActivityName = ":video_game: Playing:";
                GetUserGameName = GuildMember.presence.activities[0].name;

                break;

            case "WATCHING":
                GenerateCustomActivityName = ":eyes: Watching:";
                GetUserGameName = GuildMember.presence.activities[0].name;

                break;

            case "CUSTOM_STATUS":
                GenerateCustomActivityName = `${GuildMember.presence.activities[0].emoji} Custom Status:`;
                GetUserGameName = GuildMember.presence.activities[0].state;

                break;
        }
    }

    else
    {
        GenerateCustomActivityName = ":zzz:";
        GetUserGameName = "Nothing";
    }

    let GetClientStatus = [];

    if(GetUserPresenceClient !== null)
    {
        if(GetUserPresenceClient.hasOwnProperty("web") || Object.keys(GetUserPresenceClient).length <= 0)
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

    const DiscordRichEmbed = new Discord.MessageEmbed()
    .setAuthor("Cookie Monsta | User Info", bot.user.avatarURL())
    .setColor("#1E90FF")
    .addField(":id: ID:", GuildMember.user.id + "\n\n:satellite: Status:\n" + CustomFunctions.capitalizeFirstLetter(GuildMember.user.presence.status) + " (" + GetClientStatus.join(", ") + ")" + `\n\n${GenerateCustomActivityName}\n` + GetUserGameName + "\n", true)
    .addField(":spy: Username:", GetTargetName + "\n\n:hash: User Tag:\n" + GuildMember.user.tag + "\n\n:floppy_disk: Joined Discord:\n" + GetTargetRegistrationDate, true)
    .setThumbnail(GetTargetAvatar)
    .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

    message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "userinfo"
};