const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("https://api.apithis.net/yomama.php").then((response) =>
    {
        const StringYoMama = response.data.replace(/"/g, "").replace(/'/g, "").replace(/\[/g, '').replace(/\]/g, "").replace(/\\/g, '"').replace("\n", "");

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Yo momma joke", bot.user.displayAvatarURL())
        .setColor(16776960)
        .setDescription(StringYoMama)
        .setThumbnail("https://i.imgur.com/03aDAhq.png")
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Yo mama so fat, it broke the internet! Try again later :sob:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "yomama"
};