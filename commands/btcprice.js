
const Discord = require("discord.js");
const getJSON = require("get-json");

const CustomFunctions = require("../functions/funcs.js");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    let BTCUSD;
    let BtcDollar, BtcGBP, BtcEuro, BtcYen;
    let BtcChainDollar, BtcChainGBP, BtcChainEuro, BtcChainYen;

    message.channel.startTyping();

    await getJSON("http://api.bitcoincharts.com/v1/weighted_prices.json").then(async function(response)
    {
        BtcDollar = JSON.stringify(response.USD["24h"]).replace(/"/g, '');
        BtcGBP = JSON.stringify(response.GBP["24h"]).replace(/"/g, '');
        BtcEuro = JSON.stringify(response.EUR["24h"]).replace(/"/g, '');
        BtcYen = JSON.stringify(response.JPY["24h"]).replace(/"/g, '');

    }).catch(async function(error)
    {
        BtcDollar = "API Error";
        BtcGBP = "API Error";
        BtcEuro = "API Error";
        BtcYen = "API Error";
    });

    await getJSON("https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT").then(async function(response1)
    {
        BTCUSD = JSON.stringify(response1.price).replace(/"/g, '');

    }).catch(async function(error)
    {
        BTCUSD = "API Error";
    });

    await getJSON("https://blockchain.info/ticker").then(async function(response2)
    {
        BtcChainDollar = JSON.stringify(response2.USD["15m"]).replace(/"/g, '');
        BtcChainGBP = JSON.stringify(response2.GBP["15m"]).replace(/"/g, '');
        BtcChainEuro = JSON.stringify(response2.EUR["15m"]).replace(/"/g, '');
        BtcChainYen = JSON.stringify(response2.JPY["15m"]).replace(/"/g, '');

    }).catch(async function(error)
    {
        BtcChainDollar = "API Error";
        BtcChainGBP = "API Error";
        BtcChainEuro = "API Error";
        BtcChainYen = "API Error";
    });

    const embed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | ₿itcoin Price", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor("#FFA500")
    .addField("**BitcoinCharts**", "\n\n:euro: **EUR:** *" + BtcEuro + "*\n:pound: **GBP:** *" + BtcGBP + "*\n:dollar: **USD:** *" + BtcDollar + "*\n:yen: **YEN:** *" + BtcYen + "*", true)
    .addField("**BlockChain**", "\n\n :euro: **EUR:** *" + BtcChainEuro + "*\n:pound: **GBP:** *" + BtcChainGBP + "*\n:dollar: **USD:** *" + BtcChainDollar + "*\n:yen: **YEN:** *" + BtcChainYen + "*", true)
    .addBlankField(true)
    .addField("**BINANCE**", "\n\n:dollar: **BTC USDT**: *" + BTCUSD.slice(0, -6) + "*", false)
    .setThumbnail("https://i.imgur.com/kBjbSX9.png")
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
    .setTimestamp()

    await message.channel.send({embed}).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
};

module.exports.help =
{
    name: "btcprice"
};
