const Discord = require("discord.js");
const Needle = require("needle");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Please specify a game name to search for.  :no_entry:");
    }

    message.channel.startTyping();

    const ArgumentText = szArgs.join(" ");
    const FormatArgumentText = ArgumentText.replace(/'/g, "").replace(/:/g, "").replace(/;/g, "").replace(/`/g, "").split(" ").join("-");

    Needle.get("https://api.rawg.io/api/games/" + FormatArgumentText, async (error, response) =>
    {
        if(error || await response.body.detail)
        {
            return await message.reply(" :no_entry: Sorry, I couldn't find the game you requested. Could you try simplifying the game name?  :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        const szGameSlug = await response.body.slug.trim();

        Needle.get("https://api.rawg.io/api/games/" + szGameSlug, async (error, response_game) =>
        {
            if(error || await response_game.body.detail)
            {
                return await message.reply(" :no_entry: Sorry, something went wrong during the game processing. Try again later?  :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
            }

            const ResultGame = await response_game.body;
            const ResultGameName = await ResultGame.name_original.toString();
            const ResultGameDeveloper = await ResultGame.developers;
            const ResultGamePublisher = await ResultGame.publishers;
            const ResultGameReleaseDate = await ResultGame.released;
            const ResultGameToBeAnnounced = await ResultGame.tba;
            const ResultGameMetacriticScore = parseInt(await ResultGame.metacritic);
            const ResultGameOfficialWebsite = await ResultGame.website.toString();
            const ResultGameOfficialReddit = await ResultGame.reddit_url.toString();
            const ResultGamePlatorms = await ResultGame.platforms;

            let szPlatforms = [];

            for(let i = 0; i < ResultGamePlatorms.length; i++)
            {
                szPlatforms.push(ResultGamePlatorms[i].platform.name.toString());
            }

            let szDescription = "`Game Information:`\n" + 
            "Game Name: **" + ResultGameName + "**\n" + 
            "Game Developer: **" + (Object.keys(ResultGameDeveloper).length <= 0 ? "Unknown" : ResultGameDeveloper[0].name.toString()) + "**\n" + 
            "Game Publisher: **" + (Object.keys(ResultGamePublisher).length <= 0 ? "Unknown" : ResultGamePublisher[0].name.toString()) + "**\n" + 
            "Release Date: **" + (ResultGameToBeAnnounced === true ? "TBA (To Be Announced)" : (ResultGameReleaseDate === null ? "" : ResultGameReleaseDate.toString())) + "**\n" +
            "Metacritic Score: **" + (isNaN(ResultGameMetacriticScore) ? "No Score" : ResultGameMetacriticScore) + "**\n\n" + 
            "`Game Platforms:`\n" + szPlatforms.join(", ") + "\n\n" +
            "`Game Webpages:`\n" +
            "Game Website: " + (CustomFunctions.isEmpty(ResultGameOfficialWebsite) ? "None.\n" : "[Official Website](" + ResultGameOfficialWebsite + ")\n") +
            (CustomFunctions.isEmpty(ResultGameOfficialReddit) ? "\n" : "Reddit Page: [Official Reddit](" + ResultGameOfficialReddit + ")\n");

            const DiscordRichEmbed = new Discord.RichEmbed()
            .setAuthor("Cookie Monsta | Game Genie", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
            .setColor("#C9DBED")
            .setDescription(szDescription)
            .setThumbnail("https://i.imgur.com/NWbb94q.png")
            .attachFile({ attachment: (await ResultGame.background_image === null ? "https://i.imgur.com/udvekQS.png" : await ResultGame.background_image), name: "game_background.png" })
            .setImage("attachment://game_background.png")
            .setFooter("Stats from: RAWG.io • Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

            await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "game"
};