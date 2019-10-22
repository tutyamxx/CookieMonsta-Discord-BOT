const Discord = require("discord.js");
const getJSON = require("get-json");
const CustomFunctions = require("../../functions/funcs.js");

const csgofloat =
{
    SKIN_FLOAT_VALUE: 0,
    SKIN_PAINT_INDEX: 1,
    SKIN_PAINT_SEED: 2,
    SKIN_ITEM_ID: 3,
    SKIN_NAME: 4,
    SKIN_WEAR_NAME: 5,
    SKIN_WEAPON_NAME: 6,
    SKIN_QUALITY: 7,
    SKIN_ORIGIN: 8,
    SKIN_IMAGE_URL: 9
};

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: Please enter the skin Inspect URL :gun: :no_entry:");
    }

    const user = message.author;

    message.channel.startTyping();

    let InspectSkinFormatURL = "https://api.csgofloat.com/?url=" + szArgs.join(" ");

    await getJSON(InspectSkinFormatURL, async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, but Valve's servers didn't reply in time or you have entered an invalid Inspect URL :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        let szCSGOFloatArray = [];

        // --| Exterior wear of the skin in its float representation
        szCSGOFloatArray[csgofloat.SKIN_FLOAT_VALUE] = JSON.stringify(await response.iteminfo.floatvalue).replace(/"/g, '');

        // --| Paint ID of the weapon (skin)
        szCSGOFloatArray[csgofloat.SKIN_PAINT_INDEX] = JSON.stringify(await response.iteminfo.paintindex).replace(/"/g, '');

        // --| Seed for the RNG that defines how to place the skin texture
        szCSGOFloatArray[csgofloat.SKIN_PAINT_SEED] = JSON.stringify(await response.iteminfo.paintseed).replace(/"/g, '');

        // --| ID of the item
        szCSGOFloatArray[csgofloat.SKIN_ITEM_ID] = JSON.stringify(await response.iteminfo.itemid);

        // --| Optional: Name of the skin
        szCSGOFloatArray[csgofloat.SKIN_NAME] = JSON.stringify(await response.iteminfo.item_name).replace(/"/g, '');

        // --| Wear name (Factory New, Minimal Wear, etc...)
        szCSGOFloatArray[csgofloat.SKIN_WEAR_NAME] = JSON.stringify(await response.iteminfo.wear_name).replace(/"/g, '');

        // --| Weapon type name
        szCSGOFloatArray[csgofloat.SKIN_WEAPON_NAME] = JSON.stringify(await response.iteminfo.weapon_type).replace(/"/g, '');

        // --| Quality name (Souvenir, Stattrak, etc...)
        szCSGOFloatArray[csgofloat.SKIN_QUALITY] = JSON.stringify(await response.iteminfo.quality_name).replace(/"/g, '');

        // --| Origin name (Trade-Up, Dropped, etc...)
        szCSGOFloatArray[csgofloat.SKIN_ORIGIN] = JSON.stringify(await response.iteminfo.origin_name).replace(/"/g, '');

        // --| Skin image URL
        szCSGOFloatArray[csgofloat.SKIN_IMAGE_URL] = JSON.stringify(await response.iteminfo.imageurl).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | CSGO Float", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#708090")
        .setDescription(":gun: " + szCSGOFloatArray[csgofloat.SKIN_QUALITY] + " " + szCSGOFloatArray[csgofloat.SKIN_WEAPON_NAME] + " | " + szCSGOFloatArray[csgofloat.SKIN_NAME] + " " + "(" + szCSGOFloatArray[csgofloat.SKIN_WEAR_NAME] + ")" + "\n\n:mag: **Float:** " + szCSGOFloatArray[csgofloat.SKIN_FLOAT_VALUE] + "\n\n:id: **Item ID:** " + szCSGOFloatArray[csgofloat.SKIN_ITEM_ID] + "\n\n:package: **Origin:** " + szCSGOFloatArray[csgofloat.SKIN_ORIGIN] + "\n\n:paintbrush: **Paint Index:** " + szCSGOFloatArray[csgofloat.SKIN_PAINT_INDEX] + "\n\n:art: **Paint Seed:** " + szCSGOFloatArray[csgofloat.SKIN_PAINT_SEED])
        .setImage(szCSGOFloatArray[csgofloat.SKIN_IMAGE_URL])
        .setThumbnail("https://i.imgur.com/BYlrgPn.jpg")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "csgofloat"
};