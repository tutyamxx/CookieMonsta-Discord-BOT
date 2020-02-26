const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    await message.channel.startTyping();

    const iRandomComic = Math.floor((Math.random() * 2272) + 1);
    const user = message.author;

    await axios.get("https://xkcd.com/" + iRandomComic + "/info.0.json").then(async (response) =>
    {
        const ComicTitle = JSON.stringify(await response.data.title).replace(/"/g, "");
        const ComicDescription = JSON.stringify(await response.data.alt).replace(/"/g, "").replace(/\\/g, "'");
        const ComicImageURL = JSON.stringify(await response.data.img).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | XKCD Comic Number: #" + iRandomComic + " | " + ComicTitle, (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#808080")
        .setDescription(ComicDescription)
        .setImage(ComicImageURL)
        .setThumbnail("https://i.imgur.com/4uj0Djx.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Comics are dead... well, at least for now... :sob:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "xkcd"
};