const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    let LitePrice = [];
    let LitePricePaprika = [];
    let LiteCoinGecko = [];

    await getJSON("https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD,JPY,EUR,GBP").then(async (response) =>
    {
        LitePrice[0] = await response.EUR;
        LitePrice[1] = await response.GBP;
        LitePrice[2] = await response.USD;
        LitePrice[3] = await response.JPY;

    }).catch(async function (error)
    {
        LitePrice[0] = "API Error";
        LitePrice[1] = "API Error";
        LitePrice[2] = "API Error";
        LitePrice[3] = "API Error";
    });

    await getJSON("https://api.coinpaprika.com/v1/tickers/ltc-litecoin?quotes=gbp,eur,usd,jpy").then(async (response_paprika) =>
    {
        LitePricePaprika[0] = await response_paprika.quotes.EUR.price.toFixed(2);
        LitePricePaprika[1] = await response_paprika.quotes.GBP.price.toFixed(2);
        LitePricePaprika[2] = await response_paprika.quotes.USD.price.toFixed(2);
        LitePricePaprika[3] = await response_paprika.quotes.JPY.price.toFixed(2);;

    }).catch(async function (error)
    {
        LitePricePaprika[0] = "API Error";
        LitePricePaprika[1] = "API Error";
        LitePricePaprika[2] = "API Error";
        LitePricePaprika[3] = "API Error";
    });

    await getJSON("https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=gbp,usd,eur,jpy").then(async (response_gecko) =>
    {
        LiteCoinGecko[0] = await response_gecko.litecoin.eur;
        LiteCoinGecko[1] = await response_gecko.litecoin.gbp;
        LiteCoinGecko[2] = await response_gecko.litecoin.usd;
        LiteCoinGecko[3] = await response_gecko.litecoin.jpy;

    }).catch(async function (error)
    {
        LiteCoinGecko[0] = "API Error";
        LiteCoinGecko[1] = "API Error";
        LiteCoinGecko[2] = "API Error";
        LiteCoinGecko[3] = "API Error";
    });


    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Łitecoin Price", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor("#b8b8b8")
    .addField("**CryptoCompare**", "\n\n:euro: **EUR:** *" + LitePrice[0] + "*\n:pound: **GBP:** *" + LitePrice[1] + "*\n:dollar: **USD:** *" + LitePrice[2] + "*\n:yen: **YEN:** *" + LitePrice[3] + "*", true)
    .addField("**🌶️Coin Paprika**", "\n\n :euro: **EUR:** *" + LitePricePaprika[0] + "*\n:pound: **GBP:** *" + LitePricePaprika[1] + "*\n:dollar: **USD:** *" + LitePricePaprika[2] + "*\n:yen: **YEN:** *" + LitePricePaprika[3] + "*", true)
    .addBlankField(true)
    .addBlankField(true)
    .addField("**Coin Gecko**", "\n\n :euro: **EUR:** *" + LiteCoinGecko[0] + "*\n:pound: **GBP:** *" + LiteCoinGecko[1] + "*\n:dollar: **USD:** *" + LiteCoinGecko[2] + "*\n:yen: **YEN:** *" + LiteCoinGecko[3] + "*", true)
    .setThumbnail("https://i.imgur.com/mSEzhEJ.png")
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
    .setTimestamp()

    await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
};

module.exports.help =
{
    name: "ltcprice"
};