const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: it seems your number parameter is empty! Try entering a number. :no_entry:" );
    }

    if(!CustomFunctions.isInt(szArgs[0]))
    {
        return message.reply(" :no_entry: it seems your number parameter is not a valid number! Try entering a valid number. :no_entry:" );
    }

    message.channel.startTyping();

    axios.get(`http://numbersapi.com/${szArgs[0].trim()}?json`).then((response) =>
    {
        // --| Remove "" from start and end of string, remove \n, \t, \ from string
        const NumberFactString = JSON.stringify(response.data.text).replace(/"/g, "").replace(/\\/g, '"');

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Random fact about number: #" + szArgs[0], bot.user.displayAvatarURL())
        .setColor(4402687)
        .setDescription(NumberFactString)
        .setThumbnail("https://i.imgur.com/L4RORNr.png")
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Something happened! Numbers aren't generated and the matrix is glitched! Try again later :sob:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "numfact"
};