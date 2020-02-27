const cheerio = require("cheerio");
const axios = require("axios");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    let iRandomPokemon1 = Math.floor(( Math.random() * 151 ) + 1);
    let iRandomPokemon2 = Math.floor(( Math.random() * 151 ) + 1);

    await message.channel.startTyping();

    await axios.get(`https://pokemon.alexonsager.net/${iRandomPokemon1}/${iRandomPokemon2}`).then(async (response) =>
    {
        const $ = cheerio.load(await response.data);

        const FusedPokemonName = $("#pk_name").text().trim();
        const Pokemon1 = $("#select1 option:selected").text().trim();
        const Pokemon2 = $("#select2 option:selected").text().trim();

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Poke Fusion", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setDescription(`Randomly fused **${Pokemon1}** :zap: **${Pokemon2}**\n\nResult: **${FusedPokemonName}**`)
        .setColor(11950939)
        .attachFile({ attachment: `http://images.alexonsager.net/pokemon/fused/${iRandomPokemon2}/${iRandomPokemon2}.${iRandomPokemon1}.png`, name: "pokefusion.png" })
        .setImage("attachment://pokefusion.png")
        .setThumbnail("https://i.imgur.com/i6F9ntA.png")
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