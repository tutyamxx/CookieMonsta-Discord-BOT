module.exports = async (event) =>
{
    console.log(`\x1b[31m*\x1b[0m Disconnected with code \x1b[31m${event.code}\x1b[0m !`);
    process.exit(0);
};