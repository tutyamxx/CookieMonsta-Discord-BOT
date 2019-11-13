const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    let iRandomPokemon1 = Math.floor(( Math.random() * 151 ) + 1);
    let iRandomPokemon2 = Math.floor(( Math.random() * 151 ) + 1);

    let GenLink = "http://images.alexonsager.net/pokemon/fused/" + iRandomPokemon1 + "/" + iRandomPokemon1 + "." + iRandomPokemon2 + ".png";

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Poke Fusion", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(11950939)
    .attachFile({ attachment: GenLink, name: "pokefusion.png" })
    .setImage("attachment://pokefusion.png")
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

    await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
};

module.exports.help =
{
    name: "pokefusion"
};