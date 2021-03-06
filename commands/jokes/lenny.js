const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;
    let LennyMessage = await message.channel.send("Fetching some lenny's ( ͜。 ͡ʖ ͜。) ...");

    message.channel.startTyping();

    axios.get("http://lenny.today/api/v1/random").then(async (response) =>
    {
        // --| Remove "" from start and end of string
        const LennyFace = JSON.stringify(response.data[0].face).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Your random Lenny", bot.user.displayAvatarURL())
        .setColor(0)
        .setDescription("``" + LennyFace + "``")
        .setThumbnail("https://i.imgur.com/TxUxdfi.png")
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        await LennyMessage.edit({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Sorry, it seems our lenny's are sad (ಥ ͜ʖಥ). Try later. :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "lenny"
};