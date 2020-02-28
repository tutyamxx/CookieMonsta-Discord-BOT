const EmojiTranslate = require("moji-translate");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: The text cannot be empty scrub :facepalm: :no_entry:");
    }

    message.channel.startTyping();

    let TextToTranslate = szArgs.join(" ");

    message.channel.send(EmojiTranslate.translate(TextToTranslate)).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
};

module.exports.help =
{
    name: "emojitxt"
};