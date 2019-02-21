
const Discord = require("discord.js");
const moment = require("moment");

const CustomFunctions = require("../functions/funcs.js");

module.exports.run = async (bot, message, args) =>
{
    var user = message.author;
    var ServerGuild = message.guild;

    if(ServerGuild.available)
    {
        var ServerName = ServerGuild.name;
        var ServerID = ServerGuild.id;
        var ServerOwner = ServerGuild.owner.user.tag;
        var ServerCreationDate = moment(ServerGuild.createdAt).format('lll');

        var ServerUserCount = ServerGuild.members.filter(member => member.user).size;
        var ServerBotsCount  = ServerGuild.members.filter(member => member.user.bot).size;
        var ServerUserOnlineCount = ServerGuild.members.filter(member => !member.user.bot && member.presence.status === "online").size;

        var ServerChannels = message.guild.channels.size;
        var ServerVoiceChannelsCount = ServerGuild.channels.filter(ctype => ctype.type === "voice").size;
        var ServerTextChannelCount = ServerGuild.channels.filter(ctype => ctype.type === "text").size;
        var ServerCategories = ServerGuild.channels.filter(ctype => ctype.type === "category").size;

        var szDescription = ":white_medium_small_square: Server Name: **" + ServerName +
        "**\n:white_medium_small_square: Server ID: **" + ServerID +
        "**\n:white_medium_small_square: Owner: **" + ServerOwner +
        "**\n:white_medium_small_square: Location: **" + await CustomFunctions.GuildLocation(ServerGuild) +
        "**\n:white_medium_small_square: Creation: **" + ServerCreationDate +
        "**\n:white_medium_small_square: Users: **" + ServerUserCount + "** (**" + ServerUserOnlineCount + "** Online, **" + ServerBotsCount + "**" + ((ServerBotsCount === 1) ? " BOT" : " BOTS") + ")" +
        "\n:white_medium_small_square: Channels: **" + ServerChannels + "** (**" + ServerTextChannelCount + "** Text, **" + ServerVoiceChannelsCount + "** Voice, **" + ServerCategories + "** Categories)" +
        "\n:white_medium_small_square: Verification: **" + await CustomFunctions.GuildVerificationLevel(ServerGuild) + "**";

        const embed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Server Information", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setDescription(szDescription)
        .setColor(2003199)
        .setThumbnail((ServerGuild.iconURL === null) ? ServerGuild.owner.user.defaultAvatarURL : ServerGuild.iconURL)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
        .setTimestamp()
        
        await message.channel.send({embed}).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    }
};

module.exports.help =
{
    name: "serverinfo"
};
