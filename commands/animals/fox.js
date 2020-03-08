const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("https://randomfox.ca/floof/").then((response) =>
    {
        // --| Remove "" from start and end of string
        const FoxImageToString = JSON.stringify(response.data.image).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Random Fox", bot.user.displayAvatarURL())
        .setColor(11674146)
        .setImage(FoxImageToString)
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        message.channel.send({ embed: DiscordRichEmbed }).then(async (message) =>
        {
            await message.react("🦊");

        }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Oh noes! Foxes ran away, try later perhaps?! :crying_cat_face:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "fox"
};