const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    message.channel.startTyping();

    await getJSON("https://api.tronalddump.io/random/quote", async (error, response) =>
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, but somehow I can't fetch any Trump shizz at the moment... :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        let GetTrumpTweets = JSON.stringify(await response._embedded.source[0].url).replace(/"/g, '');

        await message.channel.send(":joy::ok_hand: **Some random dumb Trump tweets** :joy::ok_hand:\n\n" + GetTrumpTweets).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "trump"
};