const CustomFunctions = require("../../functions/funcs.js");

let bAlreadyPlayingTTS = new Set();

module.exports.run = (bot, message, szArgs) =>
{
    const GuildGetID = message.guild.id;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Add some text so I can convert it to speech?  :no_entry:");
    }

    if(bAlreadyPlayingTTS.has(GuildGetID))
    {
        return message.reply(" :no_entry: man you're too spicy! I am already translating a **TTS** :loud_sound:  :no_entry:" );
    }

    let ArgumentText = szArgs.join(" ");

    if(ArgumentText.length >= 1024)
    {
        return message.reply(" :no_entry: please don't exceed **1024** characters in your text! :no_entry:");
    }

    if(message.mentions.members.first())
    {
        return message.reply(" :no_entry: please don't mention people in your text! :no_entry:");
    }

    const voiceChannel = message.member.voice.channel;

    if(!voiceChannel)
    {
        return message.reply(" :no_entry: hey man, I can't just play music through your speakers magically. Could you like.. connect to a voice channel? :mute:  :no_entry:");
    }

    if(!voiceChannel.joinable)
    {
        return message.reply(" :no_entry: I can't join the channel you're in :mute:  :no_entry:" );
    }

    let szTextToSpeech = "http://tts.cyzon.us/tts?text=" + ArgumentText;

    if(voiceChannel)
    {
        voiceChannel.join().then((connection) =>
        {
            bAlreadyPlayingTTS.add(GuildGetID);

            const iDispatcher = connection.play(encodeURI(szTextToSpeech));

            iDispatcher.on("end", (end) =>
            {
                bAlreadyPlayingTTS.delete(GuildGetID);

                voiceChannel.leave();
                iDispatcher.destroy();
            });

            iDispatcher.on("error", (end) =>
            {
                bAlreadyPlayingTTS.delete(GuildGetID);

                voiceChannel.leave();
                iDispatcher.destroy();
            });

            iDispatcher.on("finish", () =>
            {
                bAlreadyPlayingTTS.delete(GuildGetID);

                voiceChannel.leave();
                iDispatcher.destroy();
            });

        }).catch(err => console.log(err));

        message.react("🗣");
    }
};

module.exports.help =
{
    name: "tts"
};