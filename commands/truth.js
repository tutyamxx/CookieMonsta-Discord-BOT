
const Discord = require("discord.js");
const Jimp = require("jimp");
const gm = require("gm").subClass({ imageMagick: true });
const wrap = require("word-wrap");

const CustomFunctions = require("../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
	const user = message.author;

	if(CustomFunctions.isEmpty(szArgs[0]))
	{
		return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!truth** ``<your text here>`` :no_entry:");
	}

	let ArgumentText = szArgs.join(" ");

	if(ArgumentText.length >= 158)
	{
		return await message.reply(" :no_entry: please don't exceed **158** characters in your truth description! :no_entry:");
	}

	if(message.mentions.members.first())
	{
		return await message.reply(" :no_entry: please don't mention people in your truth description! :no_entry:");
	}

	message.channel.startTyping();

	let TruthImagePath = "./BOTImages/Truth/truth.jpg";
	let FontSize = (ArgumentText.length >= 50) ? 16 : 22;
	let FormattedArgumentText = ArgumentText.replace(/'/g, "`").trim();

	await gm(TruthImagePath)
	.font("./BOTFonts/MangaSpeak.ttf", FontSize)
	.fill("#111111")
	.draw(["text 0, 193 '" + wrap(FormattedArgumentText, { width: (FormattedArgumentText.length >= 50) ? 21 : 15 }) + "'"])
	.toBuffer("truth.jpg", async function (err, buffer)
	{
		if(err)
		{
			return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
		}

		await message.channel.send(new Discord.Attachment(buffer, "truth.png")).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
	});
};

module.exports.help =
{
    name: "truth"
};
