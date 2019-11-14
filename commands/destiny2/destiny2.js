const Discord = require("discord.js");
const Needle = require("needle");
const CustomFunctions = require("../../functions/funcs.js");
const BotConfig = require("../../config/botconfig.json");

const Destiny2RequestOptions =
{
    headers: { "X-API-Key": BotConfig.Destiny2_API_Token.trim(), open_timeout: 5000 }
};

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: !Please specify a Destiny2 player name?  :no_entry:");
    }

    message.channel.startTyping();

    Needle.get("https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/" + encodeURIComponent(szArgs[0].trim()) + "/", Destiny2RequestOptions, async (error, response) =>
    {
        if(!error && response.statusCode === 200)
        {
            let PlayerObject = await response.body.Response[0];

            if(PlayerObject === undefined)
            {
                return await message.channel.send(":no_entry: Sorry, I couldn't find this Destiny 2: player ``" + szArgs[0].trim() + "``  :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
            }

            Needle.get("https://www.bungie.net/Platform/Destiny2/" + parseInt(PlayerObject.membershipType) + "/Account/" + PlayerObject.membershipId + "/Stats/?groups=General,Medals", Destiny2RequestOptions, async (error, response_player) =>
            {
                if(!error && response_player.statusCode === 200)
                {
                    const PlayerResultsObject = await response_player.body.Response.mergedAllCharacters.merged.allTime;
                    const szUnknownAPI = "Not Available";

                    const PlayerName = PlayerObject.displayName;
                    const PlayerPlayedTime = (PlayerResultsObject.hasOwnProperty("secondsPlayed")) ? PlayerResultsObject.secondsPlayed.basic.displayValue : szUnknownAPI;
                    const PlayerEfficiency = (PlayerResultsObject.hasOwnProperty("efficiency")) ? PlayerResultsObject.efficiency.basic.displayValue : szUnknownAPI;
                    const PlayerHighestCharacterLevel = (PlayerResultsObject.hasOwnProperty("highestCharacterLevel")) ? PlayerResultsObject.highestCharacterLevel.basic.displayValue : szUnknownAPI;
                    const PlayerHighestLightLevel = (PlayerResultsObject.hasOwnProperty("highestLightLevel")) ? PlayerResultsObject.highestLightLevel.basic.displayValue : szUnknownAPI;
                    const PlayerWinLossRatio = (PlayerResultsObject.hasOwnProperty("winLossRatio")) ? PlayerResultsObject.winLossRatio.basic.displayValue : szUnknownAPI;
                    const PlayerCombatRating = (PlayerResultsObject.hasOwnProperty("combatRating")) ? PlayerResultsObject.combatRating.basic.displayValue : szUnknownAPI;
                    const PlayerScore = (PlayerResultsObject.hasOwnProperty("score")) ? PlayerResultsObject.score.basic.displayValue : szUnknownAPI;
                    const PlayerTeamScore = (PlayerResultsObject.hasOwnProperty("teamScore")) ? PlayerResultsObject.teamScore.basic.displayValue : szUnknownAPI;
                    const PlayerKills = (PlayerResultsObject.hasOwnProperty("kills")) ? PlayerResultsObject.kills.basic.displayValue : szUnknownAPI;
                    const PlayerPrecisionKills = (PlayerResultsObject.hasOwnProperty("precisionKills")) ? PlayerResultsObject.precisionKills.basic.displayValue : szUnknownAPI;
                    const PlayerAssits = (PlayerResultsObject.hasOwnProperty("assists")) ? PlayerResultsObject.assists.basic.displayValue : szUnknownAPI;
                    const PlayerDeaths = (PlayerResultsObject.hasOwnProperty("deaths")) ? PlayerResultsObject.deaths.basic.displayValue : szUnknownAPI;
                    const PlayerSuicideDeaths = (PlayerResultsObject.hasOwnProperty("suicides")) ? PlayerResultsObject.suicides.basic.displayValue : szUnknownAPI;
                    const PlayerKDR = (PlayerResultsObject.hasOwnProperty("killsDeathsRatio")) ? PlayerResultsObject.killsDeathsRatio.basic.displayValue : szUnknownAPI;
                    const PlayerKDA = (PlayerResultsObject.hasOwnProperty("killsDeathsAssists")) ? PlayerResultsObject.killsDeathsAssists.basic.displayValue : szUnknownAPI;
                    const PlayerBestWeapon = (PlayerResultsObject.hasOwnProperty("weaponBestType")) ? PlayerResultsObject.weaponBestType.basic.displayValue : szUnknownAPI;
                    const PlayerMedalsEarned = (PlayerResultsObject.hasOwnProperty("allMedalsEarned")) ? PlayerResultsObject.allMedalsEarned.basic.displayValue : szUnknownAPI;
                    const PlayerObjectivesCompleted = (PlayerResultsObject.hasOwnProperty("objectivesCompleted")) ? PlayerResultsObject.objectivesCompleted.basic.displayValue : szUnknownAPI;
                    const PlayerAdventuresCompleted = (PlayerResultsObject.hasOwnProperty("adventuresCompleted")) ? PlayerResultsObject.adventuresCompleted.basic.displayValue : szUnknownAPI;
                    const PlayerHeroicEventsCompleted = (PlayerResultsObject.hasOwnProperty("heroicPublicEventsCompleted")) ? PlayerResultsObject.heroicPublicEventsCompleted.basic.displayValue : szUnknownAPI;
                    const PlayerOponentsDefeated = (PlayerResultsObject.hasOwnProperty("opponentsDefeated")) ? PlayerResultsObject.opponentsDefeated.basic.displayValue : szUnknownAPI;
                    const PlayerResurrectionsPerformed = (PlayerResultsObject.hasOwnProperty("resurrectionsPerformed")) ? PlayerResultsObject.resurrectionsPerformed.basic.displayValue : szUnknownAPI;
                    const PlayerSuperKills = (PlayerResultsObject.hasOwnProperty("weaponKillsSuper")) ? PlayerResultsObject.weaponKillsSuper.basic.displayValue : szUnknownAPI;
                    const PlayerLongestKillDistance = (PlayerResultsObject.hasOwnProperty("longestKillDistance")) ? PlayerResultsObject.longestKillDistance.basic.displayValue : szUnknownAPI;

                    let PlayerPlatform = "None";

                    switch (parseInt(PlayerObject.membershipType))
                    {
                        case 1: PlayerPlatform = "XBOX"; break;
                        case 2: PlayerPlatform = "PlayStation"; break;
                        case 3: PlayerPlatform = "Steam"; break;
                        case 4: PlayerPlatform = "Blizzard"; break;
                        case 5: PlayerPlatform = "Stadia"; break;
                        case 10: PlayerPlatform = "Demon"; break;
                        case 254: PlayerPlatform = "Bungie"; break;
                    }

                    let szDescription = "Destiny 2 Stats: :point_right: **" + PlayerName + "** | Platform: **" + PlayerPlatform + "**\n\n" +
                    "`Records:`\n" +
                    ":video_game: Played for: **" + PlayerPlayedTime + "**\n" +
                    ":rocket: Efficiency: **" + PlayerEfficiency + "**\n" +
                    ":up: Highest Character Level: **" + PlayerHighestCharacterLevel + "** | Highest Light Level: **" + PlayerHighestLightLevel + "**\n" +
                    ":dart: Win/Loss Ratio: **" + PlayerWinLossRatio + "**\n" +
                    ":leaves: Resurrections Performed: **" + PlayerResurrectionsPerformed + "**\n\n" +
                    "`Player Stats:`\n" +
                    ":bar_chart: Combat Rating: **" + PlayerCombatRating + "**\n" +
                    ":bookmark_tabs: Score: **" + PlayerScore + "** | Team Score: **" + PlayerTeamScore + "**\n" +
                    ":dart: Total Kills: **" + PlayerKills + "** | Precision Kills: **" + PlayerPrecisionKills + "**\n" +
                    ":eyes: Assists: **" + PlayerAssits + "**\n" +
                    ":skull: Deaths: **" + PlayerDeaths + "** | Suicides: **" + PlayerSuicideDeaths + "**\n\n" +
                    "`Shooting Stats:`\n" +
                    ":chart_with_upwards_trend: Player KDR: **" + PlayerKDR + "** | Player KDA: **" + PlayerKDA + "**\n" +
                    ":gun: Best Weapon: **" + PlayerBestWeapon + "**\n" +
                    ":fencer: Oponents Defeated: **" + PlayerOponentsDefeated + "**\n" +
                    ":space_invader: Kills With Super: **" + PlayerSuperKills + "**\n" +
                    ":stars: Longest Kill Distance: **" + PlayerLongestKillDistance + "**\n\n" +
                    "`More Stats:`\n" +
                    ":trophy: Medals Earned: **" + PlayerMedalsEarned + "**\n" +
                    ":flags: Objectives Completed: **" + PlayerObjectivesCompleted + "**\n" +
                    ":biohazard: Adventures Completed: **" + PlayerAdventuresCompleted + "**\n" +
                    ":muscle: Heroic Public Events Completed: **" + PlayerHeroicEventsCompleted + "**";

                    const DiscordRichEmbed = new Discord.RichEmbed()
                    .setAuthor("Cookie Monsta | Destiny 2 Player Stats", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
                    .setColor("#361213")
                    .setDescription(szDescription)
                    .setThumbnail("https://i.imgur.com/xtrhgVj.jpg")
                    .setFooter("Stats from: BUNGIE.net • Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
                    .setTimestamp()

                    await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
                }

                else
                {
                    return await message.channel.send(":no_entry: Sorry, I couldn't find this Destiny 2: player ``" + szArgs[0].trim() + "``  :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
                }
            });
        }

        else
        {
            return await message.channel.send(":no_entry: Sorry, I couldn't find this Destiny 2: player ``" + szArgs[0].trim() + "``  :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }
    });
};

module.exports.help =
{
    name: "destiny2"
};