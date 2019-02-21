
const Discord = require("discord.js");
const getJSON = require("get-json");

const CustomFunctions = require("../functions/funcs.js");

module.exports.run = async (bot, message, args) =>
{
	var user = message.author;

	message.channel.startTyping();

	await getJSON("https://official-joke-api.herokuapp.com/random_joke", async function(error, response)
	{
		if(error)
		{
			return await message.channel.send(":no_entry: Sorry, but somehow I can't fetch any jokes at the moment... :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
		}

		var GetJokeType = JSON.stringify(response.type).replace(/"/g, '');
		var GetRandomJoke = JSON.stringify(response.setup).replace(/"/g, '').replace(/\\/g, "'").replace(/&quot;/g, '\\"').replace(/\\n/g, " ").replace(/\\t/g, " ").replace(/\\/g, "");
		var GetJokePunchline = JSON.stringify(response.punchline).replace(/"/g, '').replace(/\\/g, "'").replace(/&quot;/g, '\\"').replace(/\\n/g, " ").replace(/\\t/g, " ").replace(/\\/g, "");

		const embed = new Discord.RichEmbed()
		.setAuthor("Cookie Monsta | Punchline Jokes | " + CustomFunctions.capitalizeFirstLetter(GetJokeType), (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
		.setColor("#32CD32")
		.setDescription(":black_joker: " + GetRandomJoke + "\n\n:right_facing_fist::dash: " + GetJokePunchline)
		.setThumbnail("https://static-cdn.jtvnw.net/emoticons/v1/425618/3.0")
		.setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

		await message.channel.send({embed}).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
	});
};

module.exports.help =
{
    name: "punchjoke"
};
