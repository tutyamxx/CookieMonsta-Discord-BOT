
const Discord = require("discord.js");
const getJSON = require("get-json");

const szAPIKey = "Your NASA api key here";

module.exports.run = async (bot, message, args) =>
{
	var user = message.author;

    message.channel.startTyping();

	let NasaMessageEdit = await message.channel.send("Pinging **NASA** database :satellite: for the feed...");

	await getJSON("https://api.nasa.gov/planetary/apod?api_key=" + szAPIKey, async function(error, response)
	{
		if(error)
		{
			return await NasaMessageEdit.edit(":no_entry: Sorry, something went wrong while fetching NASA API... :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
		}

		if(JSON.stringify(response.media_type).replace(/"/g, '') === "video")
		{
			return await NasaMessageEdit.edit(":no_entry: Sorry, there is **no picture** :milky_way: available for today! :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
		}

        var szCopyRight = JSON.stringify(response.copyright).replace(/"/g, '').replace(/\\n/g, ' ');
        var szTitle = JSON.stringify(response.title).replace(/"/g, '');

        var szImageHDURL = JSON.stringify(response.hdurl).replace(/"/g, '');

        const embed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Astronomy Picture of the Day", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#8A2BE2")
        .setDescription(":milky_way: **Picture Name:** `" + szTitle + "`\n\n:bust_in_silhouette: **Copyright:copyright: :** " + szCopyRight + "\n\n\n\n:link: [Download FullHD Image](" + szImageHDURL + ") :link:")
        .setImage(szImageHDURL)
        .setThumbnail((bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        return await NasaMessageEdit.edit({embed}).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "apod"
};
