const TextFlip = require("flip-text");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type some text so I can flip it?  :no_entry:");
    }

    let ArgumentText = szArgs.join(" ");

    message.channel.send( "***(ノಠ _ ಠ)ノ︵***  " + TextFlip(ArgumentText));
};

module.exports.help =
{
    name: "tflip"
};