const TextFlip = require("flip-text");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!tflip** ``<your text here>`` :no_entry:");
    }

    let ArgumentText = szArgs.join(" ");

    await message.channel.send( "***(ノಠ _ ಠ)ノ︵***  " + TextFlip(ArgumentText));
};

module.exports.help =
{
    name: "tflip"
};