module.exports = (error) =>
{
    console.log("\x1b[31m*\x1b[0m Client error:\n\n\x1b[31m " + err.stack + "\x1b[0m");
};