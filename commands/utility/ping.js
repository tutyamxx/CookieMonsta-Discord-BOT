module.exports.run = async (bot, message, args) =>
{
    const m = await message.channel.send("Ping?");
    await m.edit(`Pong! :ping_pong: Latency is **${m.createdTimestamp - message.createdTimestamp}ms**. API Latency is **${Math.round(bot.ping)}ms**`);
};

module.exports.help =
{
    name: "ping"
};