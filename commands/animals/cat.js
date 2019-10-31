const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await getJSON("http://aws.random.cat/meow", async (error, response) =>
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, the purr factory isn't generating kittens at the moment :crying_cat_face:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        let CatImageToString = JSON.stringify(await response.file).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Cat", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(16777215)
        .setImage(CatImageToString)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async (message) =>
        {
            await message.react("🐱");
        });
    });
};

module.exports.help =
{
    name: "cat"
};