
const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports.run = async (bot, message, args) =>
{
	let GuildMember = message.mentions.members.first();

	if(!GuildMember)
	{
		return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
	}

	message.channel.startTyping();

	let GetUserAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

	await Jimp.read(GetUserAvatar).then(async function (image)
	{
		await image.pixelate(20).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
		{
			if(err)
			{
				return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
			}

			await message.channel.send(new Discord.Attachment(buffer, "pixelated.png")).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
		});
	});
};

module.exports.help =
{
    name: "pixel"
};
