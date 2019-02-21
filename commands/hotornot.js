
const Discord = require("discord.js");

const GetDatabaseData = require("../functions/getuserdata.js");

module.exports.run = async (bot, message, args) =>
{
	var user = message.author;

	var HotPercentage = Math.floor(( Math.random() * 100 ) + 1);

	var EmoticonHotOrNot;
	var ColorHotOrNot;

	if(HotPercentage < 55)
	{
		EmoticonHotOrNot = ":name_badge:";
		ColorHotOrNot = 16711680;
	}

	else if(HotPercentage >= 100)
	{
		EmoticonHotOrNot = ":sparkles:";
		ColorHotOrNot = 16724889;

		await message.channel.send(":heart_eyes: ***" + user.username + "*** is  **100%** HOT! For that, he won **15** cookies :cookie: ! :heart_eyes:");
		await GetDatabaseData.CookiesUpdate(message.guild.id, user.id, 15);
	}

	else
	{
		EmoticonHotOrNot = ":fire:";
		ColorHotOrNot = 14833698;
	}

	const embed = new Discord.RichEmbed()
	.setAuthor("Cookie Monsta | HOT or NOT!", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
	.setColor(ColorHotOrNot)
	.setDescription(user + `, you're **${HotPercentage}%** HOT ` + EmoticonHotOrNot)
	.setThumbnail("https://i.imgur.com/yLMzwps.png")
	.setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

	await message.channel.send({embed});
};

module.exports.help =
{
    name: "hotornot"
};
