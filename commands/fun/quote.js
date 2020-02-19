const Discord = require("discord.js");
const getJSON = require("get-json");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    await getJSON("https://quote-garden.herokuapp.com/quotes/random", async (error, response) =>
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, I can't seem to find a random quote at the moment...  :crying_cat_face:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        let RandomQuoteText = await response.quoteText.trim();
        let RandomQuoteAuthor = await response.quoteAuthor;

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Quote", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#cc33ff")
        .setDescription(":speech_left:  *" + RandomQuoteText + "*\n\n\n**-** :label: " + (CustomFunctions.isEmpty(RandomQuoteAuthor) ? "Unknown Author" : RandomQuoteAuthor))
        .setThumbnail("https://i.imgur.com/BdjxI8e.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "quote"
};