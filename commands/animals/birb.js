const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await getJSON("https://some-random-api.ml/img/birb", async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, no birbs to generate. Try again later :bird:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        let RandomBirb = JSON.stringify(await response.link).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Birb", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(11001920)
        .setImage(RandomBirb)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(function (message)
        {
            message.react("🦉");
            message.react("🐦");
        });
    });
};

module.exports.help =
{
    name: "birb"
};