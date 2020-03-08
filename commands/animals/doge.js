const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("http://shibe.online/api/shibes?count=1&httpsUrls=true").then((response) =>
    {
        // --| Remove "" from start and end of string
        const DogeToString = JSON.stringify(response.data[0]).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Random Doge", bot.user.displayAvatarURL())
        .setColor(16753920)
        .setImage(DogeToString)
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        message.channel.send({ embed: DiscordRichEmbed }).then(async (message) =>
        {
            await message.react("🐶");

        }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Such sad! Much cry! Ain't working atm, dog. :cry:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "doge"
};