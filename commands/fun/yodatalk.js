const Discord = require("discord.js");
const getJSON = require("get-json");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!yodatalk** ``<your text here>`` :no_entry:");
    }

    message.channel.startTyping();

    let ArgumentText = szArgs.join(" ");

    await getJSON("http://yoda-api.appspot.com/api/v1/yodish?text=" + encodeURI(ArgumentText), async (error, response) =>
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Oh noes! master Yoda has dissapeared! Try again later. :sob:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        let YodishString = JSON.stringify(await response.yodish).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Yoda Talk", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(9419919)
        .setDescription(YodishString)
        .setThumbnail("https://i.imgur.com/9H5dC0O.jpg")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "yodatalk"
};