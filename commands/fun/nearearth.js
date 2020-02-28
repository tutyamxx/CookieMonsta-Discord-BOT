const Discord = require("discord.js");
const axios = require("axios");
const BotConfig = require("../../config/botconfig.json");

const szAPIKey = BotConfig.NASA_API_Key.trim();

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    const szRandomEarthEmoji = [":earth_africa:", ":earth_americas:", ":earth_asia:"];
    const szRandomEarthObjects = [":comet:", ":eight_pointed_black_star:", ":black_circle:", ":sparkler:", ":space_invader:"];

    message.channel.startTyping();

    axios.get("https://api.nasa.gov/neo/rest/v1/feed/today?detailed=false&api_key=" + szAPIKey).then((response) =>
    {
        const iCountObjects = JSON.stringify(response.data.element_count).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | NASA Near Earth Object", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#D2691E")
        .setDescription("There are **" + parseInt(iCountObjects) + "** near-earth " + szRandomEarthEmoji[Math.floor(Math.random() * szRandomEarthEmoji.length)] + " objects " + szRandomEarthObjects[Math.floor(Math.random() * szRandomEarthObjects.length)] + " circulating around the globe right now!")
        .setThumbnail("https://i.imgur.com/lprxAaW.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
        .setTimestamp()

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Sorry, something went wrong while fetching NASA API... :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
	name: "nearearth"
};