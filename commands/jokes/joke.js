const Discord = require("discord.js");
const axios = require("axios");

const RandomLaughEmoji =
[
    ":laughing:", ":rofl:", ":call_me:", ":joy:", ":scream:", ":clap:", ":ok_hand:", ":rofl:", ":thumbsup:", ":upside_down:"
];

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    await axios.get("https://api.icndb.com/jokes/random").then(async (response) =>
    {
        // --| Remove "" from start and end of string and also replace &quot; with ""
        const RandomJokeToString = JSON.stringify(await response.data.value.joke).replace(/"/g, "").replace(/&quot;/g, '\\"');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Joke", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(10526880)
        .setDescription(RandomJokeToString + " " + RandomLaughEmoji[Math.floor(Math.random() * RandomLaughEmoji.length)])
        .setThumbnail("https://i.imgur.com/Fx73HXI.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Sorry, but Chuck Norris reported some kind of problems, try again later. :disappointed_relieved:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "joke"
};