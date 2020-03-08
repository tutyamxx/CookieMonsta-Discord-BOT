const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>
{
    message.channel.send("Info sent. Please check your DM :mailbox_with_mail:");

    let FormatHelpMessage = ":cookie: <:cookiemonsta:634866060465537034> Hi there pleb! I'm ``Cookie Monsta`` <:cookiemonsta:634866060465537034> :cookie: \n\n\nTo see all the available commands, click :point_right: [HERE!](https://tutyamxx.github.io/cookie-monsta-website/commands.html) :point_left:";

    const DiscordRichEmbed = new Discord.MessageEmbed()
    .setTitle("Cookie Monsta | Information and Commands")
    .setColor(2003199)
    .setDescription(FormatHelpMessage)
    .setThumbnail(bot.user.displayAvatarURL())
    .setTimestamp()

    message.author.send({ embed: DiscordRichEmbed });

    await message.react("🍪");
    await message.react(":cookiemonsta:634866060465537034");
};

module.exports.help =
{
    name: "help"
};