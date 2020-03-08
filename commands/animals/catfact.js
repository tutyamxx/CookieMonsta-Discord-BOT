const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("https://some-random-api.ml/catfact").then((response) =>
    {
        // --| Remove "" from start and end of string
        const CatFactToString = JSON.stringify(response.data.fact).replace(/"/g, "").replace(/\\/g, "``");

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Cat Facts", bot.user.displayAvatarURL())
        .setColor("#E6E6FA")
        .setDescription(CatFactToString)
        .setThumbnail("https://i.imgur.com/xnTRVHO.png")
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: some kind of error has occured! Try again later? :crying_cat_face:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "catfact"
};