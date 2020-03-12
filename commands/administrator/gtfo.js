module.exports.run = (bot, message, args) =>
{
    if(!message.member.hasPermission("ADMINISTRATOR") || !message.member.hasPermission("MOVE_MEMBERS"))
    {
        return message.channel.send(":no_entry: You can't mate! You need `ADMINISTRATOR` or `MOVE_MEMBERS` permission to do this! :laughing: :no_entry:");
    }

    const GetBotVoiceChannel = message.guild.me.voice.channel;
    const GetUserVoiceChannel = message.member.voice.channel;
    const GuildGetID = message.guild.id;

    if(!GetBotVoiceChannel)
    {
        return message.reply(" :no_entry: I ain't playing any sound <:Bruh:635506622478942219>  :no_entry:");
    }

    else if(!GetUserVoiceChannel)
    {
        return message.reply(" :no_entry: Nah, you can't stop me if you're not in the voice channel! :joy:  :no_entry:");
    }

    else if(GetUserVoiceChannel && GetUserVoiceChannel !== GetBotVoiceChannel)
    {
        return message.reply(" :no_entry: Nah, you can't stop me if you're not in the **SAME** voice channel! :joy:  :no_entry:");
    }

    else if(GetBotVoiceChannel === GetBotVoiceChannel)
    {
        if(bBoolAlreadyPlayingSound.has(GuildGetID))
        {
            bBoolAlreadyPlayingSound.delete(GuildGetID);
        }

        if(bAlreadyPlayingTTS.has(GuildGetID))
        {
            bAlreadyPlayingTTS.delete(GuildGetID);
        }

        GetBotVoiceChannel.leave();
        message.reply(" Aight, chill lebr0wsky <:Bruh:635506622478942219>, I'm out :mute:");
    }
};

module.exports.help =
{
    name: "gtfo"
};