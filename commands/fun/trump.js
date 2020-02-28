const axios = require("axios");

module.exports.run = (bot, message, args) =>
{
    message.channel.startTyping();

    axios.get("https://api.tronalddump.io/random/quote").then((response) =>
    {
        const GetTrumpTweets = JSON.stringify(response.data._embedded.source[0].url).replace(/"/g, "");

        message.channel.send(":joy::ok_hand: **Some random dumb Trump tweets** :joy::ok_hand:\n\n" + GetTrumpTweets).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Sorry, but somehow I can't fetch any Trump shizz at the moment... :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "trump"
};