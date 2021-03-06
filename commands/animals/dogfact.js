const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("https://some-random-api.ml/dogfact").then((response) =>
    {
        // --| Remove "" from start and end of string
        const DogFactToString = JSON.stringify(response.data.fact).replace(/"/g, "").replace(/\\/g, "``");

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Dog Facts", bot.user.displayAvatarURL())
        .setColor("#A0522D")
        .setDescription(DogFactToString)
        .setThumbnail("https://i.imgur.com/ssEFccy.png")
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Did you know? Dogs can bite internet cables and kill the API connection? :cry:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "dogfact"
};