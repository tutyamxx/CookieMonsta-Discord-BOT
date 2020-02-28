const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("https://quote-garden.herokuapp.com/quotes/random").then((response) =>
    {
        // --| Remove "" from start and end of string
        const RandomQuoteText = response.data.quoteText.trim();
        const RandomQuoteAuthor = response.data.quoteAuthor;

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Quote", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#cc33ff")
        .setDescription(":speech_left:  *" + RandomQuoteText + "*\n\n\n**-** :label: " + (CustomFunctions.isEmpty(RandomQuoteAuthor) ? "Unknown Author" : RandomQuoteAuthor))
        .setThumbnail("https://i.imgur.com/BdjxI8e.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Sorry, I can't seem to find a random quote at the moment...  :crying_cat_face:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "quote"
};