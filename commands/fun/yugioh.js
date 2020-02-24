const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: Please type a valid ***Yu-Gi-Oh!*** card name :flower_playing_cards:  :no_entry:");
    }

    const user = message.author;
    let CardName = encodeURI(szArgs.join(" "));

    await message.channel.startTyping();

    await axios.get("https://yugiohprices.com/api/card_data/" + CardName).then(async (response) =>
    {
        if(await response.data.status === "fail")
        {
            return await message.reply(" :no_entry: No results found for: ***" + decodeURI(CardName) + "***  ! :neutral_face:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
        }

        const szCardName = JSON.stringify(await response.data.data.name).replace(/"/g, "");
        const szCardDescription = JSON.stringify(await response.data.data.text).replace(/"/g, "").replace(/&quot;/g, '\\"').replace(/\\/g, "``");
        const CardType = JSON.stringify(await response.data.data.card_type).replace(/"/g, "");

        const szCardFamily = JSON.stringify(await response.data.data.family).replace(/"/g, "");
        const szCardSpecies = JSON.stringify(await response.data.data.type).replace(/"/g, "");

        const iCardLevel = JSON.stringify(await response.data.data.level).replace(/"/g, "");
        const iCardAttack = JSON.stringify(await response.data.data.atk).replace(/"/g, "");
        const iCardDefense = JSON.stringify(await response.data.data.def).replace(/"/g, "");

        let GetCardImage = "https://i.imgur.com/QR4uGrD.png";

        await axios.get("https://db.ygoprodeck.com/api/v5/cardinfo.php?name=" + CardName).then(async (response_card_image) =>
        {
            GetCardImage = await response_card_image.data[0].card_images[0].image_url;

        }).catch(() => { });

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Yu-Gi-Oh!", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(0xBE5F1F)
        .setDescription(":flower_playing_cards: **Card Name:** " + szCardName + "\n\n:label: **Description:** " + szCardDescription + "\n\n")
        .addField(":performing_arts: **Card Type:** ", CustomFunctions.capitalizeFirstLetter(CardType), true)
        .setThumbnail("https://i.imgur.com/YidwZ0f.gif")
        .attachFile({ attachment: GetCardImage, name: "yugioh_card.png" })
        .setImage("attachment://yugioh_card.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        if(CardType === "monster")
        {
            await DiscordRichEmbed.addField(":sparkles: **Species:** ", szCardSpecies, true)
            .addField(":credit_card: **Attribute:** ", CustomFunctions.capitalizeFirstLetter(szCardFamily), true)
            .addField(":muscle: **Level:** ", parseInt(iCardLevel), true)
            .addField(":crossed_swords: **ATK:** ", "`" + parseInt(iCardAttack) + "`", true)
            .addField(":shield: **DEF:** ", "`" + parseInt(iCardDefense) + "`", true)
        }

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.reply(" :no_entry: No results found! :neutral_face:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "yugioh"
};