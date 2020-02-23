const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;
    const LennyMessage = await message.channel.send("Fetching some lenny's ( ͜。 ͡ʖ ͜。) ...");

    await message.channel.startTyping();

    await axios.get("http://lenny.today/api/v1/random").then(async (response) =>
    {
        // --| Remove "" from start and end of string
        const LennyFace = JSON.stringify(await response.data[0].face).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Your random Lenny", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(0)
        .setDescription("``" + LennyFace + "``")
        .setThumbnail("https://i.imgur.com/TxUxdfi.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await LennyMessage.edit({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Sorry, it seems our lenny's are sad (ಥ ͜ʖಥ). Try later. :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "lenny"
};