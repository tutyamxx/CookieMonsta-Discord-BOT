const Discord = require("discord.js");
const Needle = require("needle");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    await Needle.get("https://api.github.com/zen", async function(error, response)
    {
        if(!error && response.statusCode === 200)
        {
            let ZenWords = await response.body.replace(/"/g, '').replace(/'/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/\\/g, '"');

            const DiscordRichEmbed = new Discord.RichEmbed()
            .setAuthor("Cookie Monsta | GitHub Zen", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
            .setColor(16777037)
            .setThumbnail("https://i.imgur.com/6pFPKvA.png")
            .setDescription(":tanabata_tree: " + ZenWords)
            .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

            await message.channel.send({ embed: DiscordRichEmbed }).then(function (message)
            {
                message.react("🎋");

            }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        else
        {
            return await message.channel.send(":no_entry: Something went wrong! Be patient, try again later! :sob:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }
    });
};

module.exports.help =
{
    name: "zen"
};