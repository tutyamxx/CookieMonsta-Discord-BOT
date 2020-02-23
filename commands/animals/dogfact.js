const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    await axios.get("https://some-random-api.ml/dogfact").then(async (response) =>
    {
        // --| Remove "" from start and end of string
        const DogFactToString = JSON.stringify(await response.fact).replace(/"/g, "").replace(/\\/g, "``");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Dog Facts", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#A0522D")
        .setDescription(DogFactToString)
        .setThumbnail("https://i.imgur.com/ssEFccy.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
        
    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Did you know? Dogs can bite internet cables and kill the API connection? :cry:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "dogfact"
};