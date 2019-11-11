const Discord = require("discord.js");
const fs = require("fs");
const BotConfig = require("./config/botconfig.json");

const szBotToken = BotConfig.DiscordBOT_Token.trim();

const iDiscordClient = new Discord.Client();
exports.iDiscordClient = iDiscordClient;

iDiscordClient.commands = new Discord.Collection();

let UserDatabaseData;
exports.UserDatabaseData = UserDatabaseData;

let iCommandNumber = 0;
let iCountCommandsUsed = 0;
global.iCountCommandsUsed = iCountCommandsUsed;

global.__basedir = __dirname;

// --| Load our events
fs.readdir("./events/", (err, files) =>
{
    console.log("\x1b[31m*\x1b[0m Trying to load all the \x1b[34mevents\x1b[0m from \x1b[32m./events/\x1b[0m folder and all the \x1b[34mcommands\x1b[0m from \x1b[32m./commands/\x1b[0m folder.\n");

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

const szCommandFolders = 
[
    "administrator", "animals", "dev",
    "fun", "games", "help", 
    "jokes", "memes", "utility", 
    "dota2", "crypto", "destiny2"
];

szCommandFolders.forEach((command) =>
{
    fs.readdir(`./commands/${command}/`, (err, files) =>
    {
        if(err)
        {
            console.error(err);
        }

        if(files.length > 0)
        {
            console.log(`\x1b[31m*\x1b[0m Loaded \x1b[33m${files.length}\x1b[0m commands from \x1b[32m./${command}/\x1b[0m folder.`);

            files.forEach((file, count) =>
            {
                // --| Add: color list, sound list, horoscope list are extra but in the same cmd file = +3
                // --| Exclude developer commands from public which are: sendnews, guildleave, reloadcmd, guildlist, refreshbanner and reboot = -6
                iCommandNumber++;
                exports.iCommandNumber = (iCommandNumber + 3) - 5;

                let iProps = require(`./commands/${command}/${file}`);
                iDiscordClient.commands.set(iProps.help.name.toLowerCase(), iProps);
            });
        }
    });
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