
const GetDatabaseData = require("../functions/getuserdata.js");
const CookieMonsta = require("../CookieMonstaBOT.js");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    if(CookieMonsta.UserDatabaseData.cookies < 20)
    {
        return await message.reply(":no_entry: you don't have enough cookies :cookie: to do that! :no_entry:");
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

    GetDatabaseData.CookiesRemove(message.guild.id, user.id, 20);

    if(iRandomFish === ":fish:"
    || iRandomFish === ":tropical_fish:"
    || iRandomFish === ":blowfish:"
    || iRandomFish === ":dolphin:")
    {
        GetDatabaseData.CookiesUpdate(message.guild.id, user.id, iRandomFishPrize);

        return await message.channel.send(":fishing_pole_and_fish: | **" + user.username + "**, you caught a: " + iRandomFish + " worth of **" + iRandomFishPrize + "** cookies :cookie: !\n:fishing_pole_and_fish: | You paid **20** cookies :cookie: for casting.");
    }

    if(iRandomFish === ":whale2:")
    {
        GetDatabaseData.CookiesUpdate(message.guild.id, user.id, 200);

        return await message.channel.send(":fishing_pole_and_fish: | **" + user.username + "**, you caught a: " + iRandomFish + " worth of **200** cookies :cookie: !\n:fishing_pole_and_fish: | You paid **20** cookies :cookie: for casting.");
    }

    else
    {
        return await message.channel.send(":fishing_pole_and_fish: | **" + user.username + "**, you caught a: " + iRandomFish + " ! You paid **20** cookies :cookie: for casting.");
    }
};

module.exports.help =
{
    name: "fishy"
};
