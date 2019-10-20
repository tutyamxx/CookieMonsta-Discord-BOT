const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await getJSON("https://some-random-api.ml/pikachuimg", async function (error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Pika? Pika? Errorka! :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        let PikaImageToString = JSON.stringify(await response.link).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Pikachu", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#ffd264")
        .setThumbnail("https://i.imgur.com/zluuCA2.png")
        .setImage(PikaImageToString)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async (message) =>
        {
            await message.react(":pika:635524509621026850");
        });
    });
};

module.exports.help =
{
    name: "pika"
};