const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");
const DatabaseImport = require("../../database/database.js");

const szRandomEmotes =
[
    ":wink:", ":joy:", ":smiling_imp:", ":smirk:", ":money_mouth:", ":relieved:"
];

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;
    const GetGuildID = message.guild.id;
    const RandomSmileyFace = szRandomEmotes[Math.floor(Math.random() * szRandomEmotes.length)];

    await DatabaseImport.CookieMonsta_CheckCreateUser(GetGuildID, user.id);

    const iUserCookies = await DatabaseImport.CookieMonsta_GetUserCookies(GetGuildID, user.id);
    const BannersFromDatabase = await DatabaseImport.CookieMonsta_GetAllBanners();

    if(iUserCookies < 25000)
    {
        return message.reply(":no_entry: you need **25000** cookies :cookie: to be able to change your profile card! :no_entry:");
    }

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(` :no_entry: this parameter can't be empty you scrub :facepalm: ! Try a banner from **1** to **${parseInt(BannersFromDatabase.length)}**. Go here https://tutyamxx.github.io/cookie-monsta-website/banners.html to see all the available banners! :no_entry:`);
    }

    const iUserBannerName = parseInt(szArgs[0].trim());

    if(!CustomFunctions.isInt(iUserBannerName))
    {
        return message.reply(" :no_entry: I couldn't find that banner name :frame_photo: ! Go here https://tutyamxx.github.io/cookie-monsta-website/banners.html to see all the available banners!  :no_entry:");
    }

    if(iUserBannerName < 1 || iUserBannerName > parseInt(BannersFromDatabase.length))
    {
        return message.reply(` :no_entry: I couldn't find that banner name :frame_photo: ! Banner names range is between **1** and **${parseInt(BannersFromDatabase.length)}**. Go here https://tutyamxx.github.io/cookie-monsta-website/banners.html to see all the available banners!  :no_entry:`);
    }

    const UserCurrentBanner = await DatabaseImport.CookieMonsta_GetUserProfileBanner(GetGuildID, user.id);

    if(iUserBannerName === parseInt(UserCurrentBanner))
    {
        return message.reply(" :no_entry: You aleady have this banner :frame_photo: selected, you pleb :dizzy_face:  :no_entry:");
    }

    for(let i = 0; i < BannersFromDatabase.length; i++)
    {
        if(iUserBannerName === 1)
        {
            await DatabaseImport.CookieMonsta_SetUserProfileBanner(GetGuildID, user.id, iUserBannerName.toString().padStart(2, "0") + ".png");
            message.channel.send(`<:cookiemonsta:634866060465537034> **|** Okay, I have reverted the profile banner :frame_photo: for ${user} with the default one. This one is **FREE**.`);

            break;
        }

        else if(parseInt(BannersFromDatabase[i].png_file.slice(0, -4)) === parseInt(iUserBannerName))
        {
            await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, user.id, iUserCookies - 25000);
            await DatabaseImport.CookieMonsta_SetUserProfileBanner(GetGuildID, user.id, iUserBannerName.toString().padStart(2, "0") + ".png");
            message.channel.send(`<:cookiemonsta:634866060465537034> **|** Okay, I have updated the profile banner :frame_photo: for ${user} with: **` + BannersFromDatabase[i].card_description.toString().trim() + "** (``" + iUserBannerName.toString().padStart(2, "0") + "``). Also stole **25000** :cookie: cookies from him " + RandomSmileyFace);

            break;
        }
    }
};

module.exports.help =
{
    name: "setbanner"
};