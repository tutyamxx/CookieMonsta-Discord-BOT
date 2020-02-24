const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    await axios.get("https://official-joke-api.herokuapp.com/random_joke").then(async (response) =>
    {
        const GetJokeType = JSON.stringify(await response.data.type).replace(/"/g, "");
        const GetRandomJoke = JSON.stringify(await response.data.setup).replace(/"/g, "").replace(/\\/g, "'").replace(/&quot;/g, '\\"').replace(/\\n/g, " ").replace(/\\t/g, " ").replace(/\\/g, "");
        const GetJokePunchline = JSON.stringify(await response.data.punchline).replace(/"/g, "").replace(/\\/g, "'").replace(/&quot;/g, '\\"').replace(/\\n/g, " ").replace(/\\t/g, " ").replace(/\\/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Punchline Jokes | " + CustomFunctions.capitalizeFirstLetter(GetJokeType), (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#32CD32")
        .setDescription(":black_joker: " + GetRandomJoke + "\n\n:right_facing_fist::dash: " + GetJokePunchline)
        .setThumbnail("https://static-cdn.jtvnw.net/emoticons/v1/425618/3.0")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Sorry, but somehow I can't fetch any jokes at the moment... :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "punchjoke"
};