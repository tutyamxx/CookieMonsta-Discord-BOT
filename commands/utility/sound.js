const IgnoreCase = require("ignore-case");
const fs = require("fs");
const DatabaseImport = require("../../database/database.js");
const CookieMonsta = require("../../CookieMonstaBOT.js");
const CustomFunctions = require("../../functions/funcs.js");
const SoundEffectsMp3 = require("../../json/soundboard.json");

let bBoolAlreadyPlayingSound = new Set();

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;
    const GuildGetID = message.guild.id;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: ey, invalid parameter entered. Type ``list`` as the parameter to list all available sounds to play :mute:  :no_entry:" );
    }

    let SoundList = [];

    if(szArgs[0] === "list")
    {
        for(let x = 0; x < SoundEffectsMp3.length; x++)
        {
            SoundList.push(SoundEffectsMp3[x][0]);
        }

        return message.reply(" available sounds (**" + parseInt(SoundEffectsMp3.length) + "**) :musical_note: are :arrow_down:\n\n**" + SoundList.join("**, **") + "**");
    }

    await DatabaseImport.CookieMonsta_CheckCreateUser(GuildGetID, user.id);

    const iUserCookies = await DatabaseImport.CookieMonsta_GetUserCookies(GuildGetID, user.id);

    if(iUserCookies < 300)
    {
        return message.reply(" :no_entry: you need **300** cookies :cookie: to play this sound! :no_entry:");
    }

    let UserVoiceChannel = message.member.voiceChannel;

    if(!UserVoiceChannel)
    {
        return message.reply(" :no_entry: hey man, I can't just play music through your speakers magically. Could you like.. connect to a voice channel? :mute:  :no_entry:");
    }

    if(!UserVoiceChannel.joinable)
    {
        return message.reply(" :no_entry: I can't join the channel you're in :mute:  :no_entry:" );
    }

    if(bBoolAlreadyPlayingSound.has(GuildGetID))
    {
        return message.reply(" :no_entry: man you're too spicy! I am already playing a sound :loud_sound:  :no_entry:" );
    }

    let j;
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
                    bBoolAlreadyPlayingSound.add(GuildGetID);
                    await DatabaseImport.CookieMonsta_SetUserCookies(GuildGetID, user.id, iUserCookies - 300);

                    // --| Read sound from the soundboard.json file
                    const SoundFileToPlay = fs.createReadStream(CatchSoundFromArray);

                    // --| All my .OPUS files are converted to: Audio Bitrate: 64k | Sample Rate: 48000 (Discord's Default Settings)
                    const iDispatcher = connection.playStream(SoundFileToPlay, { volume: 2, passes: 1, bitrate: 48000 });

                    iDispatcher.on("end", (end) =>
                    {
                        bBoolAlreadyPlayingSound.delete(GuildGetID);

                        UserVoiceChannel.leave();
                        iDispatcher.destroy();
                    });

                    iDispatcher.on("error", (end) =>
                    {
                        bBoolAlreadyPlayingSound.delete(GuildGetID);

                        UserVoiceChannel.leave();
                        iDispatcher.destroy();
                    });

                    iDispatcher.on("finish", () =>
                    {
                        bBoolAlreadyPlayingSound.delete(GuildGetID);

                        iDispatcher.destroy();
                        UserVoiceChannel.leave();
                    });

                }).catch(err => console.log("\x1b[31m*\x1b[0m Caught error on voice channel join: \x1b[31m" + err.message + "\x1b[0m"));

                message.react("🔊");
            }
        }
    }
};

module.exports.help =
{
    name: "sound"
};