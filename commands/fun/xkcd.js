const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    message.channel.startTyping();

    let iComicCount;
    await axios.get("https://xkcd.com/info.0.json").then((comic_response) =>
    {
        iComicCount = parseInt(comic_response.data.num);
    });

    const iRandomComic = Math.floor((Math.random() * iComicCount) + 1);
    const user = message.author;

    axios.get("https://xkcd.com/" + iRandomComic + "/info.0.json").then((response) =>
    {
        const ComicTitle = JSON.stringify(response.data.title).replace(/"/g, "");
        const ComicDescription = JSON.stringify(response.data.alt).replace(/"/g, "").replace(/\\/g, "'");
        const ComicImageURL = JSON.stringify(response.data.img).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | XKCD Comic Number: #" + iRandomComic + " | " + ComicTitle, (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#808080")
        .setDescription(ComicDescription)
        .setImage(ComicImageURL)
        .setThumbnail("https://i.imgur.com/4uj0Djx.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Comics are dead... well, at least for now... :sob:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "xkcd"
};