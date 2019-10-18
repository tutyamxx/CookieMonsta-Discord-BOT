const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await getJSON("https://nekos.life/api/lizard", async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, no lizzibois found. Try again later :lizard:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        let LizzyImageToString = JSON.stringify(await response.url).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Lizzy Boi", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(4443520)
        .setImage(LizzyImageToString)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(function (message)
        {
            message.react("🦎");
        });
    });
};

module.exports.help =
{
    name: "lizzy"
};