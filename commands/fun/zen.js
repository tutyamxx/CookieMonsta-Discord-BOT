const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("https://api.github.com/zen").then((response) =>
    {
        const ZenWords = response.data.replace(/"/g, "").replace(/'/g, "").replace(/\[/g, "").replace(/\]/g, "").replace(/\\/g, '"');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | GitHub Zen", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(16777037)
        .setThumbnail("https://i.imgur.com/6pFPKvA.png")
        .setDescription(":tanabata_tree: " + ZenWords)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        message.channel.send({ embed: DiscordRichEmbed }).then(async (message) =>
        {
            await message.react("🎋");

        }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Something went wrong! Be patient, try again later! :sob:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "zen"
};