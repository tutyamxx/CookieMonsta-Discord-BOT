const CustomFunctions = require("../../functions/funcs.js");
const DatabaseImport = require("../../database/database.js");

module.exports.run = async (bot, message, szArgs) =>
{
    const GetGuildID = message.guild.id;
    const ServerName = message.guild.name;

    if(!message.member.hasPermission("ADMINISTRATOR"))
    {
        return await message.channel.send(":no_entry: You can't mate! Fucking biblical... :laughing: :no_entry:");
    }

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! You need to specify a prefix for Christ sake!  :no_entry:");
    }

    const ArgumentPrefix = szArgs[0].trim().toString();
    const CheckEmojis = new RegExp("(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])", "gi");

    if(CheckEmojis.test(ArgumentPrefix))
    {
        return await message.reply(" :no_entry: nice try :smirk:, but you can't use emojis for prefix! Try again!  :no_entry:");
    }
   
    const GetServerPrefix = await DatabaseImport.CookieMonsta_GetGuildPrefix(GetGuildID);

    if(ArgumentPrefix === GetServerPrefix.trim())
    {
        return await message.reply(" :no_entry: Not happening! Your new prefix is the same as the current one ``" + GetServerPrefix.trim() + "`` for **" + ServerName + "**!  :no_entry:");
    }

    await DatabaseImport.CookieMonsta_SetGuildPrefix(GetGuildID, ArgumentPrefix);
    await message.channel.send("<:cookiemonsta:634866060465537034> **|** Okay, I have updated the prefix for **" + ServerName + "** with ``" + ArgumentPrefix + "``");
};

module.exports.help =
{
    name: "setprefix"
};