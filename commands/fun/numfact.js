const Discord = require("discord.js");
const getJSON = require("get-json");
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

    await getJSON("http://numbersapi.com/" + szArgs[0].trim() + "?json", async (error, data) =>
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Something happened! Numbers aren't generated and the matrix is glitched! Try again later :sob:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string, remove \n, \t, \ from string
        let NumberFactString = JSON.stringify(await data.text).replace(/"/g, '').replace(/\\/g, '"');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random fact about number: #" + szArgs[0], (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(4402687)
        .setDescription(NumberFactString)
        .setThumbnail("https://i.imgur.com/L4RORNr.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "numfact"
};