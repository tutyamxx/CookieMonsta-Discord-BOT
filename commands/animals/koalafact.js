const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("https://some-random-api.ml/facts/koala").then((response) =>
    {
        // --| Remove "" from start and end of string
        const KoalaFactToString = JSON.stringify(response.data.fact).replace(/"/g, "").replace(/\\/g, "``");

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Koala Facts", bot.user.displayAvatarURL())
        .setColor("#dddad0")
        .setDescription(KoalaFactToString)
        .setThumbnail("https://i.imgur.com/Ch7vTxz.png")
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Did you know? Koalas are so protected that, they might have disappeared? :cry:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "koalafact"
};