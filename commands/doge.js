const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await getJSON('http://shibe.online/api/shibes?count=1&httpsUrls=true', async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Such sad! Much cry! Ain't working atm, dog. :cry:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        let DogeToString = JSON.stringify(await response[0]).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Doge", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(16753920)
        .setImage(DogeToString)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(function (message)
        {
            message.react("🐶");
        });
    });
};

module.exports.help =
{
    name: "doge"
};