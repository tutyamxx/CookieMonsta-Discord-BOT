const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    await getJSON("https://some-random-api.ml/meme", async function (error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Aww snap, something went wrong lebrowsky! Try again? :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        let szRandomMemeImage = JSON.stringify(await response.image).replace(/"/g, '');
        let szRandomMemeCaption = JSON.stringify(await response.caption).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Meme", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#66ff33")
        .setImage(szRandomMemeImage)
        .setThumbnail("https://i.imgur.com/VfYk6YT.png")
        .setDescription(szRandomMemeCaption)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "meme"
};