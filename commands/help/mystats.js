const Discord = require("discord.js");
const gm = require("gm").subClass({ imageMagick: true });
const Jimp = require("jimp");
const CookieMonsta = require("../../CookieMonstaBOT.js");
const DatabaseImport = require("../../database/database.js");

const szStatsFileName = "stats.png";

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;
    const GetGuildID = message.guild.id;

    const GetUserAvatar = (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL;
    const GetUserName = user.username.replace(/'/g, "`").trim();

    const szPrefix = await DatabaseImport.CookieMonsta_GetGuildPrefix(message.guild.id);

    const GetUserBannerImage = await DatabaseImport.CookieMonsta_GetUserProfileBanner(GetGuildID, user.id);
    const GetBannerInfo = await DatabaseImport.CookieMonsta_GetBannerFromDatabase(GetUserBannerImage);

    message.channel.startTyping();

    let i1 = Jimp.read(GetUserAvatar);
    let i2 = Jimp.read("./BOTImages/UserStats/" + GetBannerInfo.png_file.toString());

    Promise.all([i1, i2]).then((images) =>
    {
        images[0].resize(82, Jimp.AUTO);
        images[1].composite(images[0], 39, 14).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Error creating user \x1b[33m(My Stats)\x1b[0m image: \x1b[31m" + err + "\x1b[0m");
            }

            const szUserStats = "Level: " + await DatabaseImport.CookieMonsta_GetUserLevel(GetGuildID, user.id) + "  |  XP: " + await DatabaseImport.CookieMonsta_GetUserPoints(GetGuildID, user.id);
            const iCookiesAmount = "Cookies: " + await DatabaseImport.CookieMonsta_GetUserCookies(GetGuildID, user.id);
            const CookiesAmountFormatted = (iCookiesAmount.length > 21) ? iCookiesAmount.slice(0, iCookiesAmount.length - 3) + "..." : iCookiesAmount;

            gm(buffer)
            .fill("rgba(0, 0, 0, 0.5)")
            .drawRectangle(130, 10, 309, 40, 2, 2)
            .font("./BOTFonts/Agency-FB.ttf", (GetUserName.length >= 18) ? 14 : 29)
            .fill(GetBannerInfo.username_color.toString())
            .draw(["text 134, 36 '" + GetUserName + "'"])
            .fill("rgba(0, 0, 0, 0.5)")
            .drawRectangle(130, 43, 330, 64, 2, 2)
            .font("./BOTFonts/Agency-FB.ttf", (szUserStats.length >= 30) ? 12 : 20)
            .fill(GetBannerInfo.stats_color.toString())
            .draw(["text 134, 61 '" + szUserStats + "'"])
            .fill("rgba(0, 0, 0, 0.5)")
            .drawRectangle(179, 86, 330, 104, 2, 2)
            .font("./BOTFonts/Agency-FB.ttf", /*(iCookiesAmount.length >= 20) ? 14 : 20*/ 20)
            .fill(GetBannerInfo.stats_color.toString())
            .draw(["text 182, 104 '" + CookiesAmountFormatted + "'"])
            .toBuffer("stats.png", (err, buffer2) =>
            {
                if(err)
                {
                    console.log("\x1b[31m*\x1b[0m Error creating user \x1b[33m(My Stats)\x1b[0m image: \x1b[31m" + err + "\x1b[0m");
                }

                const ChanceToShowTips = Math.floor((Math.random() * 15) + 1);

                if(ChanceToShowTips === 5)
                {
                    message.channel.send("<:cookiemonsta:634866060465537034> **|** Remember, you can change your profile card banner at any time using ``" + szPrefix + "setbanner`` command :thumbsup:\n<:cookiemonsta:634866060465537034> **|** **Server stats :bar_chart: for:** ***" + GetUserName + "***", new Discord.Attachment(buffer2, szStatsFileName)).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
                }

                else
                {
                    message.channel.send("<:cookiemonsta:634866060465537034> **|** **Server stats :bar_chart: for:** ***" + GetUserName + "***", new Discord.Attachment(buffer2, szStatsFileName)).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
                }
            });
        });
    });
};

module.exports.help =
{
    name: "mystats"
};