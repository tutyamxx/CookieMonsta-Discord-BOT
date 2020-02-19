const Discord = require("discord.js");
const DatabaseImport = require("../../database/database.js");
const CookieMonsta = require("../../CookieMonstaBOT.js");

let UserAlreadyPlayingRusR = {};
let iRouletteTime = {};

const szWinMessages =
[
    "Yeet, you get to survive, my guy.",
    "Yeet, you get to survive again, my guy.",
    "Fucking hell! This isn't fair. You should play again...",
    "Damn, bro, you beat the 16% chance that you'd get beaned (that is if the owners of the server set my role high enough)",
    "Btw John's a faggot, that's why this exists. And YES, YOU WON.",
    "You're a superstar! May today's success be the beginning of tomorrow's achievements.",
    "OMG you did it! Great game!",
    "You had your moment in the sun! Congrats!",
    "You got lucky nerd, I will get you next time...",
    "Ай-ай-ай-ай-ай, что сейчас произошло?! XD You Won",
    "Это ГГ! YOU WON!",
    "Это. Просто. Нечто. You won.",
    "Жил до конца, умер как герой. monkaS You won monkaS"
];

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;
    const GetGuildID = message.guild.id;

    if(UserAlreadyPlayingRusR[user.id] === true)
    {
        return await message.reply(":no_entry: You are already playing, please wait until you die **LUL**! :no_entry:");
    }

    await DatabaseImport.CookieMonsta_CheckCreateUser(GetGuildID, user.id);

    const iUserCookies = await DatabaseImport.CookieMonsta_GetUserCookies(GetGuildID, user.id);

    const BulletSLot = 2;
    UserAlreadyPlayingRusR[user.id] = true;

    const szGunMessage = await message.channel.send(":flag_ru:   :regional_indicator_r::regional_indicator_u::regional_indicator_s::regional_indicator_s::regional_indicator_i::regional_indicator_a::regional_indicator_n:  :regional_indicator_r::regional_indicator_o::regional_indicator_u::regional_indicator_l::regional_indicator_e::regional_indicator_t::regional_indicator_t::regional_indicator_e:   :flag_ru:\n\n:bust_in_silhouette: 						:gun: 	***Gun clicks***");

    let kickMember = message.guild.member(user);

    const CantKickMessages =
    [
        ":anger: Whoops! You totally lost, but I can't KICK you. Just pretend it was blanks, I guess.",
        ":anger: YOU LOST! I can't kick you, are you an admin or someshit?",
        ":anger: Hey, that's cheating! I can't kick you... Btw you lost."
    ];

    iRouletteTime[user.id] = setInterval (async () =>
    {
        if(BulletSLot === Math.floor(( Math.random() * 6 ) + 1))
        {
            if(!kickMember.kickable)
            {
                await szGunMessage.edit(CantKickMessages[Math.floor(Math.random() * CantKickMessages.length)] + "\n\nCookies lost: **10** :cookie:");
                await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, kickMember.id, iUserCookies - 10);
            }

            else
            {
                await szGunMessage.edit(":anger: BANG! He lost (**" + kickMember.user + "**) LEL. So it got ``KICKED``\n\nIt also lost **10** cookies :cookie:");

                await kickMember.kick("You lost LEL! You got kicked! Next time be careful playing with guns...");
                await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, kickMember.id, iUserCookies - 10);
            }
        }

        else
        {
            const RandomBonusCoin = Math.floor(( Math.random() * 2 ) + 1)

            switch(RandomBonusCoin)
            {
                case 1:
                    await szGunMessage.edit(szWinMessages[Math.floor(Math.random() * szWinMessages.length)] + "\n\nYou have been rewarded with **5** cookies :cookie: !");
                    await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, user.id, iUserCookies + 5);

                    break;

                case 2:
                    await szGunMessage.edit(szWinMessages[Math.floor(Math.random() * szWinMessages.length)] + "\n\nYou won **5** cookies :cookie: but, I will give you an extra one for free! :wink:");
                    await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, user.id, iUserCookies + 6);

                    break;
            }
        }

        UserAlreadyPlayingRusR[user.id] = false;
        await bot.clearInterval(iRouletteTime[user.id]);

    }, 3 * 1000);
};

module.exports.help =
{
    name: "rr"
};