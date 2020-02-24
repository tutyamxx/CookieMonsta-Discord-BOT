const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    const PicEmojis = [ ":mount_fuji:", ":mountain:", ":mountain_snow:", ":sunrise_over_mountains:", ":sunrise:", ":city_sunset:" ];
    const RandomPicEmojis = PicEmojis[Math.floor(Math.random() * PicEmojis.length)];

    await message.channel.startTyping();

    await axios.get("http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1").then(async (response) =>
    {
        const SpotlightImageDesc = JSON.stringify(await response.data.images[0].copyright).replace(/"/g, "");
        const SpotlightDownloadURL = "https://www.bing.com" + JSON.stringify(await response.data.images[0].url).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Bing Today's Spotlight", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#" + (Math.random() * 0xFFFFFF << 0).toString(16))
        .setDescription("\n\n" + RandomPicEmojis + " " + SpotlightImageDesc + "\n\n:link: [Download FullHD Image](" + SpotlightDownloadURL + ") :link:")
        .setImage(SpotlightDownloadURL)
        .setThumbnail("https://i.imgur.com/i7oFZRE.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Sorry, but something went wrong during the API communication with Bing :disappointed_relieved:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "bingspotlight"
};