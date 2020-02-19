const CustomFunctions = require("../../functions/funcs.js");

let bAlreadyPlayingTTS = new Set();

module.exports.run = async (bot, message, szArgs) =>
{
    const GuildGetID = message.guild.id;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Add some text so I can convert it to speech?  :no_entry:");
    }

    if(bAlreadyPlayingTTS.has(GuildGetID))
    {
        return await message.reply(" :no_entry: man you're too spicy! I am already translating a **TTS** :loud_sound:  :no_entry:" );
    }

    let ArgumentText = szArgs.join(" ");

    if(ArgumentText.length >= 1024)
    {
        return await message.reply(" :no_entry: please don't exceed **1024** characters in your text! :no_entry:");
    }

    if(message.mentions.members.first())
    {
        return await message.reply(" :no_entry: please don't mention people in your text! :no_entry:");
    }

    const voiceChannel = message.member.voiceChannel;

    if(!voiceChannel)
    {
        return await message.reply(" :no_entry: hey man, I can't just play music through your speakers magically. Could you like.. connect to a voice channel? :mute:  :no_entry:");
    }

    if(!voiceChannel.joinable)
    {
        return await message.reply(" :no_entry: I can't join the channel you're in :mute:  :no_entry:" );
    }

    let szTextToSpeech = "http://tts.cyzon.us/tts?text=" + ArgumentText;

    if(voiceChannel)
    {
        await voiceChannel.join().then(async (connection) =>
        {
            bAlreadyPlayingTTS.add(GuildGetID);

            const iDispatcher = await connection.playArbitraryInput(encodeURI(szTextToSpeech));

            await iDispatcher.on("end", async (end) =>
            {
                bAlreadyPlayingTTS.delete(GuildGetID);

                await voiceChannel.leave();
                await iDispatcher.destroy();
            });

            await iDispatcher.on("error", async (end) =>
            {
                bAlreadyPlayingTTS.delete(GuildGetID);
                
                await voiceChannel.leave();
                await iDispatcher.destroy();
            });

            await iDispatcher.on("finish", async () =>
            {
                bAlreadyPlayingTTS.delete(GuildGetID);

                await voiceChannel.leave();
                await iDispatcher.destroy();
            });
            
        }).catch(err => console.log(err));

        await message.react("🗣");
    }
};

module.exports.help =
{
    name: "tts"
};