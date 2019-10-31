const Discord = require("discord.js");
const Needle = require("needle");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    await Needle.get("https://api.apithis.net/yomama.php", async (error, response) =>
    {
        if(!error && response.statusCode == 200)
        {
            let StringYoMama = await response.body.replace(/"/g, '').replace(/'/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/\\/g, '"');

            const DiscordRichEmbed = new Discord.RichEmbed()
            .setAuthor("Cookie Monsta | Yo momma joke", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
            .setColor(16776960)
            .setDescription(StringYoMama)
            .setThumbnail("https://i.imgur.com/03aDAhq.png")
            .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

            await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        else
        {
            return await message.channel.send(":no_entry: Yo mama so fat, it broke the internet! Try again later :sob:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }
    });
};

module.exports.help =
{
    name: "yomama"
};