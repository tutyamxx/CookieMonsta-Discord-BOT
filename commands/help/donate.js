const Discord = require("discord.js");
const BotConfig = require("../../config/botconfig.json");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    const DiscordRichEmbed = new Discord.MessageEmbed()
    .setAuthor("Cookie Monsta | Donate!", bot.user.displayAvatarURL())
    .setDescription(":ballot_box_with_check: Bot hosting is provided by me, using my own money and server.\n\n:ballot_box_with_check: That being said, if you enjoy this super duper awesome bot and want to `help` in keeping it alive, I would appreciate a small **1£** donation that will help me to pay the hosting and keep me focused in future updates!\n\n:ballot_box_with_check: I will update it anyway, plebs <:FeelsDabMan:634890825230319640>\n\n\n\:credit_card: You can buy me a coffee :coffee: by clicking this [LINK](" + BotConfig.DiscordBOT_PayPal_Link.trim().toString() + ")\n\n\n\n:red_circle: ***YOU ARE NOT FORCED BY ANY MEANS TO DONATE!*** :red_circle:")
    .setColor("#1E90FF")
    .setThumbnail("https://i.imgur.com/6aAZnYy.jpg")
    .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

    message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "donate"
};