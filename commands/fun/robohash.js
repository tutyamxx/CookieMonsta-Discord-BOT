const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! You need to add some text.  :no_entry:");
    }

    let ArgumentText = szArgs.join(" ");

    const DiscordRichEmbed = new Discord.MessageEmbed()
    .setAuthor("Cookie Monsta | Robohash", bot.user.displayAvatarURL())
    .setColor("#" + (Math.random() * 0xFFFFFF << 0).toString(16))
    .setImage(encodeURI(`https://robohash.org/${ArgumentText}.png?bgset=bg1`))
    .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

    message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "robohash"
};