const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: eyy, try to add some math expressions or someshit :1234:  :no_entry:" );
    }

    await message.channel.startTyping();

    let MathEquation = szArgs.slice(0).join(" ").trim().replace(/\s/g, "");

    await axios.get(`http://api.mathjs.org/v4/?expr=${encodeURIComponent(MathEquation)}&precision=3`).then(async (response) =>
    {
        let MathCalc = await response.data;

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Calculator", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#00CED1")
        .setDescription(":selfie: You wanted to calculate: **" + MathEquation.replace(/\s/g, "") + "**\n\n:1234: Result: **" + MathCalc + "**")
        .setThumbnail("https://i.imgur.com/AZSvouC.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    
    }).catch(async () =>
    {
        const DiscordRichEmbed1 = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Calculator Error", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#FF0000")
        .setDescription(":sos: **Invalid math formulae or my brain is ded!** :sos:")
        .setThumbnail("https://i.imgur.com/AZSvouC.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        return await message.channel.send({ embed: DiscordRichEmbed1 }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "calc"
};