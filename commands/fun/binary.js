const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Make sure you add some text to convert.  :no_entry:");
    }

    let ArgumentText = szArgs.join(" ");

    let i;
    let OutputBinary = "";

    for(i = 0; i < ArgumentText.length; i++)
    {
        OutputBinary += ArgumentText[i].charCodeAt(0).toString(2) + " ";
    }

    const DiscordRichEmbed = new Discord.MessageEmbed()
    .setAuthor("Cookie Monsta | Your binary", bot.user.displayAvatarURL())
    .setColor(1173635)
    .setDescription(OutputBinary)
    .setThumbnail("https://i.imgur.com/W5oKCle.jpg")
    .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

    message.delete().then(() => message.channel.send({ embed: DiscordRichEmbed }));
};

module.exports.help =
{
    name: "binary"
};