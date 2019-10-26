const Discord = require("discord.js");
const getJSON = require("get-json");
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
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!lastgame** ``<Steam username/url/id>`` :no_entry:");
    }

    message.channel.startTyping();

    await steam.resolve(szArgs[0]).then(async (id) =>
    {
        let SteamAccountID3 = (new SteamID(id)).accountid;

        await getJSON("https://api.opendota.com/api/players/" + parseInt(SteamAccountID3) + "/recentMatches", async function (error, response)
        {
            if(error)
            {
                return await message.channel.send(":no_entry: Sorry, can't retrieve **Open Dota** data right now... Try later. :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
            }

            if(await response[0] === undefined)
            {
                return await message.channel.send(":no_entry: Sorry, I couldn't retrieve any data from **Open Dota** for this player. Maybe he is a LoL player :joy:?  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
            }

            let DotaMatchWon = "";

            const iDotaLastMatchID = parseInt(await response[0].match_id);
            const iDotaPlayerKills = parseInt(await response[0].kills);
            const iDotaPlayerDeaths = parseInt(await response[0].deaths);
            const iDotaPlayerAssists = parseInt(await response[0].assists);
            const iDotaPlayerLastHits = parseInt(await response[0].last_hits);
            const iDotaPlayerSlot = parseInt(await response[0].player_slot);

            const iDotaPlayerHeroDamage = parseInt(await response[0].hero_damage);
            const iDotaPlayerTowerDamage = parseInt(await response[0].tower_damage);
            const iDotaPlayerHeroHealing = parseInt(await response[0].hero_healing);

            const iDotaGameModePlayed = parseInt(await response[0].game_mode);
            const iDotaGameTypePlayed = parseInt(await response[0].lobby_type);
            const iDotaHeroPlayed = parseInt(await response[0].hero_id);
            const iDotaMatchDuration = parseInt(await response[0].duration);
            const iXPPM = parseInt(await response[0].xp_per_min);
            const iGPM = parseInt(await response[0].gold_per_min);

            const bTeamRadiantWin = await response[0].radiant_win;

            const DotaPlayerTeam = CustomFunctions.Dota2_Team_Check(iDotaPlayerSlot);

            // --| Win Condition check - seriously OpenDota what the fuck did you actually smoke ?
            if(bTeamRadiantWin && DotaPlayerTeam === "Radiant")
            {
                DotaMatchWon = "Win :trophy:";
            }

            else if(!bTeamRadiantWin && DotaPlayerTeam === "Radiant")
            {
                DotaMatchWon = "Lost :thumbsdown:";
            }

            else if(bTeamRadiantWin && DotaPlayerTeam === "Dire")
            {
                DotaMatchWon = "Lost :thumbsdown:";
            }

            else if(!bTeamRadiantWin && DotaPlayerTeam === "Dire")
            {
                DotaMatchWon = "Win :trophy:";
            }

            await getJSON("https://api.opendota.com/api/players/" + parseInt(SteamAccountID3), async function (error, response_player)
            {
                if(error)
                {
                    return await message.channel.send(":no_entry: Sorry, can't retrieve **Open Dota** data right now... Try later. :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
                }

                let szHeroName = "Unknown";

                await getJSON("https://api.opendota.com/api/heroes", async function (error, response_hero)
                {
                    if(error)
                    {
                        return;
                    }

                    for(let i = 0; i < await response_hero.length; i++)
                    {
                        if(await response_hero[i].id === iDotaHeroPlayed)
                        {
                            szHeroName = await response_hero[i].localized_name;

                            const DotaPlayerName = await response_player.profile.personaname;
                            const DotaPlayerAvatar = await response_player.profile.avatarmedium;
                            const DotaPlayerSteamProfile = await response_player.profile.profileurl;

                            let szDescription =
                            ":point_right: Last Dota2 Match for player: **[" + DotaPlayerName + "](" + DotaPlayerSteamProfile + ")**\n\n``Match Info:``\n" +
                            ":id:  Match ID: **" + iDotaLastMatchID + "**\n\n" +
                            ":satellite: Game Type: **" + CustomFunctions.Dota2_GameType_Check(iDotaGameTypePlayed) + "**\n" + 
                            ":juggling: Game Mode: **" + CustomFunctions.Dota2_GameMode_Check(iDotaGameModePlayed) + "**\n" + 
                            ":mega: Match Outcome: **" + DotaMatchWon + "**\n" +
                            ":performing_arts: Player Team: **" + DotaPlayerTeam + "**\n" +
                            ":alarm_clock: Match Duration: **" + CustomFunctions.format_time_fancy(iDotaMatchDuration) + "**\n\n``Player Stats:``\n" +
                            ":statue_of_liberty: Hero Played: **" + szHeroName + "**\n" +
                            ":bar_chart: K/D/A: ``" + iDotaPlayerKills + "``/``" + iDotaPlayerDeaths + "``/``" + iDotaPlayerAssists + "`` " + CustomFunctions.Check_Dank_Meme(iDotaPlayerKills, iDotaPlayerDeaths) + "\n\n" +
                            ":stars: XPM (XP Per Minute): **" + iXPPM + "**\n" +
                            ":moneybag: GPM (Gold Per Minute): **" + iGPM + "**\n" +
                            ":anger: Last Hits: **" + iDotaPlayerLastHits + "**\n\n``Damage and Healing:``\n" +
                            ":tokyo_tower: Tower Damage: **" + iDotaPlayerTowerDamage + "**\n" +
                            ":bow_and_arrow: Hero Damage: **" + iDotaPlayerHeroDamage + "**\n" +
                            ":sun_with_face: Hero Healing: **" + iDotaPlayerHeroHealing + "**";

                            const DiscordRichEmbed = new Discord.RichEmbed()
                            .setAuthor("Cookie Monsta | Dota2 Last Game Check", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
                            .setColor((DotaPlayerTeam === "Radiant" ? "#598307" : "#A83806"))
                            .setDescription(szDescription)
                            .setThumbnail(DotaPlayerAvatar)
                            .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

                            await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
                        }
                    }
                });
            });
        });

    }).catch(async (error) =>
    {
        return await message.channel.send(":no_entry: Sorry, I couldn't find this Steam profile: ``" + szArgs[0] + "``  :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "lastgame"
};