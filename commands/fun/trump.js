const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    await message.channel.startTyping();

    await axios.get("https://api.tronalddump.io/random/quote").then(async (response) =>
    {
        const GetTrumpTweets = JSON.stringify(await response.data._embedded.source[0].url).replace(/"/g, "");

        await message.channel.send(":joy::ok_hand: **Some random dumb Trump tweets** :joy::ok_hand:\n\n" + GetTrumpTweets).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Sorry, but somehow I can't fetch any Trump shizz at the moment... :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "trump"
};