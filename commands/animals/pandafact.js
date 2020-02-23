const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    await axios.get("https://some-random-api.ml/pandafact").then(async (response) =>
    {
        // --| Remove "" from start and end of string
        const PandaFactToString = JSON.stringify(await response.data.fact).replace(/"/g, "").replace(/\\/g, "``");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Panda Facts", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#000000")
        .setDescription(PandaFactToString)
        .setThumbnail("https://i.imgur.com/KQ2QMF2.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: some kind of error has occured! Try again later? :panda_face:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "pandafact"
};