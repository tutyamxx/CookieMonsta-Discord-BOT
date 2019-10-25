const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    let EthereumPrice = [];
    let EthereumPricePaprika = [];
    let EthereumCoinGecko = [];

    await getJSON("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,JPY,EUR,GBP").then(async (response) =>
    {
        EthereumPrice[0] = await response.EUR;
        EthereumPrice[1] = await response.GBP;
        EthereumPrice[2] = await response.USD;
        EthereumPrice[3] = await response.JPY;

    }).catch(async function (error)
    {
        EthereumPrice[0] = "API Error";
        EthereumPrice[1] = "API Error";
        EthereumPrice[2] = "API Error";
        EthereumPrice[3] = "API Error";
    });

    await getJSON("https://api.coinpaprika.com/v1/tickers/eth-ethereum?quotes=gbp,eur,usd,jpy").then(async (response_paprika) =>
    {
        EthereumPricePaprika[0] = await response_paprika.quotes.EUR.price.toFixed(2);
        EthereumPricePaprika[1] = await response_paprika.quotes.GBP.price.toFixed(2);
        EthereumPricePaprika[2] = await response_paprika.quotes.USD.price.toFixed(2);
        EthereumPricePaprika[3] = await response_paprika.quotes.JPY.price.toFixed(2);

    }).catch (async function (error)
    {
        EthereumPricePaprika[0] = "API Error";
        EthereumPricePaprika[1] = "API Error";
        EthereumPricePaprika[2] = "API Error";
        EthereumPricePaprika[3] = "API Error";
    });

    await getJSON("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=gbp,usd,eur,jpy").then(async (response_gecko) =>
    {
        EthereumCoinGecko[0] = await response_gecko.ethereum.eur;
        EthereumCoinGecko[1] = await response_gecko.ethereum.gbp;
        EthereumCoinGecko[2] = await response_gecko.ethereum.usd;
        EthereumCoinGecko[3] = await response_gecko.ethereum.jpy;

    }).catch(async function (error)
    {
        EthereumCoinGecko[0] = "API Error";
        EthereumCoinGecko[1] = "API Error";
        EthereumCoinGecko[2] = "API Error";
        EthereumCoinGecko[3] = "API Error";
    });

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Ξthereum Price", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor("##3c3c3d")
    .addField("**CryptoCompare**", "\n\n:euro: **EUR:** *" + EthereumPrice[0] + "*\n:pound: **GBP:** *" + EthereumPrice[1] + "*\n:dollar: **USD:** *" + EthereumPrice[2] + "*\n:yen: **YEN:** *" + EthereumPrice[3] + "*", true)
    .addField("**🌶️Coin Paprika**", "\n\n :euro: **EUR:** *" + EthereumPricePaprika[0] + "*\n:pound: **GBP:** *" + EthereumPricePaprika[1] + "*\n:dollar: **USD:** *" + EthereumPricePaprika[2] + "*\n:yen: **YEN:** *" + EthereumPricePaprika[3] + "*", true)
    .addBlankField(true)
    .addBlankField(true)
    .addField("**Coin Gecko**", "\n\n :euro: **EUR:** *" + EthereumCoinGecko[0] + "*\n:pound: **GBP:** *" + EthereumCoinGecko[1] + "*\n:dollar: **USD:** *" + EthereumCoinGecko[2] + "*\n:yen: **YEN:** *" + EthereumCoinGecko[3] + "*", true)
    .setThumbnail("https://i.imgur.com/SKVol5l.png")
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
    .setTimestamp()

    await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
};

module.exports.help =
{
    name: "ethprice"
};