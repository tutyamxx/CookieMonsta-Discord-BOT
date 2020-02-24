const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    await axios.get("https://some-random-api.ml/meme").then(async (response) =>
    {
        const szRandomMemeImage = JSON.stringify(await response.data.image).replace(/"/g, "");
        const szRandomMemeCaption = JSON.stringify(await response.data.caption).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Meme", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#66ff33")
        .setImage(szRandomMemeImage)
        .setThumbnail("https://i.imgur.com/VfYk6YT.png")
        .setDescription(szRandomMemeCaption)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Aww snap, something went wrong lebrowsky! Try again? :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "meme"
};
