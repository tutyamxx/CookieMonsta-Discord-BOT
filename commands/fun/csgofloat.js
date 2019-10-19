const Discord = require("discord.js");
const getJSON = require("get-json");
const CustomFunctions = require("../../functions/funcs.js");

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

        // --| Exterior wear of the skin in its float representation
        let SkinFloatValue = JSON.stringify(await response.iteminfo.floatvalue).replace(/"/g, '');

        // --| Paint ID of the weapon (skin)
        let SkinPaintIndex = JSON.stringify(await response.iteminfo.paintindex).replace(/"/g, '');

        // --| Seed for the RNG that defines how to place the skin texture
        let SkinPaintSeed = JSON.stringify(await response.iteminfo.paintseed).replace(/"/g, '');

        // --| ID of the item
        let SkinItemID = JSON.stringify(parseInt(await response.iteminfo.itemid_int));

        // --| Optional: Name of the skin
        let SkinName = JSON.stringify(await response.iteminfo.item_name).replace(/"/g, '');

        // --| Wear name (Factory New, Minimal Wear, etc...)
        let SkinWearName = JSON.stringify(await response.iteminfo.wear_name).replace(/"/g, '');

        // --| Weapon type name
        let SkinWeaponName = JSON.stringify(await response.iteminfo.weapon_type).replace(/"/g, '');

        // --| Quality name (Souvenir, Stattrak, etc...)
        let SkinQuality = JSON.stringify(await response.iteminfo.quality_name).replace(/"/g, '');

        // --| Origin name (Trade-Up, Dropped, etc...)
        let SkinOrigin = JSON.stringify(await response.iteminfo.origin_name).replace(/"/g, '');

        // --| Skin image URL
        let SkinImageURL = JSON.stringify(await response.iteminfo.imageurl).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | CSGO Float", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#708090")
        .setDescription(":gun: " + SkinQuality + " " + SkinWeaponName + " | " + SkinName + " " + "(" + SkinWearName + ")" + "\n\n:mag: **Float:** " + SkinFloatValue + "\n\n:id: **Item ID:** " + SkinItemID + "\n\n:package: **Origin:** " + SkinOrigin + "\n\n:paintbrush: **Paint Index:** " + SkinPaintIndex + "\n\n:art: **Paint Seed:** " + SkinPaintSeed)
        .setImage(SkinImageURL)
        .setThumbnail("https://i.imgur.com/BYlrgPn.jpg")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "csgofloat"
};