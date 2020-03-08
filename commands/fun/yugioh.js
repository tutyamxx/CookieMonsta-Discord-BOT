const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: Please type a valid ***Yu-Gi-Oh!*** card name :flower_playing_cards:  :no_entry:");
    }

    const user = message.author;
    let CardName = encodeURI(szArgs.join(" "));

    message.channel.startTyping();

    axios.get("https://yugiohprices.com/api/card_data/" + CardName).then(async (response) =>
    {
        if(response.data.status === "fail")
        {
            return message.reply(" :no_entry: No results found for: ***" + decodeURI(CardName) + "***  ! :neutral_face:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        }

        const szCardName = JSON.stringify(response.data.data.name).replace(/"/g, "");
        const szCardDescription = JSON.stringify(response.data.data.text).replace(/"/g, "").replace(/&quot;/g, '\\"').replace(/\\/g, "``");
        const CardType = JSON.stringify(response.data.data.card_type).replace(/"/g, "");

        const szCardFamily = JSON.stringify(response.data.data.family).replace(/"/g, "");
        const szCardSpecies = JSON.stringify(response.data.data.type).replace(/"/g, "");

        const iCardLevel = JSON.stringify(response.data.data.level).replace(/"/g, "");
        const iCardAttack = JSON.stringify(response.data.data.atk).replace(/"/g, "");
        const iCardDefense = JSON.stringify(response.data.data.def).replace(/"/g, "");

        let GetCardImage = "https://i.imgur.com/QR4uGrD.png";

        await axios.get("https://db.ygoprodeck.com/api/v5/cardinfo.php?name=" + CardName).then((response_card_image) =>
        {
            GetCardImage = response_card_image.data[0].card_images[0].image_url;

        }).catch(() => { });

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Yu-Gi-Oh!", bot.user.displayAvatarURL())
        .setColor(0xBE5F1F)
        .setDescription(":flower_playing_cards: **Card Name:** " + szCardName + "\n\n:label: **Description:** " + szCardDescription + "\n\n")
        .addField(":performing_arts: **Card Type:** ", CustomFunctions.capitalizeFirstLetter(CardType), true)
        .setThumbnail("https://i.imgur.com/YidwZ0f.gif")
        .attachFiles({ attachment: GetCardImage, name: "yugioh_card.png" })
        .setImage("attachment://yugioh_card.png")
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        if(CardType === "monster")
        {
            DiscordRichEmbed.addField(":sparkles: **Species:** ", szCardSpecies, true)
            .addField(":credit_card: **Attribute:** ", CustomFunctions.capitalizeFirstLetter(szCardFamily), true)
            .addField(":muscle: **Level:** ", parseInt(iCardLevel), true)
            .addField(":crossed_swords: **ATK:** ", "`" + parseInt(iCardAttack) + "`", true)
            .addField(":shield: **DEF:** ", "`" + parseInt(iCardDefense) + "`", true)
        }

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.reply(" :no_entry: No results found! :neutral_face:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "yugioh"
};