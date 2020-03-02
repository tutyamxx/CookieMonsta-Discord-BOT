const CustomFunctions = require("../../functions/funcs.js");
const DatabaseImport = require("../../database/database.js");

module.exports.run = async (bot, message, szArgs) =>
{
    const GetGuildID = message.guild.id;
    const ServerName = message.guild.name;

    if(message.channel.permissionsFor(message.member).has("ADMINISTRATOR", false)
    || message.channel.permissionsFor(message.member).has("MANAGE_GUILD", false)
    || message.author.id === "266677298051153920")
    {
        if(CustomFunctions.isEmpty(szArgs[0]))
        {
            return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! You need to specify a prefix for Christ sake!  :no_entry:");
        }

        const ArgumentPrefix = szArgs[0].trim().toString();
        const CheckEmojis = new RegExp("(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])", "gi");

        if(CheckEmojis.test(ArgumentPrefix))
        {
            return message.reply(" :no_entry: nice try :smirk:, but you can't use emojis for prefix! Try again!  :no_entry:");
        }

        const CheckPrintableChars = new RegExp(/^[a-z0-9!"#$%&'()*+,./:;<=>?\[\]^_{|}~-]*$/, "i");

        if(!CheckPrintableChars.test(ArgumentPrefix))
        {
            return message.reply(" :no_entry: nice try :smirk:, but you can't use weird characters for prefix! Try again!  :no_entry:");
        }

        if(ArgumentPrefix.length > 3)
        {
            return message.reply(" :no_entry: You cannot have more than **3** characters into your prefix! Try again!  :no_entry:");
        }

        const GetServerPrefix = await DatabaseImport.CookieMonsta_GetGuildPrefix(GetGuildID);

        if(ArgumentPrefix === GetServerPrefix.trim())
        {
            return message.reply(" :no_entry: Not happening! Your new prefix is the same as the current one ``" + GetServerPrefix.trim() + "`` for **" + ServerName + "**!  :no_entry:");
        }

        await DatabaseImport.CookieMonsta_SetGuildPrefix(GetGuildID, ArgumentPrefix);

        const GuildsList = await DatabaseImport.CookieMonsta_GetAllFromPrefix();

        for(const QueryResult of GuildsList)
        {
            const DiscordGuild = bot.guilds.get(QueryResult.guild);

            if(!DiscordGuild) continue;

            DiscordGuild.config = QueryResult;
        }

        message.channel.send("<:cookiemonsta:634866060465537034> **|** Okay, I have updated the prefix for **" + ServerName + "** with ``" + ArgumentPrefix + "``");
    }

    else
    {
        return message.channel.send(":no_entry: You can't mate! You need either ``ADMINISTRATOR`` or ``MANAGE_GUILD`` permission for this command. :laughing: :no_entry:");
    }
};

module.exports.help =
{
    name: "setprefix"
};