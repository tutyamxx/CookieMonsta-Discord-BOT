const Discord = require("discord.js");
const DefChannel = require("../functions/defaultchannel.js");
const DatabaseImport = require("../database/database.js");

module.exports = async (bot, guild) =>
{
    let cDefaultChannel = await DefChannel.getDefaultChannel(guild);

    if(cDefaultChannel && cDefaultChannel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    {
        const DiscordRichEmbed = new Discord.RichEmbed()
        .setTitle("Cookie Monsta")
        .setColor(2003199)
        .setDescription("Hello ``" + guild.name + "``! I am <:cookiemonsta:634866060465537034> **Cookie Monsta** <:cookiemonsta:634866060465537034>, a fun bot built and developed by **tuty4amxx#3969**.\nThanks for adding me to your server! Here's a cookie for you :cookie: !\n\nType **!help** and I will send you a list of commands to you in a **Direct Message**. Now where did I put my cookies :cookie: ?")
        .setThumbnail(bot.user.avatarURL)

        cDefaultChannel.send({ embed: DiscordRichEmbed });
    }

    const DiscordRichEmbed2 = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Added to guild: (" +  guild.name + ")", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(3329330)
    .setDescription(":spy: Owner is **" + guild.owner.user.tag + "** ***" + guild.ownerID + "***\n\n:family_wwb: Has " + "**" + guild.memberCount + "** members\n\n:id: Guild ID is: **" + guild.id + "**")
    .setThumbnail((guild.iconURL === null) ? guild.owner.user.defaultAvatarURL : guild.iconURL)
    .setFooter("Now in #" + bot.guilds.size + " guilds!")
    .setTimestamp()

    bot.channels.get("634842132808597505").send({ embed: DiscordRichEmbed2 });

    for(user of bot.users)
    {
        if(!user[1].bot)
        {
            bUserHasGift[user[1].id] = 0;
            bAlreadyOpeningGift[user[1].id] = false;
        }
    }

    const GuildsList = await DatabaseImport.CookieMonsta_GetAllFromPrefix();

    for(const QueryResult of GuildsList)
    {
        const DiscordGuild = bot.guilds.get(QueryResult.guild);

        if(!DiscordGuild) continue;

        DiscordGuild.config = QueryResult;
    }

    console.log("\x1b[31m*\x1b[0m Joined a new guild: (\x1b[33m" + guild.name + "\x1b[0m)");
    console.log("\x1b[31m*\x1b[0m I have successfully cached guild prefixes!");
};