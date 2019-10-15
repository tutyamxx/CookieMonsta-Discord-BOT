
const Discord = require("discord.js");
const gm = require("gm").subClass({ imageMagick: true });
const Jimp = require("jimp");
const CookieMonsta = require("../CookieMonstaBOT.js");

// --| level | png file | username color | stats color & cookies color
const StatsCollection =
[
    ["5", "01.png", "#ADD8E6", "#DCDCDC"],
    ["10", "02.png", "#ADD8E6", "#F5F5DC"],
    ["15", "03.png", "#32CD32", "#FFFAFA"],
    ["25", "04.png", "#32CD32", "#FFFAFA"],
    ["35", "05.png", "#8B4513", "#000000"],
    ["45", "06.png", "#1E90FF", "#FFFAFA"],
    ["55", "07.png", "#800000", "#CD5C5C"],
    ["70", "08.png", "#FFA500", "#FF7F50"],
    ["80", "09.png", "#ADD8E6", "#FFFFFF"],
    ["100", "10.png", "#FFFF00", "#FFFFFF"],
    ["9999999999", "11.png", "#FFFF00", "#000000"]
];

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    let GetUserAvatar = (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL;
    let GetUserName = user.username.replace(/'/g, "`").trim();

    message.channel.startTyping();

    for(i = 0; i < StatsCollection.length; i++)
    {
        if(await CookieMonsta.UserDatabaseData.level <= parseInt(StatsCollection[i][0]))
        {
            //console.log("Level req: " + parseInt(StatsCollection[i][0]) + " | File name: " + StatsCollection[i][1].toString() + " | User colorhex: " + StatsCollection[i][2].toString() + " | Stats colorhex: " + StatsCollection[i][3]);
            await Jimp.read("./BOTImages/UserStats/" + StatsCollection[i][1].toString()).then(async (image) =>
            {
                await Jimp.read(GetUserAvatar).then(async (image2) =>
                {
                    await image2.resize(82, 82);
                    await image.composite(image2, 39, 14).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
                    {
                        if(err)
                        {
                            return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
                        }

                        let szUserStats = "Level: " + await CookieMonsta.UserDatabaseData.level + "  |  XP: " + await CookieMonsta.UserDatabaseData.points;
                        let iCookiesAmount = "Cookies: " + await CookieMonsta.UserDatabaseData.cookies;

                        await gm(buffer)
                        .font("./BOTFonts/Agency-FB.ttf", (GetUserName.length >= 18) ? 14 : 29 )
                        .fill(StatsCollection[i][2].toString())
                        .draw(["text 134, 36 '" + GetUserName + "'"])
                        .font("./BOTFonts/Agency-FB.ttf", (szUserStats.length >= 30) ? 16 : 20)
                        .fill(StatsCollection[i][3].toString())
                        .draw(["text 134, 64 '"  + szUserStats + "'"])
                        .font("./BOTFonts/Agency-FB.ttf", (iCookiesAmount.length >= 21) ? 17 : 20)
                        .fill(StatsCollection[i][3].toString())
                        .draw(["text 182, 104 '"  + iCookiesAmount + "'"])
                        .toBuffer("stats.png", async function (err, buffer2)
                        {
                            if(err)
                            {
                                return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
                            }

                            await message.channel.send("<:cookiemonsta:414433388104253450> **|** **Server stats :bar_chart: for:** ***" + GetUserName + "***", new Discord.Attachment(buffer2, "stats.png")).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
                        });
                    });
                });
            });

            return;
        }
    }
};

module.exports.help =
{
    name: "mystats"
};
