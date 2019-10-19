const Discord = require("discord.js");
const gm = require("gm").subClass({ imageMagick: true });
const Jimp = require("jimp");
const DefChannel = require("../functions/defaultchannel.js");
const CustomFunctions = require("../functions/funcs.js");

const szRandomHalloweenBanners = 
[
    "/BOTImages/Banner/halloween_01.png",
    "/BOTImages/Banner/halloween_02.png",
    "/BOTImages/Banner/halloween_03.png",
    "/BOTImages/Banner/halloween_04.png",
    "/BOTImages/Banner/halloween_05.png",
    "/BOTImages/Banner/halloween_06.png",
    "/BOTImages/Banner/halloween_07.png",
];

const szRandomChristmasBanners = 
[
    "/BOTImages/Banner/christmas_01.png",
    "/BOTImages/Banner/christmas_02.png",
];

const szRandomGreetBanners =
[
    "/BOTImages/Banner/01.png",
    "/BOTImages/Banner/02.png",
    "/BOTImages/Banner/03.png",
    "/BOTImages/Banner/04.png",
    "/BOTImages/Banner/05.png",
    "/BOTImages/Banner/06.png",
    "/BOTImages/Banner/07.png",
    "/BOTImages/Banner/08.png",
    "/BOTImages/Banner/09.png",
    "/BOTImages/Banner/10.png"
];

module.exports = async (bot, member, guild) =>
{
    if(member)
    {
        let GetUserAvatar = (member.user.avatarURL === null) ? member.user.defaultAvatarURL : member.user.avatarURL;
        let GetUserName = member.user.username.replace(/'/g, "`").trim();

        let szRandomBanner = "";
        let szFontColor = "#ffffff";

        if(CustomFunctions.CheckHalloween())
        {
            szFontColor = "#ff580a";
            szRandomBanner = szRandomHalloweenBanners[Math.floor(Math.random() * szRandomHalloweenBanners.length)];
        }

        else if(CustomFunctions.CheckChristmas())
        {
            szFontColor = "#009150";
            szRandomBanner = szRandomChristmasBanners[Math.floor(Math.random() * szRandomChristmasBanners.length)];
        }

        else
        {
            szFontColor = "#ffffff";
            szRandomBanner = szRandomGreetBanners[Math.floor(Math.random() * szRandomGreetBanners.length)];
        }

        await Jimp.read(__basedir + szRandomBanner).then(async (image) =>
        {
            await Jimp.read(GetUserAvatar).then(async (image2) =>
            {
                await image2.resize(184, Jimp.AUTO);
                await image.composite(image2, 59, 59).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
                {
                    if(err)
                    {
                        return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err);
                    }

                    await gm(buffer)
                    .font("./BOTFonts/Agency-FB.ttf", (GetUserName.length >= 32) ? 28 : 40 )
                    .fill(szFontColor)
                    .draw(["text 264, 115 '" + GetUserName + "'"])
                    .font("./BOTFonts/Agency-FB.ttf", 42)
                    .fill(szFontColor)
                    .draw(["text 264, 220 'Member: #"  + member.guild.memberCount + "'"])
                    .toBuffer("banner.png", async function (err, buffer2)
                    {
                        if(err)
                        {
                            return console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
                        }

                        let channel = DefChannel.getDefaultChannel(member.guild);

                        if(channel && channel.permissionsFor(member.guild.me).has('SEND_MESSAGES'))
                        {
                            await channel.send(new Discord.Attachment(buffer2, "welcome.png"));
                        }
                    });
                });
            });
        });
    }
};