const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");
const DatabaseImport = require("../../database/database.js");

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;
    const GetGuildID = message.guild.id;

    if(!await DatabaseImport.CookieMonsta_UserExists(GetGuildID, user.id))
    {
        await DatabaseImport.CookieMonsta_CreateUser(GetGuildID, user.id, 150, 0, 1, "01.png");
    }

    const iUserCookies = await DatabaseImport.CookieMonsta_GetUserCookies(GetGuildID, user.id);

    if(iUserCookies < 1500)
    {
        return await message.reply(":no_entry: you don't have enough cookies :cookie: to do that! :no_entry:");
    }

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!setbanner** ``<one banner name from 1 to 91>`` :no_entry:");
    }

    const iUserBannerName = parseInt(szArgs[0].trim());

    if(iUserBannerName < 1 || iUserBannerName > 91)
    {
        return await message.reply(" :no_entry: I couldn't find that banner name :frame_photo:! Banner names range is between **1** and **" + BannersFromDatabase.length + "** :no_entry:");
    }

    const BannersFromDatabase = await DatabaseImport.CookieMonsta_GetAllBanners();

    for(let i = 0; i < BannersFromDatabase.length; i++)
    {
        if(parseInt(BannersFromDatabase[i].png_file.slice(0, -4)) === parseInt(iUserBannerName))
        {
            await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, user.id, iUserCookies - 1500);
            await DatabaseImport.CookieMonsta_SetUserProfileBanner(GetGuildID, user.id, iUserBannerName.toString().padStart(2, "0") + ".png");
            await message.channel.send("<:cookiemonsta:634866060465537034> **|** Okay, I have updated the profile banner :frame_photo: for " + user + " with: **" + iUserBannerName.toString().padStart(2, "0") + "**");

            break;
        }
    }
};

module.exports.help =
{
    name: "setbanner"
};