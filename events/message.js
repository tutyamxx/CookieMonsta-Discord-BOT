const Discord = require("discord.js");
const gm = require("gm").subClass({ imageMagick: true });
const Jimp = require("jimp");
const CookieMonsta = require("../CookieMonstaBOT.js");
const DatabaseImport = require("../database/database.js");

let iCmdCooldown = new Set();
let iCooldownTime = 5;

let iUserCooldown = {};
let iUserGiftTimer = {};
let iCheckIfOpenGift = {};

module.exports = async (bot, message) =>
{
    const user = message.author;

    if(user.bot)
    {
        return;
    }

    if(message.channel.type !== "text")
    {
        return message.channel.send(":no_entry: Sorry, I don't reply to **Direct Messages** :upside_down: :no_entry:");
    }

    if(/(?:https:?:\/)?discord(?:app.com\/invite|.gg)/gi.test(message.content))
    {
        return await message.delete();
    }

    const GuildGetID = message.guild.id;
    
    await DatabaseImport.CookieMonsta_CheckCreateUser(GuildGetID, user.id);
    const szPrefix = await DatabaseImport.CookieMonsta_GetGuildPrefix(GuildGetID);

    if(message.guild)
    {
        const iUserCurrentXP = await DatabaseImport.CookieMonsta_GetUserPoints(GuildGetID, user.id);
        let iLevel = await DatabaseImport.CookieMonsta_GetUserLevel(GuildGetID, user.id);

        // --| Add XP between 15 and 25 random
        let iCalculateNewXP = iUserCurrentXP + (Math.floor(Math.random() * (25 - 10 + 1)) + 10);

        const iCurentLevel = Math.floor(0.1 * Math.sqrt(iCalculateNewXP));

        if(GuildGetID !== "264445053596991498" && GuildGetID !== "446425626988249089" && GuildGetID !== "110373943822540800")
        {
            // --| Level up user if it is the case
            if(iLevel < iCurentLevel)
            {
                iLevel++;

                let GetUserAvatar = (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL;

                let i1 = Jimp.read(GetUserAvatar);
                let i2 = Jimp.read("./BOTImages/LevelUp/levelup.png");

                await Promise.all([i1, i2]).then(async (images) =>
                {
                    await images[0].resize(49, 49).quality(100);
                    await images[1].composite(images[0], 20, 17).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
                    {
                        if(err)
                        {
                            return console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
                        }

                        await gm(buffer)
                        .font("./BOTFonts/AgencyFB-Bold.ttf", 16)
                        .fill("#00FFFF")
                        .gravity("Center")
                        .draw(["text 0, 42 '" + iCurentLevel + "'"])
                        .toBuffer("levelup.png", async (err, buffer2) =>
                        {
                            if(err)
                            {
                                return console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
                            }

                            await message.channel.send("<:cookiemonsta:634866060465537034> **|** ***" + user.username + "*** **leveled** :up:", new Discord.Attachment(buffer2, "levelup.png"));
                        });
                    });
                });
            }

            // --| A chance to receive a gift while being active in chat. One in 300 chance
            if(1 === Math.floor((Math.random() * 300) + 1))
            {
                if(bUserHasGift[user.id] === 0)
                {
                    const DiscordRichEmbed = new Discord.RichEmbed()
                    .setAuthor("Cookie Monsta | You have received a gift!", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
                    .setColor("#00BFFF")
                    .setDescription(user + " you have received a gift! :gift:\n\n\nYou only have **2** minutes to open it by typing **" + szPrefix + "opengift**")
                    .setThumbnail("https://i.imgur.com/hNALLLd.png")
                    .setFooter("Gifted by: @" + bot.user.username, (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)

                    await message.channel.send({ embed: DiscordRichEmbed }).then(async (msg) =>
                    {
                        iCheckIfOpenGift[user.id] = setInterval(async function ()
                        {
                            if(bAlreadyOpeningGift[user.id] === true)
                            {
                                await bot.clearInterval(iUserGiftTimer[user.id]);
                                await bot.clearInterval(iCheckIfOpenGift[user.id]);

                                bUserHasGift[user.id] = 0;

                                if(!await msg.deleted) { await msg.delete().catch(() => { }); }
                            }

                        }, 1000);

                        iUserGiftTimer[user.id] = setInterval(async function ()
                        {
                            await bot.clearInterval(iUserGiftTimer[user.id]);

                            bUserHasGift[user.id] = 0;

                            if(!await msg.deleted) { await msg.delete().catch(() => { }); }

                        }, 120000);
                    });

                    bUserHasGift[user.id] = 1;
                }
            }
        }
        
        // --| Update the database
        await DatabaseImport.CookieMonsta_UpdatePoints_And_Level(GuildGetID, user.id, parseInt(iCalculateNewXP), parseInt(iLevel));
    }

    const szArgs = message.content.slice(szPrefix).trim().split(/ +/g);
    const szCommand = szArgs.shift();

    // --| Prefix + kitty
    const KittyRegex = new RegExp("\\" + await szPrefix.trim().toString() + "\\kit+y$");

    if(szCommand.match(KittyRegex))
    {
        let iPos = 62;
        let iBodyWidth = 15;

        let szCatCommand;
        szCatCommand = message.content.split(/\s/)[0];

        let a = szCatCommand.split("t").length - 3;

        if(a > 20)
        {
            a = 20;
        }

        let iCatLength = iPos + a * iBodyWidth;
        let szCatImage = gm().in("-page", "+0+0").in("./BOTImages/CatXD/catbutt.png");

        for(iPos; iPos < iCatLength; iPos += iBodyWidth)
        {
            szCatImage.in("-page", "+" + iPos + "+0").in("./BOTImages/CatXD/catbody.png");
        }

        let szCatFileName = szCatCommand.substring(1) + ".png";

        szCatImage.in("-page", "+" + iPos + "+0").in("./BOTImages/CatXD/cathead.png")
        .background("transparent")
        .mosaic()
        .toBuffer(szCatFileName, async (err, buffer) =>
        {
            if(err)
            {
                return console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
            }

            await message.channel.send(user + " here is your :cat:", new Discord.Attachment(buffer, szCatFileName));
            iCountCommandsUsed++;
        });
    }

    // --| No prefix no command
    if(szCommand.indexOf(szPrefix) !== 0)
    {
        return;
    }

    // --| Commands must be written in lower case
    if(!szCommand.toLowerCase())
    {
        return;
    }

    if(await iCmdCooldown.has(user.id, GuildGetID))
    {
        const szWaitMessages =
        [
            "Oy! Stop spamming! <:Bruh:635506622478942219> Wait **" + iCooldownTime + "** seconds :angry:",
            "Whoah there, you're being too spicy for me. Could you just chill? :angry:",
            "I'm eating a :cookie: at the moment, can't help you lel.",
            "Didn't read LOL! Stop spamming! <:Bruh:635506622478942219>"
        ];

        return await message.delete().then(() => message.reply( " " + szWaitMessages[Math.floor(Math.random() * szWaitMessages.length)]).then(async (msg) => { await msg.delete(3500) }));
    }

    let szCmd = await bot.commands.get(szCommand.slice(szPrefix.length));

    if(szCmd)
    {
        await szCmd.run(bot, message, szArgs);
        iCountCommandsUsed++;
    }

    if(!message.member.hasPermission("ADMINISTRATOR"))
    {
        await iCmdCooldown.add(user.id, GuildGetID);
    }

    iUserCooldown[user.id] = setInterval( async () =>
    {
        await iCmdCooldown.delete(user.id, GuildGetID);
        await bot.clearInterval(iUserCooldown[user.id]);

    }, iCooldownTime * 1000);
};