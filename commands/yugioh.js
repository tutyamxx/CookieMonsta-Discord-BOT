const Discord = require("discord.js");
const getJSON = require("get-json");
const CustomFunctions = require("../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: Please type a valid ***Yu-Gi-Oh!*** card name :flower_playing_cards:  :no_entry:");
    }

    const user = message.author;
    let CardName = encodeURI(szArgs.join(" "));

    message.channel.startTyping();

    await getJSON("https://yugiohprices.com/api/card_data/" + CardName, async function(error, response)
    {
        if(error)
        {
            return await message.reply(" :no_entry: No results found! :neutral_face:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        if(await response.status === "fail")
        {
            return await message.reply(" :no_entry: No results found for: ***" + decodeURI(CardName) +"***  ! :neutral_face:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        let szCardName = JSON.stringify(await response.data.name).replace(/"/g, '');
        let szCardDescription = JSON.stringify(await response.data.text).replace(/"/g, '').replace(/&quot;/g, '\\"').replace(/\\/g, "``");
        let CardType = JSON.stringify(await response.data.card_type).replace(/"/g, '');

        let szCardFamily = JSON.stringify(await response.data.family).replace(/"/g, '');
        let szCardSpecies = JSON.stringify(await response.data.type).replace(/"/g, '');

        let iCardLevel = JSON.stringify(await response.data.level).replace(/"/g, '');
        let iCardAttack = JSON.stringify(await response.data.atk).replace(/"/g, '');
        let iCardDefense = JSON.stringify(await response.data.def).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Yu-Gi-Oh!", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(0xBE5F1F)
        .setDescription(":flower_playing_cards: **Card Name:** " + szCardName + "\n\n:label: **Description:** " + szCardDescription + "\n\n")
        .addField(":performing_arts: **Card Type:** ", CustomFunctions.capitalizeFirstLetter(CardType), true)
        .setThumbnail("https://i.imgur.com/YidwZ0f.gif")
        .setImage("https://yugiohprices.com/api/card_image/" + CardName)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        if(CardType === "monster")
        {
            await DiscordRichEmbed.addField(":sparkles: **Species:** ", szCardSpecies, true)
            .addField(":credit_card: **Attribute:** ", CustomFunctions.capitalizeFirstLetter(szCardFamily), true)
            .addField(":muscle: **Level:** ", parseInt(iCardLevel), true)
            .addField(":crossed_swords: **ATK:** ", "`" + parseInt(iCardAttack) + "`", true)
            .addField(":shield: **DEF:** ", "`" + parseInt(iCardDefense) + "`", true)
        }

        await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "yugioh"
};