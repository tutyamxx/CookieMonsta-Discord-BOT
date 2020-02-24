module.exports.run = async (bot, message, args) =>
{
    if(!message.member.hasPermission("ADMINISTRATOR"))
    {
        return await message.channel.send(":no_entry: You can't mate! Fucking biblical... :laughing: :no_entry:");
    }

    let GetBotVoiceChannel = message.guild.me.voiceChannel;
    let GetUserVoiceChannel = message.member.voiceChannel;

    if(!GetBotVoiceChannel)
    {
        return await message.reply(" :no_entry: I ain't playing any sound <:Bruh:635506622478942219>  :no_entry:");
    }

    else if(!GetUserVoiceChannel)
    {
        return await message.reply(" :no_entry: Nah, you can't stop me if you're not in the voice channel! :joy:  :no_entry:");
    }

    else if(GetUserVoiceChannel && GetUserVoiceChannel !== GetBotVoiceChannel)
    {
        return await message.reply(" :no_entry: Nah, you can't stop me if you're not in the **SAME** voice channel! :joy:  :no_entry:");
    }

    else if(GetBotVoiceChannel === GetBotVoiceChannel)
    {
        await GetBotVoiceChannel.leave();
        await message.reply(" Aight, chill lebr0wsky <:Bruh:635506622478942219>, I'm out :mute:");
    }
};

module.exports.help =
{
    name: "gtfo"
};