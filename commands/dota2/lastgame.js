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
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!lastgame** ``<Steam username/url/id>`` :no_entry:");
    }

    await message.channel.startTyping();

    await steam.resolve(szArgs[0]).then(async (id) =>
    {
        let SteamAccountID3 = (new SteamID(id)).accountid;

        await axios.get("https://api.opendota.com/api/players/" + parseInt(SteamAccountID3) + "/recentMatches").then(async (response) =>
        {
            const PlayerResponseData = await response.data[0];

            if(PlayerResponseData === undefined || PlayerResponseData.length <= 0)
            {
                return await message.channel.send(":no_entry: Sorry, I couldn't retrieve any data from **Open Dota** for this player. Maybe he is a LoL player :joy:?  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
            }

            let DotaMatchWon = "";

            const iDotaLastMatchID = parseInt(PlayerResponseData.match_id);
            const iDotaPlayerKills = parseInt(PlayerResponseData.kills);
            const iDotaPlayerDeaths = parseInt(PlayerResponseData.deaths);
            const iDotaPlayerAssists = parseInt(PlayerResponseData.assists);
            const iDotaPlayerLastHits = parseInt(PlayerResponseData.last_hits);
            const iDotaPlayerSlot = parseInt(PlayerResponseData.player_slot);
            const iDotaPlayerLanePlayed = parseInt(PlayerResponseData.lane_role);
            const iDotaPlayerHeroDamage = (PlayerResponseData.hero_damage === null ? "API Error" : parseInt(PlayerResponseData.hero_damage));
            const iDotaPlayerTowerDamage = (PlayerResponseData.tower_damage === null ? "API Error" : parseInt(PlayerResponseData.tower_damage));
            const iDotaPlayerHeroHealing = (PlayerResponseData.hero_healing === null ? "API Error" : parseInt(PlayerResponseData.hero_healing));

            const iDotaGameModePlayed = parseInt(PlayerResponseData.game_mode);
            const iDotaGameTypePlayed = parseInt(PlayerResponseData.lobby_type);
            const iDotaHeroPlayed = parseInt(PlayerResponseData.hero_id);

            const iDotaMatchDuration = parseInt(PlayerResponseData.duration);
            const iXPPM = parseInt(PlayerResponseData.xp_per_min);
            const iGPM = parseInt(PlayerResponseData.gold_per_min);

            const bTeamRadiantWin = PlayerResponseData.radiant_win;
            const iDotaPlayerRoaming = (PlayerResponseData.is_roaming === null ? "API Error" : PlayerResponseData.is_roaming);

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

            await axios.get("https://api.opendota.com/api/players/" + parseInt(SteamAccountID3)).then(async (response_player) =>
            {
                let szHeroName = "Unknown";

                await axios.get("https://api.opendota.com/api/heroes").then(async (response_hero) =>
                {
                    for(let i = 0; i < await response_hero.data.length; i++)
                    {
                        if(await response_hero.data[i].id === iDotaHeroPlayed)
                        {
                            szHeroName = await response_hero.data[i].localized_name;

                            const DotaPlayerName = await response_player.data.profile.personaname;
                            const DotaPlayerAvatar = await response_player.data.profile.avatarmedium;
                            const DotaPlayerSteamProfile = await response_player.data.profile.profileurl;

                            let szDescription =
                            ":point_right: Last Dota2 Match for player: **[" + DotaPlayerName + "](" + DotaPlayerSteamProfile + ")**\n\n``Match Info:``\n" +
                            ":id:  Match ID: **" + iDotaLastMatchID + "**\n\n" +
                            ":satellite: Game Type: **" + CustomFunctions.Dota2_GameType_Check(iDotaGameTypePlayed) + "**\n" +
                            ":juggling: Game Mode: **" + CustomFunctions.Dota2_GameMode_Check(iDotaGameModePlayed) + "**\n" +
                            ":mega: Match Outcome: **" + DotaMatchWon + "**\n" +
                            ":performing_arts: Player Team: **" + DotaPlayerTeam + "**\n" +
                            ":alarm_clock: Match Duration: **" + CustomFunctions.format_time_fancy(iDotaMatchDuration) + "**\n\n``Player Stats:``\n" +
                            ":statue_of_liberty: Hero Played: **" + szHeroName + "**\n" +
                            ":map: Lane Played: **" + (iDotaPlayerRoaming === true ? "Roaming" : CustomFunctions.Dota2_ConvertToLaneRole(iDotaPlayerLanePlayed)) + " **\n" +
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

                            await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
                        }
                    }
                });

            }).catch(async () =>
            {
                return await message.channel.send(":no_entry: Sorry, can't retrieve **Open Dota** data right now... Try later. :disappointed_relieved:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
            });

        }).catch(async () =>
        {
            return await message.channel.send(":no_entry: Sorry, can't retrieve **Open Dota** data right now... Try later. :disappointed_relieved:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
        });

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Sorry, I couldn't find this Steam profile: ``" + szArgs[0] + "``  :disappointed_relieved:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "lastgame"
};