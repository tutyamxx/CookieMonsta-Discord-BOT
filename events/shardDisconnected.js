module.exports = (event, shardID) =>
{
    console.log(`\x1b[31m*\x1b[0m Disconnected with code \x1b[31m${event.code}\x1b[0m on shard with ID #\x1b[31m${shardID}\x1b[0m !`);
    process.exit(0);
};