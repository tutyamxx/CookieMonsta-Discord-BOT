const Discord = require("discord.js");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    const CoinFlip = Math.round(Math.random());
    let CoinImageNumber, CoinTextNumber;

    switch(CoinFlip)
    {
        case 0:
            CoinImageNumber = "https://i.imgur.com/NFsWEaw.png";
            CoinTextNumber = "HEAD ( ͡° ͜ʖ ͡°)";

            break;

        case 1:
            CoinImageNumber = "https://i.imgur.com/zXJ9usj.png";
            CoinTextNumber = "TAIL"

            break;
    }

    const DiscordRichEmbed = new Discord.MessageEmbed()
    .setAuthor("Cookie Monsta | Coin Flip", bot.user.displayAvatarURL())
    .setColor(14667180)
    .setDescription("You got :point_right:  ***" + CoinTextNumber + "***")
    .setImage(CoinImageNumber)
    .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

    message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "flip"
};