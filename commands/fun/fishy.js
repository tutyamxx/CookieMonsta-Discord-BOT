const DatabaseImport = require("../../database/database.js");
const CookieMonsta = require("../../CookieMonstaBOT.js");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;
    const GetGuildID = message.guild.id;

    await DatabaseImport.CookieMonsta_CheckCreateUser(GetGuildID, user.id);

    const iUserCookies = await DatabaseImport.CookieMonsta_GetUserCookies(GetGuildID, user.id);

    if(iUserCookies < 20)
    {
        return message.reply(" :no_entry: you need **20** cookies :cookie: to go fishing! :no_entry:");
    }

    const RandomFishList =
    [
        ":fish:", ":tropical_fish:", ":blowfish:", ":whale2:",
        ":frog:", ":mans_shoe:", ":fallen_leaf:",
        ":spider:", ":herb:", ":spider_web:",
        ":battery:", ":snake:", ":bug:", ":dolphin:"
    ];

    let iRandomFish = RandomFishList[Math.floor(Math.random() * RandomFishList.length)];
    let iRandomFishPrize = Math.floor((Math.random() * 60) + 1);

    await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, user.id, iUserCookies - 20);

    if(iRandomFish === ":fish:"
    || iRandomFish === ":tropical_fish:"
    || iRandomFish === ":blowfish:"
    || iRandomFish === ":dolphin:")
    {
        await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, user.id, iUserCookies + iRandomFishPrize);

        return message.channel.send(":fishing_pole_and_fish: | **" + user.username + "**, you caught a: " + iRandomFish + " worth of **" + iRandomFishPrize + "** cookies :cookie: !\n:fishing_pole_and_fish: | You paid **20** cookies :cookie: for casting.");
    }

    if(iRandomFish === ":whale2:")
    {
        await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, user.id, iUserCookies + 200);

        return message.channel.send(":fishing_pole_and_fish: | **" + user.username + "**, you caught a: " + iRandomFish + " worth of **200** cookies :cookie: !\n:fishing_pole_and_fish: | You paid **20** cookies :cookie: for casting.");
    }

    else
    {
        return message.channel.send(":fishing_pole_and_fish: | **" + user.username + "**, you caught a: " + iRandomFish + " ! You paid **20** cookies :cookie: for casting.");
    }
};

module.exports.help =
{
    name: "fishy"
};