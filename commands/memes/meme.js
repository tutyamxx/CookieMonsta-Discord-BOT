const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("https://some-random-api.ml/meme").then((response) =>
    {
        const szRandomMemeImage = JSON.stringify(response.data.image).replace(/"/g, "");
        const szRandomMemeCaption = JSON.stringify(response.data.caption).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Random Meme", bot.user.displayAvatarURL())
        .setColor("#66ff33")
        .setImage(szRandomMemeImage)
        .setThumbnail("https://i.imgur.com/VfYk6YT.png")
        .setDescription(szRandomMemeCaption)
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Aww snap, something went wrong lebrowsky! Try again? :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "meme"
};
