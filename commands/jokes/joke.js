const Discord = require("discord.js");
const axios = require("axios");

const RandomLaughEmoji =
[
    ":laughing:", ":rofl:", ":call_me:", ":joy:", ":scream:", ":clap:", ":ok_hand:", ":rofl:", ":thumbsup:", ":upside_down:"
];

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("https://api.icndb.com/jokes/random").then((response) =>
    {
        // --| Remove "" from start and end of string and also replace &quot; with ""
        const RandomJokeToString = JSON.stringify(response.data.value.joke).replace(/"/g, "").replace(/&quot;/g, '\\"');

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Random Joke", bot.user.displayAvatarURL())
        .setColor(10526880)
        .setDescription(RandomJokeToString + " " + RandomLaughEmoji[Math.floor(Math.random() * RandomLaughEmoji.length)])
        .setThumbnail("https://i.imgur.com/Fx73HXI.png")
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Sorry, but Chuck Norris reported some kind of problems, try again later. :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "joke"
};