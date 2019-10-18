const Discord = require("discord.js");
const fs = require("fs");
const BotConfig = require("./config/botconfig.json");

const iDiscordClient = new Discord.Client();
exports.iDiscordClient = iDiscordClient;

global.__basedir = __dirname;

iDiscordClient.commands = new Discord.Collection();

const szBotToken = BotConfig.DiscordBOT_Token.trim();

let UserDatabaseData;
exports.UserDatabaseData = UserDatabaseData;

// --| Load our events
fs.readdir("./events/", (err, files) =>
{
    if(err)
    {
        console.error(err);
    }

    files.forEach(file =>
    {
        if(!file.endsWith(".js"))
        {
            return;
        }

        const szEvent = require(`./events/${file}`);
        const szEventName = file.split(".")[0];

        console.log(`\x1b[31m*\x1b[0m Loaded event: \x1b[34m${szEventName}\x1b[0m found in \x1b[32m${file}\x1b[0m event`);

        iDiscordClient.on(szEventName, szEvent.bind(null, iDiscordClient));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

// --| Read our custom commands
fs.readdir("./commands/", (err, files) =>
{
    if(err)
    {
        console.error(err);
    }

    let jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <= 0)
    {
        console.log(`\x1b[31m*\x1b[0m No commands to load! :(\x1b[0m`);
        return;
    }

    let iStart = Date.now();
    console.log(`\x1b[31m*\x1b[0m Loading \x1b[35m${jsFiles.length}\x1b[0m commands!`);

    // --| Add: color list, sound list, horoscope list are extra but in the same cmd file = +3
    // --| Exclude developer commands from public which are: sendnews, guildleave, reloadcmd, reboot = -4
    let iCommandNumber = (jsFiles.length + 3) - 4;
    exports.iCommandNumber = iCommandNumber;

    jsFiles.forEach((f, i) =>
    {
        let iProps = require(`./commands/${f}`);

        iDiscordClient.commands.set(iProps.help.name.toLowerCase(), iProps);
    });

    console.log(`\x1b[31m*\x1b[0m Loaded commands in (\x1b[33m${Date.now() - iStart} ms\x1b[0m)`);
});

// --| Authenticate
iDiscordClient.login(szBotToken);

// --| Debug? xD
process.on("unhandledRejection", (err) =>
{
    console.error(err);
    console.log("\x1b[31m*\x1b[0m \x1b[31mERROR:\x1b[0m \x1b[33munhandledRejection\x1b[0m --> \x1b[31m" + err + "\x1b[0m");
});

process.on("uncaughtException", (err) =>
{
    console.error(err);
    console.log("\x1b[31m*\x1b[0m \x1b[31mERROR:\x1b[0m \x1b[33muncaughtException\x1b[0m --> \x1b[31m" + err + "\x1b[0m");

    // --| Exit the application
    process.exit(1);
});

process.on("exit", (code) =>
{
    console.log("\x1b[31m*\x1b[0m \x1b[31mERROR:\x1b[0m This god damn BOT exit with the code: \x1b[33m" + code + "\x1b[0m");
});