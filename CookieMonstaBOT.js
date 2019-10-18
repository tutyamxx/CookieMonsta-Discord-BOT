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

        console.log(`[+] Log Report [+] --> Loaded event: [${szEventName}] found in (${file}) event`);

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
        console.log(`[+] Log Report [+] --> No commands to load! :(`);
        return;
    }

    let iStart = Date.now();
    console.log(`[+] Log Report [+] --> Loading [${jsFiles.length}] commands!`);

    // Add: color list, sound list, horoscope list are extra but in the same cmd file = +3
    // exclude developer commands from public which are: sendnews, guildleave, reloadcmd, reboot = -4
    let iCommandNumber = (jsFiles.length + 3) - 4;
    exports.iCommandNumber = iCommandNumber;

    jsFiles.forEach((f, i) =>
    {
        let iProps = require(`./commands/${f}`);

        iDiscordClient.commands.set(iProps.help.name.toLowerCase(), iProps);
    });

    console.log(`[+] Log Report [+] --> Loaded commands in (${Date.now() - iStart}) ms.`);
});

iDiscordClient.login(szBotToken);

// --| Debug? xD
process.on('unhandledRejection', console.error);
process.on('uncaughtException', (err) => { console.log(err); });
process.on('exit', (code) => { console.log(`This god damn BOT is about to exit with the code: [${code}]`); });