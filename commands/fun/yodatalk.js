const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Make sure you add some text too.  :no_entry:");
    }

    message.channel.startTyping();

    let ArgumentText = szArgs.join(" ");

    axios.get(`http://yoda-api.appspot.com/api/v1/yodish?text=${encodeURI(ArgumentText)}`).then((response) =>
    {
        // --| Remove "" from start and end of string
        const YodishString = JSON.stringify(response.data.yodish).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Yoda Talk", bot.user.displayAvatarURL())
        .setColor(9419919)
        .setDescription(YodishString)
        .setThumbnail("https://i.imgur.com/9H5dC0O.jpg")
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Oh noes! master Yoda has dissapeared! Try again later. :sob:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "yodatalk"
};