const Discord = require("discord.js");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;
    const GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    }

    message.channel.startTyping();

    const PicEmojis = [ ":mount_fuji:", ":mountain:", ":mountain_snow:", ":sunrise_over_mountains:", ":sunrise:", ":city_sunset:" ];
    const RandomPicEmojis = PicEmojis[Math.floor(Math.random() * PicEmojis.length)];

    const DiscordRichEmbed = new Discord.MessageEmbed()
    .setAuthor("Cookie Monsta | User Avatar ", bot.user.displayAvatarURL())
    .setDescription(`${RandomPicEmojis} Here is ${GuildMember.user}'s avatar :small_red_triangle_down:`)
    .setColor(2003199)
    .setImage(GuildMember.user.displayAvatarURL({ size: 2048 }))
    .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

    message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
};

module.exports.help =
{
    name: "avatar"
};
