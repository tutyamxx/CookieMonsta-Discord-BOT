const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(message.channel.permissionsFor(message.member).has("ADMINISTRATOR", false)
    || message.channel.permissionsFor(message.member).has("MANAGE_EMOJIS", false)
    || message.author.id === "266677298051153920")
    {
        const szEmoteURL = szArgs[0];

        if(CustomFunctions.isEmpty(szEmoteURL) || !szEmoteURL)
        {
            return message.reply(" :no_entry: You need to specify an emote ``URL`` first!  :no_entry:");
        }

        const szEmoteName = szArgs[1];

        if(CustomFunctions.isEmpty(szEmoteName) || !szEmoteName)
        {
            return message.reply(" :no_entry: You need to specify an emote ``NAME`` !  :no_entry:");
        }

        const GetGuild = message.guild;

        if(GetGuild)
        {
            await GetGuild.createEmoji(szEmoteURL.toString(), szEmoteName.toString()).then((emote) =>
            {
                return message.channel.send(`<:cookiemonsta:634866060465537034> **|** Okay, I have successfully added emote ${emote} to the guild emotes list!`);

            }).catch((err) =>
            {
                return message.channel.send("<:cookiemonsta:634866060465537034> **|** Whoops, I have encountered an error while creating your emote **" + szEmoteName + "** with the error: `" + err.message + "` :head_bandage: !");
            });
        }
    }

    else
    {
        return message.channel.send(":no_entry: You can't mate! You need either ``ADMINISTRATOR`` or ``MANAGE_EMOJIS`` permission for this command. :laughing: :no_entry:");
    }
};

module.exports.help =
{
    name: "addemote"
};