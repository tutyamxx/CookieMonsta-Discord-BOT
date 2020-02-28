const Discord = require("discord.js");
const DatabaseImport = require("../../database/database.js");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;
    const GetGuildID = message.guild.id;

    await DatabaseImport.CookieMonsta_CheckCreateUser(GetGuildID, user.id);

    const iUserCookies = await DatabaseImport.CookieMonsta_GetUserCookies(GetGuildID, user.id);
    const HotPercentage = Math.floor(( Math.random() * 100 ) + 1);

    let EmoticonHotOrNot;
    let ColorHotOrNot;

    if(HotPercentage < 55)
    {
        EmoticonHotOrNot = ":name_badge:";
        ColorHotOrNot = 16711680;
    }

    else if(HotPercentage >= 100)
    {
        EmoticonHotOrNot = ":sparkles:";
        ColorHotOrNot = 16724889;

        message.channel.send(":heart_eyes: ***" + user.username + "*** is  **100%** HOT! For that, he won **15** cookies :cookie: ! :heart_eyes:");
        await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, user.id, iUserCookies + 15);
    }

    else
    {
        EmoticonHotOrNot = ":fire:";
        ColorHotOrNot = 14833698;
    }

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | HOT or NOT!", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(ColorHotOrNot)
    .setDescription(user + `, you're **${HotPercentage}%** HOT ` + EmoticonHotOrNot)
    .setThumbnail("https://i.imgur.com/yLMzwps.png")
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

    message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "hotornot"
};