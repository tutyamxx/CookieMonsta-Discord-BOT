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

    if(iUserCookies < 25000)
    {
        return await message.reply(":no_entry: you don't have enough cookies :cookie: to do that! :no_entry:");
    }

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!setbanner** ``<one banner name from 1 to 91>``. Go here https://tutyamxx.github.io/cookie-monsta-website/features.html to see all the available banners! :no_entry:");
    }

    const iUserBannerName = parseInt(szArgs[0].trim());
    const BannersFromDatabase = await DatabaseImport.CookieMonsta_GetAllBanners();

    if(!CustomFunctions.isInt(iUserBannerName))
    {
        return await message.reply(" :no_entry: I couldn't find that banner name :frame_photo: ! Go here https://tutyamxx.github.io/cookie-monsta-website/features.html to see all the available banners!  :no_entry:");
    }
    
    if(iUserBannerName < 1 || iUserBannerName > BannersFromDatabase)
    {
        return await message.reply(" :no_entry: I couldn't find that banner name :frame_photo: ! Banner names range is between **1** and **" + BannersFromDatabase.length + "**. Go here https://tutyamxx.github.io/cookie-monsta-website/features.html to see all the available banners!  :no_entry:");
    }

    const UserCurrentBanner = await DatabaseImport.CookieMonsta_GetUserProfileBanner(GetGuildID, user.id);

    if(iUserBannerName === parseInt(UserCurrentBanner))
    {
        return await message.reply(" :no_entry: You aleady have this banner :frame_photo: selected, you pleb :dizzy_face:  :no_entry:");
    }

    for(let i = 0; i < BannersFromDatabase.length; i++)
    {
        if(parseInt(BannersFromDatabase[i].png_file.slice(0, -4)) === parseInt(iUserBannerName))
        {
            await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, user.id, iUserCookies - 25000);
            await DatabaseImport.CookieMonsta_SetUserProfileBanner(GetGuildID, user.id, iUserBannerName.toString().padStart(2, "0") + ".png");
            await message.channel.send("<:cookiemonsta:634866060465537034> **|** Okay, I have updated the profile banner :frame_photo: for " + user + " with: **" + iUserBannerName.toString().padStart(2, "0") + "**. Also stole **25000** :cookie: cookies from him L3L :wink:");

            break;
        }
    }
};

module.exports.help =
{
    name: "setbanner"
};