const Discord = require("discord.js");
const axios = require("axios");
const SteamAPI = require("steamapi");
const SteamID = require("steamid");
const CustomFunctions = require("../../functions/funcs.js");
const BotConfig = require("../../config/botconfig.json");

const steam = new SteamAPI(BotConfig.Steam_API_Token.trim());

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!lastgame** ``<Steam username/url/id>`` :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    }

    await message.channel.startTyping();

    await steam.resolve(szArgs[0]).then(async (id) =>
    {
        const SteamAccountID3 = (new SteamID(id)).accountid;

        await axios.get("https://api.opendota.com/api/players/" + parseInt(SteamAccountID3)).then(async (response_player) =>
        {
            if(!await response_player.data.hasOwnProperty("profile"))
            {
                return await message.channel.send(":no_entry: Sorry, I couldn't retrieve any data from **Open Dota** for this player. Maybe he is a LoL player :joy:?  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
            }

            const DotaPlayerName = await response_player.data.profile.personaname;
            const DotaPlayerAvatar = await response_player.data.profile.avatarmedium;
            const DotaPlayerSteamProfile = await response_player.data.profile.profileurl;

            await axios.get("https://api.opendota.com/api/players/" + parseInt(SteamAccountID3) + "/wl").then(async (response) =>
            {
                const iPlayerTotalWin = parseInt(await response.data.win);
                const iPlayerTotalLose = parseInt(await response.data.lose);

                const iPlayerTotalMatchesPlayed = iPlayerTotalWin + iPlayerTotalLose;
                const iPlayerWinrate = CustomFunctions.Dota2_CalculateWinrate(iPlayerTotalWin, iPlayerTotalLose);

                let szWhatChart = (iPlayerWinrate < 50) ? ":chart_with_downwards_trend:" : ":chart_with_upwards_trend:";

                let szDescription =
                ":point_right: Dota2 Winrate for player: **[" + DotaPlayerName + "](" + DotaPlayerSteamProfile + ")**\n\n" +
                "``Player Overall Stats:``\n\n" +
                ":trophy: Win: **" + iPlayerTotalWin + "**\n" +
                ":rage: Lose: **" + iPlayerTotalLose + "**\n" +
                ":dart: Total Matches: **" + iPlayerTotalMatchesPlayed + "**\n\n" +
                szWhatChart + " Winrate: **" + iPlayerWinrate + "%**\n\n\n``Attention:``\n" +
                "These stats might be outdated or incorrect.\nThey are taken from **Open Dota**.";

                const DiscordRichEmbed = new Discord.RichEmbed()
                .setAuthor("Cookie Monsta | Dota2 Player Winrate", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
                .setColor("#257DAE")
                .setDescription(szDescription)
                .setThumbnail(DotaPlayerAvatar)
                .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

                await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

            }).catch(async () =>
            {
                return;
            });

        }).catch(async () =>
        {
            return await message.channel.send(":no_entry: Sorry, can't retrieve **Open Dota** data right now... Try later. :disappointed_relieved:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
        });

    }).catch(async (error) =>
    {
        return await message.channel.send(":no_entry: Sorry, I couldn't find this Steam profile: ``" + szArgs[0] + "``  :disappointed_relieved:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "winrate"
};