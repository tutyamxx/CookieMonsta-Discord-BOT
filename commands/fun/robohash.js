const Discord = require("discord.js");
const getJSON = require("get-json");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!robohash** ``<your text here>`` :no_entry:");
    }

    let ArgumentText = szArgs.join(" ");

    let GenerateRoboHash = "https://robohash.org/" + ArgumentText + ".png?bgset=bg1";

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Robohash", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor("#" + (Math.random() * 0xFFFFFF << 0).toString(16))
    .setImage(encodeURI(GenerateRoboHash))
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

    await message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "robohash"
};