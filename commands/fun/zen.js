const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    await axios.get("https://api.github.com/zen").then(async (response) =>
    {
        const ZenWords = await response.data.replace(/"/g, "").replace(/'/g, "").replace(/\[/g, "").replace(/\]/g, "").replace(/\\/g, '"');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | GitHub Zen", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(16777037)
        .setThumbnail("https://i.imgur.com/6pFPKvA.png")
        .setDescription(":tanabata_tree: " + ZenWords)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async (message) =>
        {
            await message.react("🎋");

        }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Something went wrong! Be patient, try again later! :sob:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "zen"
};