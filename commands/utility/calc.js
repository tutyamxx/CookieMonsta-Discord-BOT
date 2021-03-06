const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: eyy, try to add some math expressions or someshit :1234:  :no_entry:" );
    }

    message.channel.startTyping();

    let MathEquation = szArgs.slice(0).join(" ").trim().replace(/\s/g, "");

    axios.get(`http://api.mathjs.org/v4/?expr=${encodeURIComponent(MathEquation)}&precision=3`).then((response) =>
    {
        let MathCalc = response.data;

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Calculator", bot.user.displayAvatarURL())
        .setColor("#00CED1")
        .setDescription(":selfie: You wanted to calculate: **" + MathEquation.replace(/\s/g, "") + "**\n\n:1234: Result: **" + MathCalc + "**")
        .setThumbnail("https://i.imgur.com/AZSvouC.png")
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        const DiscordRichEmbed1 = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Calculator Error", bot.user.displayAvatarURL())
        .setColor("#FF0000")
        .setDescription(":sos: **Invalid math formulae or my brain is ded!** :sos:")
        .setThumbnail("https://i.imgur.com/AZSvouC.png")
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        return message.channel.send({ embed: DiscordRichEmbed1 }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "calc"
};