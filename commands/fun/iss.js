const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    await axios.get("http://api.open-notify.org/iss-now.json").then(async (response) =>
    {
        const iLocLatitude = JSON.stringify(await response.data.iss_position.latitude).replace(/"/g, "");
        const iLocLongitude = JSON.stringify(await response.data.iss_position.longitude).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | International Space Station Location", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#00BFFF")
        .setDescription(":satellite_orbital: **Location:** :satellite_orbital:\n\n:satellite: **Latitude:** " + iLocLatitude + "°\n:satellite: **Longitude:** " + iLocLongitude + "°")
        .setThumbnail("https://i.imgur.com/T3zXl0F.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
        .setTimestamp();

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Sorry, something went wrong while fetching NASA ISS location... :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "iss"
};