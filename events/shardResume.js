module.exports = (bot, replayed, shardID) =>
{
    console.log(`\x1b[31m*\x1b[0m Shard ID #\x1b[31m${shardID}\x1b[0m resumed connection and replayed \x1b[31${replayed}\x1b[0m events.`);
};