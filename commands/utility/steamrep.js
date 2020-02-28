const Discord = require("discord.js");
const SteamAPI = require("steamapi");
const SteamRepAPI = require("steamrep");
const CustomFunctions = require("../../functions/funcs.js");
const BotConfig = require("../../config/botconfig.json");

const steam = new SteamAPI(BotConfig.Steam_API_Token.trim());
SteamRepAPI.timeout = 5000;

module.exports.run = (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!steamrep** ``<Steam username/url/id>`` :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    }

    message.channel.startTyping();

    steam.resolve(szArgs[0]).then((id) =>
    {
        SteamRepAPI.isScammer(id, (error, result) =>
        {
            if(!error)
            {
                const bIsUserScammer = (result === true) ? "a :exclamation: **SCAMMER** :exclamation:" : ":white_check_mark: **CLEAN** :white_check_mark:";

                message.channel.send(`This user is ${bIsUserScammer} on **SteamRep** !`).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
            }

            else
            {
                return message.channel.send(":no_entry: Sorry, something went wrong while checking if the user is a scammer. Error: `" + error.message + "`").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
            }
        });

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Sorry, I couldn't find this Steam profile: ``" + szArgs[0] + "``  :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "steamrep"
};