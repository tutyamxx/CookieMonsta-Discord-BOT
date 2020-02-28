const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    let EthereumPrice = [];
    let EthereumPricePaprika = [];
    let EthereumCoinGecko = [];

    await axios.all(
    [
        axios.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,JPY,EUR,GBP"),
        axios.get("https://api.coinpaprika.com/v1/tickers/eth-ethereum?quotes=gbp,eur,usd,jpy"),
        axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=gbp,usd,eur,jpy")

    ]).then(await axios.spread((ResponseCryptocompare, ResponseCoinpaprika, ResponseCoingecko) =>
    {
        if(ResponseCryptocompare)
        {
            EthereumPrice[0] = ResponseCryptocompare.data.EUR;
            EthereumPrice[1] = ResponseCryptocompare.data.GBP;
            EthereumPrice[2] = ResponseCryptocompare.data.USD;
            EthereumPrice[3] = ResponseCryptocompare.data.JPY;
        }

        if(ResponseCoinpaprika)
        {
            EthereumPricePaprika[0] = ResponseCoinpaprika.data.quotes.EUR.price.toFixed(2);
            EthereumPricePaprika[1] = ResponseCoinpaprika.data.quotes.GBP.price.toFixed(2);
            EthereumPricePaprika[2] = ResponseCoinpaprika.data.quotes.USD.price.toFixed(2);
            EthereumPricePaprika[3] = ResponseCoinpaprika.data.quotes.JPY.price.toFixed(2);
        }

        if(ResponseCoingecko)
        {
            EthereumCoinGecko[0] = ResponseCoingecko.data.ethereum.eur;
            EthereumCoinGecko[1] = ResponseCoingecko.data.ethereum.gbp;
            EthereumCoinGecko[2] = ResponseCoingecko.data.ethereum.usd;
            EthereumCoinGecko[3] = ResponseCoingecko.data.ethereum.jpy;
        }

    })).catch((errorCryptocompare, errorCoinpaprika, errorCoingecko) =>
    {
        if(errorCryptocompare)
        {
            EthereumPrice[0] = "API Error";
            EthereumPrice[1] = "API Error";
            EthereumPrice[2] = "API Error";
            EthereumPrice[3] = "API Error";
        }

        if(errorCoinpaprika)
        {
            EthereumPricePaprika[0] = "API Error";
            EthereumPricePaprika[1] = "API Error";
            EthereumPricePaprika[2] = "API Error";
            EthereumPricePaprika[3] = "API Error";
        }

        if(errorCoingecko)
        {
            EthereumCoinGecko[0] = "API Error";
            EthereumCoinGecko[1] = "API Error";
            EthereumCoinGecko[2] = "API Error";
            EthereumCoinGecko[3] = "API Error";
        }
    });

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Ξthereum Price", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor("#3c3c3d")
    .addField("**CryptoCompare**", "\n\n:euro: **EUR:** *" + EthereumPrice[0] + "*\n:pound: **GBP:** *" + EthereumPrice[1] + "*\n:dollar: **USD:** *" + EthereumPrice[2] + "*\n:yen: **YEN:** *" + EthereumPrice[3] + "*", true)
    .addField("**🌶️Coin Paprika**", "\n\n :euro: **EUR:** *" + EthereumPricePaprika[0] + "*\n:pound: **GBP:** *" + EthereumPricePaprika[1] + "*\n:dollar: **USD:** *" + EthereumPricePaprika[2] + "*\n:yen: **YEN:** *" + EthereumPricePaprika[3] + "*", true)
    .addField("**Coin Gecko**", "\n\n :euro: **EUR:** *" + EthereumCoinGecko[0] + "*\n:pound: **GBP:** *" + EthereumCoinGecko[1] + "*\n:dollar: **USD:** *" + EthereumCoinGecko[2] + "*\n:yen: **YEN:** *" + EthereumCoinGecko[3] + "*", true)
    .setThumbnail("https://i.imgur.com/SKVol5l.png")
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
    .setTimestamp()

    message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
};

module.exports.help =
{
    name: "ethprice"
};