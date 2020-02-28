const RandomFacts =  require("../../json/randomfacts.json");

let bBoolLoopStarded = false;

const TimeDelayLoop 		    = 45;		// Every 45 minutes
const RandomDiscordClockEmojis  = [":clock1:", ":clock10:", ":clock1030:", ":clock11:", ":clock12:", ":clock2:", ":clock930:"];

module.exports.run = (bot, message, args) =>
{
    if(!message.member.hasPermission("ADMINISTRATOR"))
    {
        return message.channel.send(":no_entry: You can't mate! Fucking biblical... :laughing: :no_entry:");
    }

    if(bBoolLoopStarded === false)
    {
        bBoolLoopStarded = true;

        let RandomClockEmoji = RandomDiscordClockEmojis[Math.floor(Math.random() * RandomDiscordClockEmojis.length)];
        message.channel.send(":clapper: Random Facts Captain started! :clapper:\nDisplaying random facts to everyone every " + TimeDelayLoop + " minutes " + RandomClockEmoji);

        iFactsInterval = setInterval(() =>
        {
            const iRandFact = RandomFacts[Math.floor(Math.random() * RandomFacts.length)];
            message.channel.send(":nerd: Random Facts Captain here :nerd: :arrow_down:\n" + iRandFact);

        }, TimeDelayLoop * 60000);
    }

    else if(bBoolLoopStarded === true)
    {
        bot.clearInterval(iFactsInterval);
        message.channel.send(":octagonal_sign: :octagonal_sign:  Random Facts Captain stopped! :octagonal_sign: :octagonal_sign:");

        bBoolLoopStarded = false;
    }
};

module.exports.help =
{
    name: "loop"
};