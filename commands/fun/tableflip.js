const Discord = require("discord.js");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    const DiscordRichEmbed = new Discord.MessageEmbed()
    .setAuthor("Cookie Monsta | (╯°□°)╯︵ ┻━┻", bot.user.displayAvatarURL())
    .setColor(16777215)
    .setDescription("(╯°□°)╯︵ ┻━┻ FLIP THAT TABLE.\n\n┻━┻ ︵ ヽ(°□°ヽ) FLIP THIS TABLE..\n\n┻━┻ ︵ ＼('0')/／ ︵ ┻━┻ FLIP ALL THE TABLES!\n\nಠ_ಠ *Son...*\n\nಠ____ಠ Put.\n\nಠ____ಠ The tables.\n\nಠ____ಠ Back.\n\n(╮°-°)╮┳━┳\n\n(╯°□°)╯︵ ┻━┻ NEVER!!!!")
    .setImage("https://i.kinja-img.com/gawker-media/image/upload/s--iQjAucgS--/c_scale,f_auto,fl_progressive,q_80,w_800/hojkokfijt0ujov9lobq.gif")
    .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

    message.channel.send({ embed: DiscordRichEmbed })
};

module.exports.help =
{
    name: "tableflip"
};