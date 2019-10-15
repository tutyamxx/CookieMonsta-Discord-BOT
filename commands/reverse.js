
const Discord = require("discord.js");

const CustomFunctions = require("../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
	if(CustomFunctions.isEmpty(szArgs[0]))
	{
		return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!reverser** ``<text to reverse>`` :no_entry:");
	}

	if(message.mentions.members.first())
	{
		return await message.reply(" :no_entry: this isn't a plain text you m0ng0l! :face_palm:  :no_entry:");
	}

	let ArgumentText = szArgs.join(" ");

	await message.channel.send(CustomFunctions.reverseString(ArgumentText) + "  :track_previous:  **v(▀̿Ĺ̯▀̿*)**");
};

module.exports.help =
{
    name: "reverse"
};
