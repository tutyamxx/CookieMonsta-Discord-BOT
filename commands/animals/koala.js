const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await getJSON("https://some-random-api.ml/img/koala", async function (error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, no koalas to generate. Try again later :koala:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        let RandomKoala = JSON.stringify(await response.link).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Random Koala", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#dddad0")
        .setImage(RandomKoala)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async (message) =>
        {
            await message.react("🐨");
        });
    });
};

module.exports.help =
{
    name: "koala"
};