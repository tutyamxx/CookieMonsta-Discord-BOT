const Discord = require("discord.js");
const axios = require("axios");
const SteamAPI = require("steamapi");
const SteamID = require("steamid");
const CustomFunctions = require("../../functions/funcs.js");
const BotConfig = require("../../config/botconfig.json");

const steam = new SteamAPI(BotConfig.Steam_API_Token.trim());

module.exports.run = (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!lastgame** ``<Steam username/url/id>`` :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    }

    message.channel.startTyping();

    steam.resolve(szArgs[0]).then((id) =>
    {
        const SteamAccountID3 = (new SteamID(id)).accountid;

        axios.get("https://api.opendota.com/api/players/" + parseInt(SteamAccountID3)).then((response_player) =>
        {
            if(!response_player.data.hasOwnProperty("profile"))
            {
                return message.channel.send(":no_entry: Sorry, I couldn't retrieve any data from **Open Dota** for this player. Maybe he is a LoL player :joy:?  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
            }

            const DotaPlayerName = response_player.data.profile.personaname;
            const DotaPlayerAvatar = response_player.data.profile.avatarmedium;
            const DotaPlayerSteamProfile = response_player.data.profile.profileurl;

            axios.get("https://api.opendota.com/api/players/" + parseInt(SteamAccountID3) + "/wl").then((response) =>
            {
                const iPlayerTotalWin = parseInt(response.data.win);
                const iPlayerTotalLose = parseInt(response.data.lose);

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

                message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

            }).catch(() =>
            {
                return;
            });

        }).catch(() =>
        {
            return message.channel.send(":no_entry: Sorry, can't retrieve **Open Dota** data right now... Try later. :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        });

    }).catch((error) =>
    {
        return message.channel.send(":no_entry: Sorry, I couldn't find this Steam profile: ``" + szArgs[0] + "``  :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "winrate"
};