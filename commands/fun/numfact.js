const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: it seems your number parameter is empty! Try entering a number. :no_entry:" );
    }

    if(!CustomFunctions.isInt(szArgs[0]))
    {
        return await message.reply(" :no_entry: it seems your number parameter is not a valid number! Try entering a valid number. :no_entry:" );
    }

    await message.channel.startTyping();

    await axios.get("http://numbersapi.com/" + szArgs[0].trim() + "?json").then(async (response) =>
    {
        // --| Remove "" from start and end of string, remove \n, \t, \ from string
        const NumberFactString = JSON.stringify(await response.data.text).replace(/"/g, "").replace(/\\/g, '"');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random fact about number: #" + szArgs[0], (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(4402687)
        .setDescription(NumberFactString)
        .setThumbnail("https://i.imgur.com/L4RORNr.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Something happened! Numbers aren't generated and the matrix is glitched! Try again later :sob:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "numfact"
};