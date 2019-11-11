const Discord = require("discord.js");
const Needle = require("needle");
const CustomFunctions = require("../../functions/funcs.js");
const BotConfig = require("../../config/botconfig.json");

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: !Please specify a Destiny2 player name?  :no_entry:");
    }

    message.channel.startTyping();

    const Destiny2RequestOptions = 
    {
        headers: { "X-API-Key": BotConfig.Destiny2_API_Token.trim() }
    };

    Needle.get("https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/" + encodeURIComponent(szArgs[0].trim()) + "/", Destiny2RequestOptions, async (error, response) =>
    {
        if(!error && response.statusCode === 200)
        {
            let PlayerObject = await response.body.Response[0];

            if(PlayerObject === undefined)
            {
                return await message.channel.send(":no_entry: Sorry, I couldn't find this Destiny 2: player ``" + szArgs[0] + "``  :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
            }

            Needle.get("https://www.bungie.net/Platform/Destiny2/" + PlayerObject.membershipType + "/Account/" + PlayerObject.membershipId + "/Stats/?groups=General,Medals", Destiny2RequestOptions, async (error, response_player) =>
            {
                if(!error && response_player.statusCode === 200)
                {
                    const PlayerResultsObject = await response_player.body.Response.mergedAllCharacters.merged.allTime;

                    const PlayerName = PlayerObject.displayName;
                    const PlayerPlayedTime = PlayerResultsObject.secondsPlayed.basic.displayValue;
                    const PlayerEfficiency = PlayerResultsObject.efficiency.basic.displayValue;
                    const PlayerHighestCharacterLevel = PlayerResultsObject.highestCharacterLevel.basic.displayValue;
                    const PlayerHighestLightLevel = PlayerResultsObject.highestLightLevel.basic.displayValue;
                    const PlayerWinLossRatio = PlayerResultsObject.winLossRatio.basic.displayValue;
                    const PlayerCombatRating = PlayerResultsObject.combatRating.basic.displayValue;
                    const PlayerScore = PlayerResultsObject.score.basic.displayValue;
                    const PlayerTeamScore = PlayerResultsObject.teamScore.basic.displayValue;
                    const PlayerKills = PlayerResultsObject.kills.basic.displayValue;
                    const PlayerPrecisionKills = PlayerResultsObject.precisionKills.basic.displayValue;
                    const PlayerAssits = PlayerResultsObject.assists.basic.displayValue;
                    const PlayerDeaths = PlayerResultsObject.deaths.basic.displayValue;
                    const PlayerSuicideDeaths = PlayerResultsObject.suicides.basic.displayValue;
                    const PlayerKDR = PlayerResultsObject.killsDeathsRatio.basic.displayValue;
                    const PlayerKDA = PlayerResultsObject.killsDeathsAssists.basic.displayValue;
                    const PlayerBestWeapon = PlayerResultsObject.weaponBestType.basic.displayValue;
                    const PlayerMedalsEarned = PlayerResultsObject.allMedalsEarned.basic.displayValue;
                    const PlayerObjectivesCompleted = PlayerResultsObject.objectivesCompleted.basic.displayValue;
                    const PlayerAdventuresCompleted = PlayerResultsObject.adventuresCompleted.basic.displayValue;
                    const PlayerHeroicEventsCompleted = PlayerResultsObject.heroicPublicEventsCompleted.basic.displayValue;
                    const PlayerOponentsDefeated = PlayerResultsObject.opponentsDefeated.basic.displayValue;
                    const PlayerResurrectionsPerformed = PlayerResultsObject.resurrectionsPerformed.basic.displayValue;
                    const PlayerSuperKills = PlayerResultsObject.weaponKillsSuper.basic.displayValue;
                    const PlayerLongestKillDistance = PlayerResultsObject.longestKillDistance.basic.displayValue;


                    let szDescription = ":point_right: Destiny 2 Stats for player: **" + PlayerName + "**\n\n" + 
                    "`Records:`\n" +
                    ":video_game: Played for: **" + PlayerPlayedTime + "**\n" +
                    ":rocket: Efficiency: **" + PlayerEfficiency + "**\n" +
                    ":up: Highest Character Level: **" + PlayerHighestCharacterLevel + "**\n" +
                    ":sunny: Highest Light Level: **" + PlayerHighestLightLevel + "**\n" + 
                    ":dart: Win/Loss Ratio: **" + PlayerWinLossRatio + "**\n" + 
                    ":leaves: Resurrections Performed: **" + PlayerResurrectionsPerformed + "**\n\n" +
                    "`Player Stats:`\n" + 
                    ":bar_chart: Combat Rating: **" + PlayerCombatRating + "**\n" + 
                    ":bookmark_tabs: Score: **" + PlayerScore + "** | Team Score: **" + PlayerTeamScore + "**\n" +
                    ":bow_and_arrow: Total Kills: **" + PlayerKills + "**\n" +
                    ":dart: Precision Kills: **" + PlayerPrecisionKills + "**\n" +
                    ":eyes: Assists: **" + PlayerAssits + "**\n" + 
                    ":skull: Deaths: **" + PlayerDeaths + "** | Suicides: **" + PlayerSuicideDeaths + "**\n\n" +
                    "`Shooting Stats:`\n" + 
                    ":chart_with_upwards_trend: Player KDR: **" + PlayerKDR + "**\n" + 
                    ":chart_with_downwards_trend: Player KDA: **" + PlayerKDA + "**\n" + 
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
                    .setFooter("Stats from: BUNGIE.net | Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
                    .setTimestamp()

                    await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
                }
            });
        }

        else
        {
            return await message.channel.send(":no_entry: Sorry, I couldn't find this Destiny 2: player ``" + szArgs[0] + "``  :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }
    });
};

module.exports.help =
{
    name: "destiny2"
};