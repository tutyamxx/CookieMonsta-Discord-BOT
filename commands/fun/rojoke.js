const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

const RandomHexColors = [ "#002B7F", "#FCD116", "#CE1126" ];

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("https://romanian-jokes-api.herokuapp.com/api/romanianjokes").then((response) =>
    {
        const RomanianJokeCategory = CustomFunctions.capitalizeFirstLetter(response.data.joketype.toString());
        const RomanianJoke = response.data.joke.toString();

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Romanian Joke", bot.user.displayAvatarURL())
        .setColor(RandomHexColors[Math.floor(Math.random() * RandomHexColors.length)])
        .setDescription("`Joke Type`:\n" + RomanianJokeCategory + "\n\n`Joke`: \n" + RomanianJoke)
        .setThumbnail("https://raw.githubusercontent.com/tutyamxx/Romanian-Jokes-API/master/joke.png")
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())
        .setTimestamp();

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Sorry, something went wrong fetching a Romanian :flag_ro: joke, try again lateR?  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "rojoke"
};