const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    await axios.get("https://dog.ceo/api/breeds/image/random").then(async (response) =>
    {
        // --| Remove "" from start and end of string
        const DogImageToString = JSON.stringify(await response.data.message).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Dog", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(16777215)
        .setImage(DogImageToString)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async (message) =>
        {
            await message.react("🐶");

        }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Sorry, but the canine factory isn't generating new dogos at the moment. :dog2:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "dog"
};