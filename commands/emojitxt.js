
const EmojiTranslate = require("moji-translate");
const CustomFunctions = require("../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: The text cannot be empty scrub :facepalm: :no_entry:");
    }

    message.channel.startTyping();

    var TextToTranslate = szArgs.join(" ");

    await message.channel.send(EmojiTranslate.translate(TextToTranslate)).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
};

module.exports.help =
{
    name: "emojitxt"
};
