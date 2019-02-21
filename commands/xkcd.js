
const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    message.channel.startTyping();

    var iRandomComic = Math.floor((Math.random() * 1958) + 1);
    var user = message.author;

    await getJSON("https://xkcd.com/" + iRandomComic + "/info.0.json", async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Comics are dead... well, at least for now... :sob:  :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        var ComicTitle = JSON.stringify(response.title).replace(/"/g, '');
        var ComicDescription = JSON.stringify(response.alt).replace(/"/g, '').replace(/\\/g, "'");
        var ComicImageURL = JSON.stringify(response.img).replace(/"/g, '');

        const embed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | XKCD Comic Number: #" + iRandomComic + " | " + ComicTitle, (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#808080")
        .setDescription(ComicDescription)
        .setImage(ComicImageURL)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({embed}).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "xkcd"
};
