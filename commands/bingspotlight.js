
const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    const PicEmojis = [ ":mount_fuji:", ":mountain:", ":mountain_snow:", ":sunrise_over_mountains:", ":sunrise:", ":city_sunset:" ];
    let RandomPicEmojis = PicEmojis[Math.floor(Math.random() * PicEmojis.length)];

    message.channel.startTyping();

    await getJSON("http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1", async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, but something went wrong during the API communication with Bing :disappointed_relieved:  :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        let SpotlightImageDesc = JSON.stringify(response.images[0].copyright).replace(/"/g, '');
        let SpotlightDownloadURL = "https://www.bing.com" + JSON.stringify(response.images[0].url).replace(/"/g, '');

        const embed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Bing Today's Spotlight", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#" + (Math.random() * 0xFFFFFF << 0).toString(16))
        .setDescription("\n\n" + RandomPicEmojis + " " + SpotlightImageDesc + "\n\n:link: [Download FullHD Image](" + SpotlightDownloadURL + ") :link:")
        .setImage(SpotlightDownloadURL)
        .setThumbnail("https://i.imgur.com/i7oFZRE.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({embed}).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "bingspotlight"
};
