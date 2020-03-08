const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("https://official-joke-api.herokuapp.com/random_joke").then((response) =>
    {
        const GetJokeType = JSON.stringify(response.data.type).replace(/"/g, "");
        const GetRandomJoke = JSON.stringify(response.data.setup).replace(/"/g, "").replace(/\\/g, "'").replace(/&quot;/g, '\\"').replace(/\\n/g, " ").replace(/\\t/g, " ").replace(/\\/g, "");
        const GetJokePunchline = JSON.stringify(response.data.punchline).replace(/"/g, "").replace(/\\/g, "'").replace(/&quot;/g, '\\"').replace(/\\n/g, " ").replace(/\\t/g, " ").replace(/\\/g, "");

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Punchline Jokes | " + CustomFunctions.capitalizeFirstLetter(GetJokeType), bot.user.displayAvatarURL())
        .setColor("#32CD32")
        .setDescription(":black_joker: " + GetRandomJoke + "\n\n:right_facing_fist::dash: " + GetJokePunchline)
        .setThumbnail("https://static-cdn.jtvnw.net/emoticons/v1/425618/3.0")
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Sorry, but somehow I can't fetch any jokes at the moment... :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "punchjoke"
};