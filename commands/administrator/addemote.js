const Discord = require("discord.js");
const IgnoreCase = require("ignore-case");
const validUrl = require("valid-url");
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

        if(!validUrl.isUri(szEmoteURL))
        {
            return message.reply(" :no_entry: Please try to specify a valid emote ``URL``!  :no_entry:");
        }

        const szEmoteName = szArgs.slice(1).join("");

        if(CustomFunctions.isEmpty(szEmoteName) || !szEmoteName)
        {
            return message.reply(" :no_entry: You need to specify an emote ``NAME`` !  :no_entry:");
        }

        const GetGuild = message.guild;
        const FindExistingEmoji = bot.emojis.cache.find(emoji => IgnoreCase.equals(emoji.name, szEmoteName));

        if(FindExistingEmoji !== undefined)
        {
            return message.reply(` :no_entry: There is already an existing emote with similar or the same name which is: **${FindExistingEmoji.name}** ! Try a different emote perhaps? :thinking:  :no_entry:`);
        }

        if(GetGuild.available)
        {
            await GetGuild.emojis.create(szEmoteURL.toString(), szEmoteName.replace(/[^0-9a-z]/gi, "").toString()).then((emote) =>
            {
                return message.channel.send(`<:cookiemonsta:634866060465537034> **|** Okay, I have successfully added the emote ${emote} (**:${emote.name}:**) to the **${GetGuild.name}**'s emotes list!`);

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