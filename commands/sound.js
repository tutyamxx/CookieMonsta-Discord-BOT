
const IgnoreCase = require("ignore-case");

const GetDatabaseData = require("../functions/getuserdata.js");
const CookieMonsta = require("../CookieMonstaBOT.js");
const CustomFunctions = require("../functions/funcs.js");
const SoundEffectsMp3 = require("../json/soundboard.json");

var bBoolAlreadyPlayingSound = false;

module.exports.run = async (bot, message, szArgs) =>
{
	var user = message.author;

	if(CustomFunctions.isEmpty(szArgs[0]))
	{
		return await message.reply(" :no_entry: ey, invalid parameter entered. Type **!sound** ``list`` to list all available sounds to play :mute:  :no_entry:" );
	}

	var SoundList = "";

	if(szArgs[0] === "list")
	{
		for(x = 0; x < SoundEffectsMp3.length; x++)
		{
			SoundList += "***" + SoundEffectsMp3[x][0] + "***, ";
		}

		return await message.reply("available sounds :musical_note: are :arrow_down:  " + SoundList);
	}

	if(CookieMonsta.UserDatabaseData.cookies < 300)
	{
		return await message.reply(" :no_entry: you don't have enough cookies :cookie: to play this sound! :no_entry:");
	}

	var UserVoiceChannel = message.member.voiceChannel;

	if(!UserVoiceChannel)
	{
		return await message.reply(" :no_entry: hey man, I can't just play music through your speakers magically. Could you like.. connect to a voice channel? :mute:  :no_entry:");
	}

	if(!UserVoiceChannel.joinable)
	{
		return await message.reply(" :no_entry: I can't join the channel you're in :mute:  :no_entry:" );
	}

	if(bBoolAlreadyPlayingSound === true)
	{
		return await message.reply(" :no_entry: man you're too spicy! I am already playing a sound :loud_sound:  :no_entry:" );
	}

	var j, x;
	var CatchSoundFromArray = "";

	for(j = 0; j < SoundEffectsMp3.length; j++)
	{
		if(IgnoreCase.equals(szArgs[0], SoundEffectsMp3[j][0]))
		{
			CatchSoundFromArray = SoundEffectsMp3[j][1];

			if(UserVoiceChannel)
			{
				UserVoiceChannel.join().then(async function (connection)
				{
					bBoolAlreadyPlayingSound = true;
					await GetDatabaseData.CookiesRemove(message.guild.id, user.id, 300);

					var iDispatcher = await connection.playArbitraryInput(CatchSoundFromArray);

					iDispatcher.on("end", end =>
					{
						bBoolAlreadyPlayingSound = false;
						UserVoiceChannel.leave();
					});

					iDispatcher.on("error", end =>
					{
						bBoolAlreadyPlayingSound = false;
						UserVoiceChannel.leave();
					});
				})
				.catch(err => console.log(err));

				message.react("🔊");
			}
		}
	}
};

module.exports.help =
{
    name: "sound"
};
