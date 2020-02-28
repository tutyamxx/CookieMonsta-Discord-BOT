const Discord = require("discord.js");
const axios = require("axios");
const BotConfig = require("../../config/botconfig.json");

const CatHeader =
{
    headers:
    {
        "X-API-Key": BotConfig.TheCatAPI_Key.trim()
    }
};

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("https://api.thecatapi.com/v1/images/search", CatHeader).then((response) =>
    {
        const CatImageURL = response.data[0].url;

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Cat", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#FECB4D")
        .setImage(CatImageURL)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        message.channel.send({ embed: DiscordRichEmbed }).then(async (message) =>
        {
            await message.react("🐱");

        }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Sorry, the purr factory isn't generating kittens at the moment :crying_cat_face:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "cat"
};