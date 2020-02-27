const Discord = require("discord.js");
const SteamAPI = require("steamapi");
const SteamRepAPI = require("steamrep");
const CustomFunctions = require("../../functions/funcs.js");
const BotConfig = require("../../config/botconfig.json");

const steam = new SteamAPI(BotConfig.Steam_API_Token.trim());
SteamRepAPI.timeout = 5000;

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!steamrep** ``<Steam username/url/id>`` :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    }

    await message.channel.startTyping();

    await steam.resolve(szArgs[0]).then(async (id) =>
    {
        await SteamRepAPI.isScammer(id, async (error, result) =>
        {
            if(error)
            {
                return await message.channel.send(":no_entry: Sorry, something went wrong while checking if the user is a scammer. Error: `" + error.message + "`").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));;
            }

            else
            {
                if(result)
                {
                    await message.channel.send("This user is a :exclamation: **SCAMMER** :exclamation: on **SteamRep** !").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
                }

                else
                {
                    await message.channel.send("This user is :white_check_mark: **CLEAN** :white_check_mark: on **SteamRep** !").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
                }
            }

        });

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Sorry, I couldn't find this Steam profile: ``" + szArgs[0] + "``  :disappointed_relieved:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "steamrep"
};