
const Discord = require("discord.js");
const getJSON = require("get-json");
const BotConfig = require("../../config/botconfig.json");

const szAPIKey = BotConfig.NASA_API_Key.trim();

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    let NasaMessageEdit = await message.channel.send("Pinging **NASA** database :satellite: for the feed...");

    await getJSON("https://api.nasa.gov/planetary/apod?api_key=" + szAPIKey, async function(error, response)
    {
        if(error)
        {
            return await NasaMessageEdit.edit(":no_entry: Sorry, something went wrong while fetching NASA API... :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        if(JSON.stringify(await response.media_type).replace(/"/g, '') === "video")
        {
            return await NasaMessageEdit.edit(":no_entry: Sorry, there is **no picture** :milky_way: available for today! :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        let szTitle = JSON.stringify(await response.title).replace(/"/g, '');
        let szImageHDURL = JSON.stringify(await response.hdurl).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Astronomy Picture of the Day", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#8A2BE2")
        .setDescription(":milky_way: **Picture Name:** `" + szTitle + "`\n\n\n\n:link: [Download FullHD Image](" + szImageHDURL + ") :link:")
        .setImage(szImageHDURL)
        .setThumbnail((bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        return await NasaMessageEdit.edit({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "apod"
};