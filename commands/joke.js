
const Discord = require("discord.js");
const getJSON = require("get-json");

const RandomLaughEmoji =
[
    ":laughing:", ":rofl:", ":call_me:", ":joy:", ":scream:", ":clap:", ":ok_hand:", ":rofl:", ":thumbsup:", ":upside_down:"
];

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    await getJSON('https://api.icndb.com/jokes/random', async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, but Chuck Norris reported some kind of problems, try again later. :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string and also replace &quot; with ""
        let RandomJokeToString = JSON.stringify(response.value.joke).replace(/"/g, '').replace(/&quot;/g, '\\"');

        const embed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Joke", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(10526880)
        .setDescription(RandomJokeToString + " " + RandomLaughEmoji[Math.floor(Math.random() * RandomLaughEmoji.length)])
        .setThumbnail("https://i.imgur.com/Fx73HXI.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({embed}).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "joke"
};
