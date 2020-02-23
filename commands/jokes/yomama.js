const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    await axios.get("https://api.apithis.net/yomama.php").then(async (response) =>
    {
        const StringYoMama = await response.data.replace(/"/g, "").replace(/'/g, "").replace(/\[/g, '').replace(/\]/g, "").replace(/\\/g, '"').replace("\n", "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Yo momma joke", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(16776960)
        .setDescription(StringYoMama)
        .setThumbnail("https://i.imgur.com/03aDAhq.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    
    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Yo mama so fat, it broke the internet! Try again later :sob:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "yomama"
};