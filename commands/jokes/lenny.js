const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;
    const LennyMessage = message.channel.send("Fetching some lenny's ( ͜。 ͡ʖ ͜。) ...");

    message.channel.startTyping();

    axios.get("http://lenny.today/api/v1/random").then((response) =>
    {
        // --| Remove "" from start and end of string
        const LennyFace = JSON.stringify(response.data[0].face).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Your random Lenny", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(0)
        .setDescription("``" + LennyFace + "``")
        .setThumbnail("https://i.imgur.com/TxUxdfi.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        LennyMessage.edit({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Sorry, it seems our lenny's are sad (ಥ ͜ʖಥ). Try later. :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "lenny"
};