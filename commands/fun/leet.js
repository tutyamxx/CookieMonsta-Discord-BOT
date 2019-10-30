const Discord = require("discord.js");
const L33T = require("leet");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!leet** ``<your text here>`` :no_entry:");
    }

    let ArgumentText = szArgs.join(" ");
    let TextToL33t = L33T.convert(ArgumentText);

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Text to L33T", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor("#009999")
    .setDescription("Here, n00b: :arrow_lower_left:\n\n``" + TextToL33t + "``")
    .setThumbnail("https://i.imgur.com/TR2cv3C.jpg")
    .setFooter("Generated by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

    await message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "leet"
};