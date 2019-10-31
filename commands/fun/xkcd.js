const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    message.channel.startTyping();

    const iRandomComic = Math.floor((Math.random() * 1958) + 1);
    let user = message.author;

    await getJSON("https://xkcd.com/" + iRandomComic + "/info.0.json", async (error, response) =>
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Comics are dead... well, at least for now... :sob:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        let ComicTitle = JSON.stringify(await response.title).replace(/"/g, '');
        let ComicDescription = JSON.stringify(await response.alt).replace(/"/g, '').replace(/\\/g, "'");
        let ComicImageURL = JSON.stringify(await response.img).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | XKCD Comic Number: #" + iRandomComic + " | " + ComicTitle, (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#808080")
        .setDescription(ComicDescription)
        .setImage(ComicImageURL)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "xkcd"
};