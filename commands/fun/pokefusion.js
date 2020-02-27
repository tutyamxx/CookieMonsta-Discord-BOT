const cheerio = require("cheerio");
const axios = require("axios");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    let iRandomPokemon1 = Math.floor(( Math.random() * 151 ) + 1);
    let iRandomPokemon2 = Math.floor(( Math.random() * 151 ) + 1);

    await message.channel.startTyping();

    let FusedPokemonName;
    await axios.get(`https://pokemon.alexonsager.net/${iRandomPokemon1}/${iRandomPokemon2}`).then(async (response) =>
    {
        const $ = cheerio.load(response.data);

        FusedPokemonName = $("#pk_name").text();

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Poke Fusion: " + FusedPokemonName, (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setTitle(FusedPokemonName)
        .setColor(11950939)
        .attachFile({ attachment: `http://images.alexonsager.net/pokemon/fused/${iRandomPokemon2}/${iRandomPokemon2}.${iRandomPokemon1}.png`, name: "pokefusion.png" })
        .setImage("attachment://pokefusion.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(() =>
    {
        FusedPokemonName = "";
    });
};

module.exports.help =
{
    name: "pokefusion"
};