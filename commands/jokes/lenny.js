const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    const LennyMessage = await message.channel.send("Fetching some lenny's ( ͜。 ͡ʖ ͜。) ...");

    await getJSON("http://lenny.today/api/v1/random", async (error, response) =>
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, it seems our lenny's are sad (ಥ ͜ʖಥ). Try later. :no_entry:");
        }

        // --| Remove "" from start and end of string
        let LennyFace = JSON.stringify(await response[0].face).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Your random Lenny", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(0)
        .setDescription("``" + LennyFace + "``")
        .setThumbnail("https://i.imgur.com/TxUxdfi.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await LennyMessage.edit({ embed: DiscordRichEmbed });
    });
};

module.exports.help =
{
    name: "lenny"
};