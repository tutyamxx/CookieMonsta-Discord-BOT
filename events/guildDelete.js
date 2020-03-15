const Discord = require("discord.js");

module.exports = (bot, guild) =>
{
    const DiscordRichEmbed = new Discord.MessageEmbed()
    .setAuthor("Cookie Monsta | Left the guild: (" + guild.name + ")", bot.user.displayAvatarURL())
    .setColor(14423100)
    .setThumbnail(guild.iconURL())
    .setDescription(":speaking_head::loudspeaker: I have left the guild: **(" + guild.name + ")**")
    .setFooter("Now in #" + bot.guilds.cache.size + " guilds!")
    .setTimestamp()

    bot.channels.cache.get("634842132808597505").send({ embed: DiscordRichEmbed });
};