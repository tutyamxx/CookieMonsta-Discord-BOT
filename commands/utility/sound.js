const IgnoreCase = require("ignore-case");
const fs = require("fs");
const GetDatabaseData = require("../../functions/getuserdata.js");
const CookieMonsta = require("../../CookieMonstaBOT.js");
const CustomFunctions = require("../../functions/funcs.js");
const SoundEffectsMp3 = require("../../json/soundboard.json");

let bBoolAlreadyPlayingSound = false;

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: ey, invalid parameter entered. Type **!sound** ``list`` to list all available sounds to play :mute:  :no_entry:" );
    }

    let SoundList = [];

    if(szArgs[0] === "list")
    {
        for(let x = 0; x < SoundEffectsMp3.length; x++)
        {
            SoundList.push(SoundEffectsMp3[x][0]);
        }

        return await message.reply("available sounds :musical_note: are :arrow_down:  **" + SoundList.join("**, **") + "**");
    }

    if(CookieMonsta.UserDatabaseData.cookies < 300)
    {
        return await message.reply(" :no_entry: you don't have enough cookies :cookie: to play this sound! :no_entry:");
    }

    let UserVoiceChannel = message.member.voiceChannel;

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

    let j, x;
    let CatchSoundFromArray = "";

    for(j = 0; j < SoundEffectsMp3.length; j++)
    {
        if(IgnoreCase.equals(szArgs[0], SoundEffectsMp3[j][0]))
        {
            CatchSoundFromArray = SoundEffectsMp3[j][1];

            if(UserVoiceChannel)
            {
                UserVoiceChannel.join().then(async (connection) =>
                {
                    bBoolAlreadyPlayingSound = true;
                    await GetDatabaseData.CookiesRemove(message.guild.id, user.id, 300);

                    // --| Read sound from the soundboard.json file
                    const SoundFileToPlay = fs.createReadStream(CatchSoundFromArray);

                    // --| All my .OPUS files are converted to: Audio Bitrate: 64k | Sample Rate: 48000 (Discord's Default Settings)
                    const iDispatcher = await connection.playStream(SoundFileToPlay, { volume: 2, passes: 1, bitrate: 48000 });
                   
                    await iDispatcher.on("end", async (end) =>
                    {
                        bBoolAlreadyPlayingSound = false;
                        await UserVoiceChannel.leave();
                    });

                    await iDispatcher.on("error", async (end) =>
                    {
                        bBoolAlreadyPlayingSound = false;
                        await UserVoiceChannel.leave();
                    });

                    await iDispatcher.on("finish", async () =>
                    {
                        bBoolAlreadyPlayingSound = false;

                        await iDispatcher.destroy();
                        await UserVoiceChannel.leave();
                    });

                }).catch(err => console.log("\x1b[31m*\x1b[0m Caught error on voice channel join: \x1b[31m" + err.message + "\x1b[0m"));

                await message.react("🔊");
            }
        }
    }
};

module.exports.help =
{
    name: "sound"
};