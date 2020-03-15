const figlet = require("figlet");
const { promisify } = require("util");
const figletAsync = promisify(figlet);
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Make sure you add some text to convert to ASCII art :art:  :no_entry:");
    }

    if(message.mentions.members.first())
    {
        return message.reply(" :no_entry: please don't mention people, just type the text you want to convert into ASCII art :art: ! :no_entry:");
    }

    let ArgumentText = szArgs.join(" ");

    if(ArgumentText.length > 20)
    {
        return message.reply(" :no_entry: please don't exceed **20** characters in your **ASCII** text ! :no_entry:");
    }

    const RenderedAsciiText = await figletAsync(ArgumentText);
    message.channel.send("```fix\n" + RenderedAsciiText + "```");
};

module.exports.help =
{
    name: "ascii"
};