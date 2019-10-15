
const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
	const user = message.author;

	message.channel.startTyping();

	await getJSON("http://api.open-notify.org/iss-now.json", async function(error, response)
	{
		if(error)
		{
			return await message.channel.send(":no_entry: Sorry, something went wrong while fetching NASA ISS location... :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
		}

		let iLocLatitude = JSON.stringify(response.iss_position.latitude).replace(/"/g, '');
		let iLocLongitude = JSON.stringify(response.iss_position.longitude).replace(/"/g, '');

		const embed = new Discord.RichEmbed()
		.setAuthor("Cookie Monsta | International Space Station Location", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
		.setColor("#00BFFF")
		.setDescription(":satellite_orbital: **Location:** :satellite_orbital:\n\n:satellite: **Latitude:** " + iLocLatitude + "°\n:satellite: **Longitude:** " + iLocLongitude + "°")
		.setThumbnail("https://i.imgur.com/T3zXl0F.png")
		.setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
		.setTimestamp();

		await message.channel.send({embed}).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
	});
};

module.exports.help =
{
    name: "iss"
};
