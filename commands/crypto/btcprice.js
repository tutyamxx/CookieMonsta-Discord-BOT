const Discord = require("discord.js");
const getJSON = require("get-json");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    let BitcoinBTCUSDT;
    let BitCoinChartsArray = [];
    let BitCoinChainArray = [];

    message.channel.startTyping();

    await getJSON("http://api.bitcoincharts.com/v1/weighted_prices.json").then(async (response) =>
    {
        BitCoinChartsArray[0] = JSON.stringify(await response.USD["24h"]).replace(/"/g, '');
        BitCoinChartsArray[1] = JSON.stringify(await response.GBP["24h"]).replace(/"/g, '');
        BitCoinChartsArray[2] = JSON.stringify(await response.EUR["24h"]).replace(/"/g, '');
        BitCoinChartsArray[3] = JSON.stringify(await response.JPY["24h"]).replace(/"/g, '');

    }).catch(async (error) =>
    {
        BitCoinChartsArray[0] = "API Error";
        BitCoinChartsArray[0] = "API Error";
        BitCoinChartsArray[0] = "API Error";
        BitCoinChartsArray[0] = "API Error";
    });

    await getJSON("https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT").then(async (response1) =>
    {
        BitcoinBTCUSDT = parseFloat(await response1.price);

    }).catch(async (error) =>
    {
        BitcoinBTCUSDT = "API Error";
    });

    await getJSON("https://blockchain.info/ticker").then(async (response2) =>
    {
        BitCoinChainArray[0] = JSON.stringify(await response2.USD["15m"]).replace(/"/g, '');
        BitCoinChainArray[1] = JSON.stringify(await response2.GBP["15m"]).replace(/"/g, '');
        BitCoinChainArray[2] = JSON.stringify(await response2.EUR["15m"]).replace(/"/g, '');
        BitCoinChainArray[3] = JSON.stringify(await response2.JPY["15m"]).replace(/"/g, '');

    }).catch(async (error) =>
    {
        BitCoinChainArray[0] = "API Error";
        BitCoinChainArray[1] = "API Error";
        BitCoinChainArray[2] = "API Error";
        BitCoinChainArray[3] = "API Error";
    });

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | ₿itcoin Price", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor("#FFA500")
    .addField("**BitcoinCharts**", "\n\n:euro: **EUR:** *" + BitCoinChartsArray[0] + "*\n:pound: **GBP:** *" + BitCoinChartsArray[1] + "*\n:dollar: **USD:** *" + BitCoinChartsArray[2] + "*\n:yen: **YEN:** *" + BitCoinChartsArray[3] + "*", true)
    .addField("**BlockChain**", "\n\n :euro: **EUR:** *" + BitCoinChainArray[0] + "*\n:pound: **GBP:** *" + BitCoinChainArray[1] + "*\n:dollar: **USD:** *" + BitCoinChainArray[2] + "*\n:yen: **YEN:** *" + BitCoinChainArray[3] + "*", true)
    .addBlankField(true)
    .addField("**BINANCE**", "\n\n:dollar: **BTC USDT**: *" + BitcoinBTCUSDT.toFixed(2) + "*", false)
    .setThumbnail("https://i.imgur.com/kBjbSX9.png")
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
    .setTimestamp()

    await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
};

module.exports.help =
{
    name: "btcprice"
};