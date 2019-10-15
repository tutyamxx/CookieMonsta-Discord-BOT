
const Discord = require("discord.js");
const gm = require("gm").subClass({ imageMagick: true });
const Jimp = require("jimp");
const DefChannel = require("../functions/defaultchannel.js");

module.exports = async (bot, guild) =>
{
    let channel = DefChannel.getDefaultChannel(guild);

    if(channel && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    {
        const embed = new Discord.RichEmbed()
        .setTitle("Cookie Monsta")
        .setColor(2003199)
        .setDescription("Hello ``" + guild.name + "``! I am <:cookiemonsta:414433388104253450> **Cookie Monsta** <:cookiemonsta:414433388104253450>, a fun bot built and developed by **tuty4amxx#3969**.\nThanks for adding me to your server! Here's a cookie for you :cookie: !\n\nType **!help** and I will send you a list of commands to you in a **Direct Message**. Now where did I put my cookies :cookie: ?")
        .setThumbnail(bot.user.avatarURL)

        await channel.send({embed});
    }

    const embed2 = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Added to guild: (" +  guild.name + ")", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(3329330)
    .setDescription(":spy: Owner is **" + guild.owner.user.tag + "** ***" + guild.ownerID + "***\n\n:family_wwb: Has " + "**" + guild.memberCount + "** members\n\n:id: Guild ID is: **" + guild.id + "**")
    .setThumbnail((guild.iconURL === null) ? guild.owner.user.defaultAvatarURL : guild.iconURL)
    .setFooter("Now in #" + bot.guilds.size + " guilds!")
    .setTimestamp()

    await bot.channels.get('412677989185093633').send({ embed: embed2 });

    for(user of bot.users)
    {
        if(!user[1].bot)
        {
            bUserHasGift[user[1].id] = 0;
            bAlreadyOpeningGift[user[1].id] = false;
        }
    }

    console.log("[+] Log Report [+] --> Joined a new guild: (" + guild.name + ")");
};
