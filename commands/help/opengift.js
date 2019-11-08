const Discord = require("discord.js");
const DatabaseImport = require("../../database/database.js");

let iUnwrapTimer = {};

const iRandomCookiesPresent =
[
    "300", "400", "450", "500", "550",
    "600", "650", "750", "800", "850",
    "900", "950", "1000", "1250", "2000"
];

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;
    const GuildGetID = message.guild.id;

    if(bAlreadyOpeningGift[user.id] === true)
    {
        return await message.delete().catch(() => {});
    }

    if(bUserHasGift[user.id] === 0)
    {
        return await message.reply(" you don't have any gift :gift: to open! It probably expired or you haven't received one yet! :pensive:");
    }

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Unwrapping your gift...", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor("#00BFFF")
    .setDescription("Hang on tight while I'm unwrapping your gift...")
    .setThumbnail("https://i.imgur.com/hNALLLd.png")

    await message.channel.send({ embed: DiscordRichEmbed }).then(async msg =>
    {
        iUnwrapTimer[user.id] = setInterval (async function ()
        {
            await DatabaseImport.CookieMonsta_CheckCreateUser(GuildGetID, user.id);

            const GenerateRandomCookies = parseInt(iRandomCookiesPresent[Math.floor(Math.random() * iRandomCookiesPresent.length)]);
            let iUpdatedUserCookies = await DatabaseImport.CookieMonsta_GetUserCookies(GuildGetID, user.id) + GenerateRandomCookies;

            await DatabaseImport.CookieMonsta_SetUserCookies(GuildGetID, user.id, iUpdatedUserCookies);

            const DiscordRichEmbed1 = new Discord.RichEmbed()
            .setAuthor("Cookie Monsta | Congratulations!", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
            .setColor("#00BFFF")
            .setDescription("***OMNOMNOMNOM!***\n\n\n" + user + " this gift box :gift: contained **" + GenerateRandomCookies + "** cookies :cookie: !")
            .setThumbnail("https://i.imgur.com/hNALLLd.png")

            await msg.edit({ embed: DiscordRichEmbed1 });

            bUserHasGift[user.id] = 0;
            bAlreadyOpeningGift[user.id] = false;

            bot.clearInterval(iUnwrapTimer[user.id]);

        }, 5 * 1000);
    });

    bAlreadyOpeningGift[user.id] = true;
};

module.exports.help =
{
    name: "opengift"
};