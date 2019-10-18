const Discord = require("discord.js");
const CookieMonsta = require("../CookieMonstaBOT.js");
const GetDatabaseData = require("../functions/getuserdata.js");

let UserAlreadyBattling = {};
let UserHealthColor = {};
let iFightLogInterval = {};
let Player1Health = {};
let Player2Health = {};

let CritPercent = 5;

module.exports.run = async (bot, message, args) =>
{
    const GuildGetID = message.guild.id;
    const user = message.author;

    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(GuildMember.user === user)
    {
        return await message.reply(`why would you fight with yourself? There are plenty of people here available to fight... :face_palm:`);
    }

    if(UserAlreadyBattling[GuildMember.user.id] === true)
    {
        return await message.reply(":no_entry: user " + GuildMember.user + " is already using **Death Battle** with someone else! :no_entry:");
    }

    if(UserAlreadyBattling[user.id] === true)
    {
        return await message.reply(":no_entry: you are already playing **Death Battle**! :no_entry:");
    }

    let HitDetection = Math.floor((Math.random() * 2) + 1);

    let Damage;
    let RandomCrit;

    Player1Health[user.id] = 100;
    Player2Health[GuildMember.user.id] = 100;

    UserHealthColor[user.id] = " :green_heart: ";
    UserHealthColor[GuildMember.user.id] = " :green_heart: ";

    UserAlreadyBattling[user.id] = true;
    UserAlreadyBattling[GuildMember.user.id] = true;

    const DiscordRichEmbed1 = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Death Battle", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor("#FF4000")
    .setDescription(user + UserHealthColor[user.id] + "(" + Player1Health[user.id] + ")		:vs:		" + GuildMember.user + UserHealthColor[GuildMember.user.id] + "(" + Player2Health[GuildMember.user.id] + ")\n\n\n***The battle will begin in a moment...***")
    .setThumbnail("https://i.imgur.com/RACcRMv.jpg")

    await message.channel.send({ embed: DiscordRichEmbed1 }).then(msg =>
    {
        let szBattleLog = {};
        let szThumbnail = {};

        szThumbnail[user.id] = "https://i.imgur.com/RACcRMv.jpg";

        iFightLogInterval[user.id] = setInterval( async function()
        {
            if(Player1Health[user.id] > 0 && Player2Health[GuildMember.user.id] > 0)
            {
                if(HitDetection === 1)
                {
                    Damage = Math.floor((Math.random() * 20) + 10);
                    RandomCrit = Math.random() * 100;

                    Player2Health[GuildMember.user.id] -= Damage;

                    if(Player2Health[GuildMember.user.id] <= 0)
                    {
                        UserHealthColor[GuildMember.user.id] = " :x: ";
                        Player2Health[GuildMember.user.id] = 0;
                    }

                    if(RandomCrit < CritPercent)
                    {
                        Damage = Damage * 3;
                        szBattleLog[user.id] = user + UserHealthColor[user.id] + "(" + Player1Health[user.id] + ")		:vs:		" + GuildMember.user + UserHealthColor[GuildMember.user.id] + "(" + Player2Health[GuildMember.user.id] + ")\n\n" + "\r:anger:  **" + user.username + "** hits **" + GuildMember.user.username + "** with **CRITIAL STRIKE** for **" + Damage + "** damage";
                    }

                    else
                    {
                        var RandomWeaponsPlayer1 =
                        [
                            "\r:crossed_swords:  **" + user.username + "** karate chops **" + GuildMember.user.username + "** for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** slices **" + GuildMember.user.username + "** with a sword for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** runs on **" + GuildMember.user.username + "** with a car and does **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** bashes **" + GuildMember.user.username + "** in the chest for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** shocks **" + GuildMember.user.username + "** with lightning for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** uses the Force on **" + GuildMember.user.username + "** and does **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** stabs **" + GuildMember.user.username + "** with a knife for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** kicked **" + GuildMember.user.username + "** for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** burns **" + GuildMember.user.username + "** with fire for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** explodes a bomb on **" + GuildMember.user.username + "** for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** wallops **" + GuildMember.user.username + "** with a golf club for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** shoots **" + GuildMember.user.username + "** with a gun for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** throws a spear at **" + GuildMember.user.username + "** for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** hits **" + GuildMember.user.username + "** with a whip for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** flips **" + GuildMember.user.username + "** on the ground for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** hits **" + GuildMember.user.username + "** with Hadouken! for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** chops **" + GuildMember.user.username + "** with an axe for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** hits **" + GuildMember.user.username + "** with a chair for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** uses Kamehameha on **" + GuildMember.user.username + "** and does **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** slaps **" + GuildMember.user.username + "** for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + user.username + "** smacks **" + GuildMember.user.username + "** in the face for **" + Damage + "** damage"
                        ];

                        szBattleLog[user.id] = user + UserHealthColor[user.id] + "(" + Player1Health[user.id] + ")		:vs:		" + GuildMember.user + UserHealthColor[GuildMember.user.id] + "(" + Player2Health[GuildMember.user.id] + ")\n\n" + RandomWeaponsPlayer1[Math.floor(Math.random() * RandomWeaponsPlayer1.length)];
                    }

                    HitDetection = 2;
                }

                else if(HitDetection === 2)
                {
                    Damage = Math.floor((Math.random() * 20) + 10);
                    RandomCrit = Math.random() * 100;

                    Player1Health[user.id] -= Damage;

                    if(Player1Health[user.id] <= 0)
                    {
                        UserHealthColor[user.id] = " :x: ";
                        Player1Health[user.id] = 0;
                    }

                    if(RandomCrit < CritPercent)
                    {
                        Damage = Damage * 3;
                        szBattleLog[user.id] = user + UserHealthColor[user.id] + "(" + Player1Health[user.id] + ")		:vs:		" + GuildMember.user + UserHealthColor[GuildMember.user.id] + "(" + Player2Health[GuildMember.user.id] + ")\n\n" + "\r:anger:  **" + GuildMember.user.username + "** hits **" + user.username + "** with **CRITIAL STRIKE** for **" + Damage + "** damage";
                    }

                    else
                    {
                        var RandomWeaponsPlayer2 =
                        [
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** karate chops **" + user.username + "** for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** slices **" + user.username + "** with a sword for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** runs on **" + user.username + "** with a car and does **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** bashes **" + user.username + "** in the chest for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** shocks **" + user.username + "** with lightning for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** uses the Force on **" + user.username + "** and does **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** stabs **" + user.username + "** with a knife for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** kicked **" + user.username + "** for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** burns **" + user.username + "** with fire for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** explodes a bomb on **" + user.username + "** for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** wallops **" + user.username + "** with a golf club for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** shoots **" + user.username + "** with a gun for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** throws a spear at **" + user.username + "** for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** hits **" + user.username + "** with a whip for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** flips **" + user.username + "** on the ground for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** hits **" + user.username + "** with Hadouken! for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** chops **" + user.username + "** with an axe for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** hits **" + user.username + "** with a chair for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** uses Kamehameha on **" + user.username + "** and does **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** slaps **" + user.username + "** for **" + Damage + "** damage",
                            "\r:crossed_swords:  **" + GuildMember.user.username + "** smacks **" + user.username + "** in the face for **" + Damage + "** damage"
                        ];

                        szBattleLog[user.id] = user + UserHealthColor[user.id] + "(" + Player1Health[user.id] + ")		:vs:		" + GuildMember.user + UserHealthColor[GuildMember.user.id] + "(" + Player2Health[GuildMember.user.id] + ")\n\n" + RandomWeaponsPlayer2[Math.floor(Math.random() * RandomWeaponsPlayer2.length)];
                    }

                    HitDetection = 1;
                }
            }

            if(Player2Health[GuildMember.user.id] <= 0)
            {
                if(!user.bot)
                {
                    szBattleLog[user.id] += "\n\n:heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign:\n\n:trophy: ***" + user.username + "*** WON! :trophy:\n\nFor winning this battle, it has been awarded with **20** cookies :cookie: !\n**" + GuildMember.user.username + "** lost **10** cookies :cookie:";

                    await GetDatabaseData.CookiesUpdate(GuildGetID, user.id, 20);
                    await GetDatabaseData.CookiesRemove(GuildGetID, GuildMember.user.id, 10);
                }

                else
                {
                    szBattleLog[user.id] += "\n\n:heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign:\n\n:trophy: ***" + user.username + "*** WON! :trophy:\n\nFor winning this battle, it has been awarded with **20** cookies :cookie: !\n**" + GuildMember.user.username + "** lost **10** cookies :cookie:";

                    await GetDatabaseData.CookiesRemove(GuildGetID, GuildMember.user.id, 10);
                }

                szThumbnail[user.id] = (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL;

                UserAlreadyBattling[user.id] = false;
                UserAlreadyBattling[GuildMember.user.id] = false;

                bot.clearInterval(iFightLogInterval[user.id]);
            }

            else if(Player1Health[user.id] <= 0)
            {
                if(!GuildMember.user.bot)
                {
                    szBattleLog[user.id] += "\n\n:heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign:\n\n:trophy: ***" + GuildMember.user.username + "*** WON! :trophy:\n\nFor winning this battle, it has been awarded with **20** cookies :cookie: !\n**" + user.username + "** lost **10** cookies :cookie:";

                    await GetDatabaseData.CookiesUpdate(GuildGetID, GuildMember.user.id, 20);
                    await GetDatabaseData.CookiesRemove(GuildGetID, user.id, 10);
                }

                else
                {
                    szBattleLog[user.id] += "\n\n:heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign::heavy_minus_sign:\n\n:trophy: ***" + GuildMember.user.username + "*** WON! :trophy:\n\nFor winning this battle, it has been awarded with **20** cookies :cookie: !\n**" + user.username + "** lost **10** cookies :cookie:";

                    await GetDatabaseData.CookiesRemove(GuildGetID, user.id, 10);
                }

                szThumbnail[user.id] = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

                UserAlreadyBattling[user.id] = false;
                UserAlreadyBattling[GuildMember.user.id] = false;

                bot.clearInterval(iFightLogInterval[user.id]);
            }

            const DiscordRichEmbed = new Discord.RichEmbed()
            .setAuthor("Cookie Monsta | Death Battle", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
            .setColor("#FF4000")
            .setDescription(szBattleLog[user.id])
            .setThumbnail(szThumbnail[user.id])

            await msg.edit({ embed: DiscordRichEmbed });

        }, 2000);
    });
};

module.exports.help =
{
    name: "battle"
};