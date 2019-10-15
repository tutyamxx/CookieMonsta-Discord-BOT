
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>
{
    message.channel.send("Info sent. Please check your DM :mailbox_with_mail:");

    let FormatHelpMessage = ":cookie: <:cookiemonsta:414433388104253450> Hi there pleb! I'm ``Cookie Monsta`` <:cookiemonsta:414433388104253450> :cookie: \n\n\nTo see all the available commands, click :point_right: [HERE!](https://github.com/tutyamxx/CookieMonsta-BOT) :point_left:\n\n\nAlso, if you don't mind, please vote me :point_right: [HERE!](https://discordbots.org/bot/412067927333011470/vote) :point_left:";

    const embed = new Discord.RichEmbed()
    .setTitle("Cookie Monsta | Information and Commands")
    .setColor(2003199)
    .setDescription(FormatHelpMessage)
    .setThumbnail((bot.user.avatarURL === null) ? bot.user.defaultAvatarURL :  bot.user.avatarURL)
    .setTimestamp()

    await message.author.send({embed});

    await message.react("🍪");
    await message.react(":cookiemonsta:414433388104253450");
};

module.exports.help =
{
    name: "help"
};
