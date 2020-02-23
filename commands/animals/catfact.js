const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    await axios.get("https://some-random-api.ml/catfact").then(async (response) =>
    {
        // --| Remove "" from start and end of string
        const CatFactToString = JSON.stringify(await response.data.fact).replace(/"/g, "").replace(/\\/g, "``");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Cat Facts", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#E6E6FA")
        .setDescription(CatFactToString)
        .setThumbnail("https://i.imgur.com/xnTRVHO.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    
    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: some kind of error has occured! Try again later? :crying_cat_face:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "catfact"
};