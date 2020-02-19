const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    await getJSON("https://some-random-api.ml/facts/koala", async (error, response) =>
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Did you know? Koalas are so protected that, they might have disappeared? :cry:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        let KoalaFactToString = JSON.stringify(await response.fact).replace(/"/g, '').replace(/\\/g, "``");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Koala Facts", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#dddad0")
        .setDescription(KoalaFactToString)
        .setThumbnail("https://i.imgur.com/Ch7vTxz.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "koalafact"
};