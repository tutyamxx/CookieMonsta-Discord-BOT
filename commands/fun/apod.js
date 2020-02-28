
const Discord = require("discord.js");
const axios = require("axios");
const BotConfig = require("../../config/botconfig.json");

const szAPIKey = BotConfig.NASA_API_Key.trim();

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    let NasaMessageEdit = await message.channel.send("Pinging **NASA** database :satellite: for the feed...");

    axios.get("https://api.nasa.gov/planetary/apod?api_key=" + szAPIKey).then(async (response) =>
    {
        if(JSON.stringify(response.data.media_type).replace(/"/g, '') === "video")
        {
            return await NasaMessageEdit.edit(":no_entry: Sorry, there is **no picture** :milky_way: available for today! :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        }

        const szTitle = JSON.stringify(response.data.title).replace(/"/g, "");
        const szImageHDURL = JSON.stringify(response.data.hdurl).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Astronomy Picture of the Day", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#8A2BE2")
        .setDescription(":milky_way: **Picture Name:** `" + szTitle + "`\n\n\n\n:link: [Download FullHD Image](" + szImageHDURL + ") :link:")
        .setImage(szImageHDURL)
        .setThumbnail((bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        return await NasaMessageEdit.edit({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await NasaMessageEdit.edit(":no_entry: Sorry, something went wrong while fetching NASA API... :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "apod"
};