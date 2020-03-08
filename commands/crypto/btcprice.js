const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    let BitcoinBTCUSDT;
    let BitCoinChartsArray = [];
    let BitCoinChainArray = [];

    message.channel.startTyping();

    await axios.all(
    [
        axios.get("http://api.bitcoincharts.com/v1/weighted_prices.json"),
        axios.get("https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT"),
        axios.get("https://blockchain.info/ticker")

    ]).then(await axios.spread((ResponseBitcoincharts, ResponseBinance, ResponseBlockchain) =>
    {
        if(ResponseBitcoincharts)
        {
            BitCoinChartsArray[0] = JSON.stringify(ResponseBitcoincharts.data.USD["24h"]).replace(/"/g, "");
            BitCoinChartsArray[1] = JSON.stringify(ResponseBitcoincharts.data.GBP["24h"]).replace(/"/g, "");
            BitCoinChartsArray[2] = JSON.stringify(ResponseBitcoincharts.data.EUR["24h"]).replace(/"/g, "");
            BitCoinChartsArray[3] = JSON.stringify(ResponseBitcoincharts.data.JPY["24h"]).replace(/"/g, "");
        }

        if(ResponseBinance)
        {
            BitcoinBTCUSDT = parseFloat(ResponseBinance.data.price);
        }

        if(ResponseBlockchain)
        {
            BitCoinChainArray[0] = JSON.stringify(ResponseBlockchain.data.USD["15m"]).replace(/"/g, "");
            BitCoinChainArray[1] = JSON.stringify(ResponseBlockchain.data.GBP["15m"]).replace(/"/g, "");
            BitCoinChainArray[2] = JSON.stringify(ResponseBlockchain.data.EUR["15m"]).replace(/"/g, "");
            BitCoinChainArray[3] = JSON.stringify(ResponseBlockchain.data.JPY["15m"]).replace(/"/g, "");
        }

    })).catch((errorBitcoincharts, errorBinance, errorBlockchain) =>
    {
        if(errorBitcoincharts)
        {
            BitCoinChartsArray[0] = "API Error";
            BitCoinChartsArray[1] = "API Error";
            BitCoinChartsArray[2] = "API Error";
            BitCoinChartsArray[3] = "API Error";
        }

        if(errorBinance)
        {
            BitcoinBTCUSDT = "API Error";
        }

        if(errorBlockchain)
        {
            BitCoinChainArray[0] = "API Error";
            BitCoinChainArray[1] = "API Error";
            BitCoinChainArray[2] = "API Error";
            BitCoinChainArray[3] = "API Error";
        }
    });

    const DiscordRichEmbed = new Discord.MessageEmbed()
    .setAuthor("Cookie Monsta | ₿itcoin Price", bot.user.displayAvatarURL())
    .setColor("#FFA500")
    .addField("**BitcoinCharts**", "\n\n:euro: **EUR:** *" + BitCoinChartsArray[0] + "*\n:pound: **GBP:** *" + BitCoinChartsArray[1] + "*\n:dollar: **USD:** *" + BitCoinChartsArray[2] + "*\n:yen: **YEN:** *" + BitCoinChartsArray[3] + "*", true)
    .addField("**BlockChain**", "\n\n :euro: **EUR:** *" + BitCoinChainArray[0] + "*\n:pound: **GBP:** *" + BitCoinChainArray[1] + "*\n:dollar: **USD:** *" + BitCoinChainArray[2] + "*\n:yen: **YEN:** *" + BitCoinChainArray[3] + "*", true)
    .addField("\u200b", "\u200b", false)
    .addField("**BINANCE**", "\n\n:dollar: **BTC USDT**: *" + BitcoinBTCUSDT.toFixed(2) + "*", false)
    .setThumbnail("https://i.imgur.com/kBjbSX9.png")
    .setFooter("Requested by: @" + user.username, user.displayAvatarURL())
    .setTimestamp()

    message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
};

module.exports.help =
{
    name: "btcprice"
};