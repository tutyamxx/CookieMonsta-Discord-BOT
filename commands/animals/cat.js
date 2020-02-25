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

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    await axios.get("https://api.thecatapi.com/v1/images/search", CatHeader).then(async (response) =>
    {
        const CatImageURL = response.data[0].url;

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Cat", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(16777215)
        .setImage(CatImageURL)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async (message) =>
        {
            await message.react("🐱");

        }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Sorry, the purr factory isn't generating kittens at the moment :crying_cat_face:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "cat"
};