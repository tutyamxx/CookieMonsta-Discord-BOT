const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Please specify a game name to search for.  :no_entry:");
    }

    message.channel.startTyping();

    const ArgumentText = szArgs.join(" ");
    const FormatArgumentText = ArgumentText.replace(/'/g, "").replace(/:/g, "").replace(/;/g, "").replace(/`/g, "").split(" ").join("-");

    axios.get("https://api.rawg.io/api/games/" + FormatArgumentText).then((response) =>
    {
        if(response.data.detail)
        {
            return message.reply(" :no_entry: Sorry, I couldn't find the game you requested. Could you try simplifying the game name?  :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        }

        const szGameSlug = response.data.slug.trim();

        axios.get("https://api.rawg.io/api/games/" + szGameSlug).then((response_game) =>
        {
            if(response_game.data.detail)
            {
                return message.reply(" :no_entry: Sorry, something went wrong during the game processing. Try again later?  :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
            }

            const ResultGame = response_game.data;
            const ResultGameName = ResultGame.name_original.toString();
            const ResultGameDeveloper = ResultGame.developers;
            const ResultGamePublisher = ResultGame.publishers;
            const ResultGameReleaseDate = ResultGame.released;
            const ResultGameToBeAnnounced = ResultGame.tba;
            const ResultGameMetacriticScore = parseInt(ResultGame.metacritic);
            const ResultGameOfficialWebsite = ResultGame.website.toString();
            const ResultGameOfficialReddit = ResultGame.reddit_url.toString();
            const ResultGamePlatorms = ResultGame.platforms;
            const ResultGameStores = ResultGame.stores;

            let szPlatforms = [];
            let szAvailableStores = [];

            for(let i = 0; i < ResultGamePlatorms.length; i++)
            {
                szPlatforms.push(ResultGamePlatorms[i].platform.name.toString());
            }

            for(let j = 0; j < ResultGameStores.length; j++)
            {
                szAvailableStores.push(ResultGameStores[j].store.name.toString());
            }

            let szDescription = (CustomFunctions.isEmpty(ResultGameOfficialWebsite) ? "" : "[Official Website](" + ResultGameOfficialWebsite + ") ") +
            (CustomFunctions.isEmpty(ResultGameOfficialReddit) ? "" : "• [Official Reddit](" + ResultGameOfficialReddit + ")") +
            "\n\n" + "`Game Information:`\n" +
            "Game Name: **" + ResultGameName + "**\n" +
            "Game Developer: **" + (Object.keys(ResultGameDeveloper).length <= 0 ? "Unknown" : ResultGameDeveloper[0].name.toString()) + "**\n" +
            "Game Publisher: **" + (Object.keys(ResultGamePublisher).length <= 0 ? "Unknown" : ResultGamePublisher[0].name.toString()) + "**\n" +
            "Release Date: **" + (ResultGameToBeAnnounced === true ? "TBA (To Be Announced)" : (ResultGameReleaseDate === null ? "Unknown" : ResultGameReleaseDate.toString())) + "**\n" +
            "Metacritic Score: **" + (isNaN(ResultGameMetacriticScore) ? "No Score" : ResultGameMetacriticScore) + "**";

            const DiscordRichEmbed = new Discord.MessageEmbed()
            .setAuthor("Cookie Monsta | Game Genie", bot.user.displayAvatarURL())
            .setColor("#C9DBED")
            .addField("`Game Platforms:`", (Object.keys(ResultGamePlatorms).length <= 0 ? ":man_shrugging:" : szPlatforms.join(", ")), true)
            .addField("`Available On:`", (Object.keys(ResultGameStores).length <= 0 ? "Stand Alone Executable" : szAvailableStores.join(", ")), true)
            .setDescription(szDescription)
            .setThumbnail("https://i.imgur.com/NWbb94q.png")
            .attachFiles({ attachment: (ResultGame.background_image === null ? "https://i.imgur.com/udvekQS.png" : ResultGame.background_image), name: "game_background.png" })
            .setImage("attachment://game_background.png")
            .setFooter("Stats from: RAWG.io • Requested by: @" + user.username, user.displayAvatarURL())

            message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

        }).catch(() =>
        {
            return message.reply(" :no_entry: Sorry, I couldn't find the game you requested. Could you try simplifying the game name?  :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        });

    }).catch(() =>
    {
        return message.reply(" :no_entry: Sorry, I couldn't find the game you requested. Could you try simplifying the game name?  :disappointed_relieved:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "game"
};