const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("https://some-random-api.ml/pikachuimg").then((response) =>
    {
        // --| Remove "" from start and end of string
        const PikaImageToString = JSON.stringify(response.data.link).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Random Pikachu", bot.user.displayAvatarURL())
        .setColor("#ffd264")
        .setThumbnail("https://i.imgur.com/5S4Nk2M.jpg")
        .setImage(PikaImageToString)
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        message.channel.send({ embed: DiscordRichEmbed }).then(async (message) =>
        {
            await message.react(":pika:635524509621026850");

        }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Pika? Pika? Errorka! :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "pika"
};