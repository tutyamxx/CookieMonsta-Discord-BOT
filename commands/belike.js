
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>
{
    var user = message.author;

    var BillURL = "https://belikebill.ga/billgen-API.php?default=1&name=" + user.username.toString() + "&sex=m" + Math.floor(Math.random() * 10000) + 1 + "&.jpg";

    const embed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Be Like Bill", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(16777062)
    .setImage(encodeURI(BillURL))
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

    await message.channel.send({embed});
};

module.exports.help =
{
    name: "belike"
};
