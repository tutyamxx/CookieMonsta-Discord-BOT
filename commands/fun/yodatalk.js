const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Make sure you add some text too.  :no_entry:");
    }

    await message.channel.startTyping();

    let ArgumentText = szArgs.join(" ");

    await axios.get("http://yoda-api.appspot.com/api/v1/yodish?text=" + encodeURI(ArgumentText)).then(async (response) =>
    {
        // --| Remove "" from start and end of string
        const YodishString = JSON.stringify(await response.data.yodish).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Yoda Talk", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(9419919)
        .setDescription(YodishString)
        .setThumbnail("https://i.imgur.com/9H5dC0O.jpg")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    
    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Oh noes! master Yoda has dissapeared! Try again later. :sob:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "yodatalk"
};