const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    let LitePrice = [];
    let LitePricePaprika = [];
    let LiteCoinGecko = [];

    await axios.all(
    [
        axios.get("https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD,JPY,EUR,GBP"),
        axios.get("https://api.coinpaprika.com/v1/tickers/ltc-litecoin?quotes=gbp,eur,usd,jpy"),
        axios.get("https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=gbp,usd,eur,jpy")

    ]).then(await axios.spread(async (ResponseCryptocompare, ResponseCoinpaprika, ResponseCoingecko) =>
    {
        if(ResponseCryptocompare)
        {
            LitePrice[0] = await ResponseCryptocompare.data.EUR;
            LitePrice[1] = await ResponseCryptocompare.data.GBP;
            LitePrice[2] = await ResponseCryptocompare.data.USD;
            LitePrice[3] = await ResponseCryptocompare.data.JPY;
        }

        if(ResponseCoinpaprika)
        {
            LitePricePaprika[0] = await ResponseCoinpaprika.data.quotes.EUR.price.toFixed(2);
            LitePricePaprika[1] = await ResponseCoinpaprika.data.quotes.GBP.price.toFixed(2);
            LitePricePaprika[2] = await ResponseCoinpaprika.data.quotes.USD.price.toFixed(2);
            LitePricePaprika[3] = await ResponseCoinpaprika.data.quotes.JPY.price.toFixed(2);
        }

        if(ResponseCoingecko)
        {
            LiteCoinGecko[0] = await ResponseCoingecko.data.litecoin.eur;
            LiteCoinGecko[1] = await ResponseCoingecko.data.litecoin.gbp;
            LiteCoinGecko[2] = await ResponseCoingecko.data.litecoin.usd;
            LiteCoinGecko[3] = await ResponseCoingecko.data.litecoin.jpy;
        }

    })).catch((errorCryptocompare, errorCoinpaprika, errorCoingecko) =>
    {
        if(errorCryptocompare)
        {
            LitePrice[0] = "API Error";
            LitePrice[1] = "API Error";
            LitePrice[2] = "API Error";
            LitePrice[3] = "API Error";
        }

        if(errorCoinpaprika)
        {
            LitePricePaprika[0] = "API Error";
            LitePricePaprika[1] = "API Error";
            LitePricePaprika[2] = "API Error";
            LitePricePaprika[3] = "API Error";
        }

        if(errorCoingecko)
        {
            LiteCoinGecko[0] = "API Error";
            LiteCoinGecko[1] = "API Error";
            LiteCoinGecko[2] = "API Error";
            LiteCoinGecko[3] = "API Error";
        }

    });

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Łitecoin Price", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor("#b8b8b8")
    .addField("**CryptoCompare**", "\n\n:euro: **EUR:** *" + LitePrice[0] + "*\n:pound: **GBP:** *" + LitePrice[1] + "*\n:dollar: **USD:** *" + LitePrice[2] + "*\n:yen: **YEN:** *" + LitePrice[3] + "*", true)
    .addField("**🌶️Coin Paprika**", "\n\n :euro: **EUR:** *" + LitePricePaprika[0] + "*\n:pound: **GBP:** *" + LitePricePaprika[1] + "*\n:dollar: **USD:** *" + LitePricePaprika[2] + "*\n:yen: **YEN:** *" + LitePricePaprika[3] + "*", true)
    .addField("**Coin Gecko**", "\n\n :euro: **EUR:** *" + LiteCoinGecko[0] + "*\n:pound: **GBP:** *" + LiteCoinGecko[1] + "*\n:dollar: **USD:** *" + LiteCoinGecko[2] + "*\n:yen: **YEN:** *" + LiteCoinGecko[3] + "*", true)
    .setThumbnail("https://i.imgur.com/mSEzhEJ.png")
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
    .setTimestamp()

    await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
};

module.exports.help =
{
    name: "ltcprice"
};