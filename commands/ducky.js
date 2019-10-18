const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await getJSON("https://random-d.uk/api/v1/random", async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, the ducks got upset! Try again later :crying_cat_face:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        let DuckImageToString = JSON.stringify(await response.url).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Ducky", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(8421376)
        .setImage(DuckImageToString)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(function (message)
        {
            message.react("🦆");
        });
    });
};

module.exports.help =
{
    name: "ducky"
};