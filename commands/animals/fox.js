const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await getJSON("https://randomfox.ca/floof/", async (error, response) =>
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Oh noes! Foxes ran away, try later perhaps?! :crying_cat_face:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        let FoxImageToString = JSON.stringify(await response.image).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Fox", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(11674146)
        .setImage(FoxImageToString)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async (message) =>
        {
            await message.react("🦊");
        });
    });
};

module.exports.help =
{
    name: "fox"
};