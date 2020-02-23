const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    await axios.get("https://random-d.uk/api/v1/random").then(async (response) =>
    {
        // --| Remove "" from start and end of string
        const DuckImageToString = JSON.stringify(await response.data.url).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Ducky", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(8421376)
        .setImage(DuckImageToString)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async (message) =>
        {
            await message.react("🦆");

        }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Sorry, the ducks got upset! Try again later :crying_cat_face:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "ducky"
};