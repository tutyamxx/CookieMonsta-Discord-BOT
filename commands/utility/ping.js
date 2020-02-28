const szRandomFetchingMessages =
[
    "Fething ping", "Calculating ping", "Testing ping",
    "Warping to other dimension", ":eyes:", "Exploiting API",
    "Getting some nerdy stuff", "If I was only good at math",
    "Yup, incoming", "Executing metasploit command"
];

module.exports.run = (bot, message, args) =>
{
    const szMessagePing = message.channel.send("<:cookiemonsta:634866060465537034> **|** " + szRandomFetchingMessages[Math.floor(Math.random() * szRandomFetchingMessages.length)] + " :satellite: ...");
    szMessagePing.edit(`<:cookiemonsta:634866060465537034> **|** :ping_pong: Latency is **${szMessagePing.createdTimestamp - message.createdTimestamp}ms**. API Latency is **${Math.round(bot.ping)}ms**`);
};

module.exports.help =
{
    name: "ping"
};