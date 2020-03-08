const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Make sure to add some text.  :no_entry:");
    }

    if(szArgs[0].length > 21)
    {
        return message.reply(" :no_entry: please don't exceed **21** characters in your achievement description! :no_entry:");
    }

    if(message.mentions.members.first())
    {
        return message.reply(" :no_entry: please don't mention people in your achievement description! :no_entry:");
    }

    message.channel.startTyping();

    let ArgumentText = szArgs.join(" ");

    const iRandomIcon = Math.floor((Math.random() * 39) + 0);
    const RandomAchievementHeader = [ "Achievement Earned!", "Achievement Unlocked!", "Achievement Get!", "Achievement Completed!"];

    const AchievementEncodeGenerate = `https://www.minecraftskinstealer.com/achievement/a.php?i=${iRandomIcon}&h=${RandomAchievementHeader[Math.floor(Math.random() * RandomAchievementHeader.length)]}&t=${ArgumentText}&.png`;

    message.channel.send(new Discord.MessageAttachment(encodeURI(AchievementEncodeGenerate), "achievement.png")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
};

module.exports.help =
{
    name: "achievement"
};