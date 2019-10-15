
const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    await getJSON('https://some-random-api.ml/catfact', async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: some kind of error has occured! Try again later? :crying_cat_face:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        let CatFactToString = JSON.stringify(response.fact).replace(/"/g, '').replace(/\\/g, "``");

        const embed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Cat Facts", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#E6E6FA")
        .setDescription(CatFactToString)
        .setThumbnail("https://i.imgur.com/xnTRVHO.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({embed}).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "catfact"
};
