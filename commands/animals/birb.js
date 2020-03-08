const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("https://some-random-api.ml/img/birb").then((response) =>
    {
        const RandomBirb = JSON.stringify(response.data.link).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Random Birb", bot.user.displayAvatarURL())
        .setColor(11001920)
        .setImage(RandomBirb)
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        message.channel.send({ embed: DiscordRichEmbed }).then(async (message) =>
        {
            await message.react("🦉");
            await message.react("🐦");

        }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Sorry, no birbs to generate. Try again later :bird:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "birb"
};