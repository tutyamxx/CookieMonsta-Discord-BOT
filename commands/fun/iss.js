const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("http://api.open-notify.org/iss-now.json").then((response) =>
    {
        const iLocLatitude = JSON.stringify(response.data.iss_position.latitude).replace(/"/g, "");
        const iLocLongitude = JSON.stringify(response.data.iss_position.longitude).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | International Space Station Location", bot.user.displayAvatarURL())
        .setColor("#00BFFF")
        .setDescription(":satellite_orbital: **Location:** :satellite_orbital:\n\n:satellite: **Latitude:** " + iLocLatitude + "°\n:satellite: **Longitude:** " + iLocLongitude + "°")
        .setThumbnail("https://i.imgur.com/T3zXl0F.png")
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())
        .setTimestamp();

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Sorry, something went wrong while fetching NASA ISS location... :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "iss"
};