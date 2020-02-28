const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("http://www.yerkee.com/api/fortune/wisdom").then((response) =>
    {
        // --| Remove "" from start and end of string, remove \n, \t, \ from string
        const FortuneToString = JSON.stringify(response.data.fortune).replace(/"/g, "").replace(/\\n/g, " ").replace(/\\t/g, " ").replace(/\\/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Your fortune says...", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(16747520)
        .setDescription(":label: " + FortuneToString)
        .setThumbnail("https://i.imgur.com/sYWuVKG.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Sorry, but the well of fortunes isn't displaying anything at the moment. Try later. :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "fortune"
};