const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");
const BotConfig = require("../../config/botconfig.json");

module.exports.run = (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Please specify an Apex Legends player name?  :no_entry:");
    }

    if(CustomFunctions.isEmpty(szArgs[1]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Please specify a platform name such as: `PS4`, `XBOX` or `PC` !  :no_entry:");
    }

    const user = message.author;
    const szApexPlayer = szArgs[0].trim();
    const szApexPlatform = szArgs[1].trim();

    message.channel.startTyping();

    if(szApexPlatform.toLowerCase() === "pc" || szApexPlatform.toLowerCase() === "xbox" || szApexPlatform.toLowerCase() === "ps4")
    {
        axios.get(`https://api.mozambiquehe.re/bridge?version=2&platform=${szApexPlatform.toLowerCase() === "xbox" ? "X1" : szApexPlatform.toUpperCase()}&player=${szApexPlayer}&auth=${BotConfig.ApexLegendsAPI_Key.trim()}`).then((response) =>
        {
            if(response.status === 200)
            {
                const ResultResponse = response.data;

                const PlayerUserName = ResultResponse.global.name;
                const PlayerPlatform = ResultResponse.global.platform.toUpperCase() === "X1" ? "XBOX" : ResultResponse.global.platform.toUpperCase();
                const PlayerLevel = parseInt(ResultResponse.global.level);
                const PlayerPercentNext = parseInt(ResultResponse.global.toNextLevelPercent);
                const PlayerRank = ResultResponse.global.rank.rankName + " " + parseInt(ResultResponse.global.rank.rankDiv);
                const PlayerLobbyState = ResultResponse.realtime.lobbyState.toString();
                const PlayerIsOnline = ResultResponse.realtime.isOnline === 0 ? "Offline" : "Online";
                const PlayerIsInGame = ResultResponse.realtime.isInGame === 0 ? "Not in game" : "Currently playing";
                const PlayerLegend = ResultResponse.realtime.selectedLegend.toString();
                const PlayerTotalKills = parseInt(ResultResponse.total.kills.value);

                let szDescription = "`Apex Legends Stats:`\n" +
                ":bust_in_silhouette: Player Name: **" + PlayerUserName + "**\n" +
                ":desktop: Platform: **" + PlayerPlatform + "**\n" +
                ":trophy: Rank: **" + PlayerRank + "**\n" +
                ":dart: Level: **" + PlayerLevel + "** `|` Level Progress: **(`" + PlayerPercentNext + "%`)**\n" +
                ":gun: Total Kills: **" + PlayerTotalKills + "**\n" +
                (ResultResponse.total.hasOwnProperty("damage") ? ":boom: Total Damage: **" + parseInt(ResultResponse.total.damage.value) + "**\n" : "") +
                (ResultResponse.total.hasOwnProperty("kills_as_kill_leader") ? ":smiling_imp: Kills as Kill Leader: **" + parseInt(ResultResponse.total.kills_as_kill_leader.value) + "**\n" : "") +
                ":tickets: Selected Legend: **" + PlayerLegend + "**\n\n" +
                "`Real Time Stats:`\n" +
                ":family_mmb: Lobby State: **" + CustomFunctions.capitalizeFirstLetter(PlayerLobbyState) + "**\n" +
                ":satellite: Current Status: **" + PlayerIsOnline + "**\n" +
                ":video_game: Play Status: **" + PlayerIsInGame + "**";

                const DiscordRichEmbed = new Discord.MessageEmbed()
                .setAuthor("Cookie Monsta | Apex Legends Player Stats", bot.user.displayAvatarURL())
                .setColor("#EC671D")
                .setDescription(szDescription)
                .setThumbnail(`https://trackercdn.com/cdn/apex.tracker.gg/legends/${PlayerLegend.toLowerCase()}-tile.png`)
                .setFooter("Requested by: @" + user.username, user.displayAvatarURL())
                .setTimestamp()

                message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
            }

        }).catch(() =>
        {
            return message.channel.send(":no_entry: Sorry, I couldn't find this Apex Legends player: `" + szApexPlayer + "` on the: `" + szApexPlatform.toUpperCase() + "` platform! :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        });
    }

    else
    {
        return message.reply(" :no_entry: eyy, wrong parameter specified! Please specify a platform name such as: `PS4`, `XBOX` or `PC` !  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    }
};

module.exports.help =
{
    name: "apexlegends"
};