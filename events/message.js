
const Discord = require("discord.js");
const gm = require("gm").subClass({ imageMagick: true });
const Jimp = require("jimp");

const CookieMonsta = require("../CookieMonstaBOT.js");
const GetDatabaseData = require("../functions/getuserdata.js");

const szPrefix = "!";

let iCmdCooldown = new Set();
let iCooldownTime = 5;

let iUserCooldown = {};
let iUserGiftTimer = {};
let iCheckIfOpenGift = {};

module.exports = async (bot, message) =>
{
	const user = message.author;

	if(user.bot)
	{
		return;
	}

    if(message.channel.type !== "text")
	{
		return message.channel.send(":no_entry: Sorry, I don't reply to **Direct Messages** :upside_down: :no_entry:");
	}

	let GuildGetID = message.guild.id;
	await GetDatabaseData.CookiesUpdate(GuildGetID, user.id, 0);

	if(message.guild)
	{
		// --| Add XP between 15 and 25 random
		CookieMonsta.UserDatabaseData.points += (Math.floor(Math.random() * (25 - 10 + 1)) + 10);

		const iCurentLevel = Math.floor(0.1 * Math.sqrt(CookieMonsta.UserDatabaseData.points));

		// --| Level up user if it is the case
		if(await CookieMonsta.UserDatabaseData.level < iCurentLevel)
		{
			await CookieMonsta.UserDatabaseData.level++;

			let GetUserAvatar = (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL;

			let i1 = Jimp.read(GetUserAvatar);
			let i2 = Jimp.read("./BOTImages/LevelUp/levelup.png");

			Promise.all([i1, i2]).then(async images =>
			{
				await images[0].resize(49, 49).quality(100);
				await images[1].composite(images[0], 20, 17).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
				{
					if(err)
					{
						return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err);
					}

					await gm(buffer)
					.font("./BOTFonts/AgencyFB-Bold.ttf", 16)
					.fill("#00FFFF")
					.gravity('Center')
					.draw(["text 0, 42 '" + iCurentLevel + "'"])
					.toBuffer("levelup.png", async function (err, buffer2)
					{
						if(err)
						{
							return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err);
						}

						await message.channel.send("<:cookiemonsta:414433388104253450> **|** ***" + user.username + "*** **leveled** :up:", new Discord.Attachment(buffer2, "levelup.png"));
					});
				});
			});
		}

		// --| Update the database
		await bot.setScore.run(CookieMonsta.UserDatabaseData);

		// --| A chance to receive a gift while being active in chat. One in 300 chance
		if(1 === Math.floor(( Math.random() * 300 ) + 1))
		{
			if(bUserHasGift[user.id] === 0)
			{
				const embed = new Discord.RichEmbed()
				.setAuthor("Cookie Monsta | You have received a gift!", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
				.setColor("#00BFFF")
				.setDescription(user + " you have received a gift! :gift:\n\n\nYou only have **2** minutes to open it by typing **!opengift**")
				.setThumbnail("https://i.imgur.com/hNALLLd.png")
				.setFooter("Gifted by: @" + bot.user.username, (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)

				await message.channel.send({embed}).then(msg =>
				{
					iCheckIfOpenGift[user.id] = setInterval (async function ()
					{
						if(bAlreadyOpeningGift[user.id] === true)
						{
							bot.clearInterval(iUserGiftTimer[user.id]);
							bot.clearInterval(iCheckIfOpenGift[user.id]);

							bUserHasGift[user.id] = 0;

							if(!msg.deleted) { await msg.delete().catch(() => {}); }
						}

					}, 1000);

					iUserGiftTimer[user.id] = setInterval (async function ()
					{
						bot.clearInterval(iUserGiftTimer[user.id]);

						bUserHasGift[user.id] = 0;

						if(!msg.deleted) { await msg.delete().catch(() => {}); }

					}, 120000);
				});

				bUserHasGift[user.id] = 1;
			}
		}
	}

    const szArgs = message.content.slice(szPrefix).trim().split(/ +/g);
    const szCommand = szArgs.shift();

	let KittyRegex = new RegExp(/!kit+y$/); // !kitty

	if(szCommand.match(KittyRegex))
	{
		let iPos = 62;
	    let iBodyWidth = 15;

		let szCatCommand;
	    szCatCommand = message.content.split(/\s/)[0];

		let a = szCatCommand.split("t").length - 3;

		if(a > 20)
		{
			a = 20;
		}

		let iCatLength = iPos + a * iBodyWidth;
		let szCatImage = gm().in("-page", "+0+0").in("./BOTImages/CatXD/catbutt.png");

		for(iPos; iPos < iCatLength; iPos += iBodyWidth)
		{
			szCatImage.in("-page", "+" + iPos + "+0").in("./BOTImages/CatXD/catbody.png");
		}

		let szCatFileName = szCatCommand.substring(1) + ".png";

		szCatImage
		.in("-page", "+" + iPos + "+0")
		.in("./BOTImages/CatXD/cathead.png")
		.background("transparent")
		.mosaic()
		.toBuffer("kitty.png", async function (err, buffer)
		{
	  		if(err)
			{
				return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err);
			}

			await message.channel.send(user + " here is your :cat:", new Discord.Attachment(buffer, szCatFileName));
		});
	}

	// --| No prefix no command
    if(szCommand.indexOf(szPrefix) !== 0)
    {
		return;
    }

	// --| Commands must be written in lower case
	if(!szCommand.toLowerCase())
	{
		return;
	}

	if(iCmdCooldown.has(user.id))
	{
		const szWaitMessages =
		[
			"Oy! Stop spamming! Wait **" + iCooldownTime + "** seconds :angry:",
			"Whoah there, you're being too spicy for me. Could you just chill? :angry:",
			"I'm eating a :cookie: at the moment, can't help you lel.",
			"Didn't read LOL! Stop spamming! :angry:"
		];

		return await message.delete().then(() => message.reply( " " + szWaitMessages[Math.floor(Math.random() * szWaitMessages.length)]).then(msg => { msg.delete(1800) }));
	}

    let szCmd = bot.commands.get(szCommand.slice(szPrefix.length));

	if(szCmd)
	{
    	szCmd.run(bot, message, szArgs);
	}

	if(!message.member.hasPermission("ADMINISTRATOR"))
	{
		iCmdCooldown.add(user.id);
	}

	iUserCooldown[user.id] = setInterval (function ()
	{
		iCmdCooldown.delete(user.id);
		bot.clearInterval(iUserCooldown[user.id]);

	}, iCooldownTime * 1000);
};
