const Discord = require("discord.js");
const moment = require("moment");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;
    const ServerGuild = message.guild;

    if(ServerGuild.available)
    {
        const ServerName = ServerGuild.name;
        const ServerID = ServerGuild.id;
        const ServerOwner = ServerGuild.owner.user.tag;
        const ServerCreationDate = moment(ServerGuild.createdAt).format("lll");

        const ServerUserCount = ServerGuild.memberCount;
        const ServerBotsCount = ServerGuild.members.cache.filter(member => member.user.bot).size;
        const ServerUserOnlineCount = ServerGuild.members.cache.filter(member => !member.user.bot && member.presence.status === "online").size;

        const ServerChannels = message.guild.channels.cache.size;

        const ServerVoiceChannelsCount = ServerGuild.channels.cache.filter(ctype => ctype.type === "voice").size;
        const ServerTextChannelCount = ServerGuild.channels.cache.filter(ctype => ctype.type === "text").size;
        const ServerCategories = ServerGuild.channels.cache.filter(ctype => ctype.type === "category").size;

        const ServerMFALevel = ServerGuild.mfaLevel;
        const ServerContentFilter = ServerGuild.explicitContentFilter;

        let szDescription = ":white_medium_small_square: Server Name: **" + ServerName +
        "**\n:white_medium_small_square: Server ID: **" + ServerID +
        "**\n:white_medium_small_square: Owner: **" + ServerOwner +
        "**\n:white_medium_small_square: Location: **" + CustomFunctions.GuildLocation(ServerGuild) +
        "**\n:white_medium_small_square: Creation: **" + ServerCreationDate +
        "**\n:white_medium_small_square: Users: **" + ServerUserCount + "** (**" + ServerUserOnlineCount + "** Online, **" + ServerBotsCount + "**" + ((ServerBotsCount === 1) ? " BOT" : " BOTS") + ")" +
        "\n:white_medium_small_square: Channels: **" + ServerChannels + "** (**" + ServerTextChannelCount + "** Text, **" + ServerVoiceChannelsCount + "** Voice, **" + ServerCategories + "** Categories)" +
        "\n:white_medium_small_square: Verification: **" + CustomFunctions.GuildVerificationLevel(ServerGuild) + "**" +
        "\n:white_medium_small_square: 2FA: **" + (ServerMFALevel >= 1 ? "On" : "Off") + "**" +
        "\n:white_medium_small_square: Content Filter: **" + CustomFunctions.Guild_GetContentFilter(ServerContentFilter) + "**";

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Server Information", bot.user.displayAvatarURL())
        .setDescription(szDescription)
        .setColor(2003199)
        .setThumbnail((ServerGuild.iconURL() === null) ? ServerGuild.owner.user.displayAvatarURL() : ServerGuild.iconURL())
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())
        .setTimestamp()

        message.channel.send({ embed: DiscordRichEmbed });
    }
};

module.exports.help =
{
    name: "serverinfo"
};