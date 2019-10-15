
const Discord = require("discord.js");
const moment = require("moment");
const CustomFunctions = require("../functions/funcs.js");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :facepalm:  :no_entry:");
    }

    let GetTargetAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;
    let TargetName = GuildMember.user.username;

    let GetGameName = (GuildMember.presence.game === null) ? "Nothing" : GuildMember.presence.game;
    let GetTargetRegistrationDate = moment(GuildMember.user.createdAt).format('lll') + " *(" + moment(new Date()).diff(GuildMember.user.createdAt, "days") + " days ago)*";

    const embed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | User Info", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor("#1E90FF")
    .addField(":id: ID:", GuildMember.user.id + "\n\n:satellite: Status:\n" + CustomFunctions.capitalizeFirstLetter(GuildMember.user.presence.status) + "\n\n:video_game: Playing:\n" + GetGameName + "\n", true)
    .addField(":spy: Username:", TargetName + "\n\n:hash: User Tag:\n" + GuildMember.user.tag + "\n\n:floppy_disk: Joined Discord:\n" + GetTargetRegistrationDate, true)
    .setThumbnail(GetTargetAvatar)
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

    await message.channel.send({embed});
};

module.exports.help =
{
    name: "userinfo"
};
