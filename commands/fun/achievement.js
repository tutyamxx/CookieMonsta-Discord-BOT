const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type **!achievement** ``<your text here>`` :no_entry:");
    }

    if(szArgs[0].length > 21)
    {
        return await message.reply(" :no_entry: please don't exceed **21** characters in your achievement description! :no_entry:");
    }

    if(message.mentions.members.first())
    {
        return await message.reply(" :no_entry: please don't mention people in your achievement description! :no_entry:");
    }

    message.channel.startTyping();

    let ArgumentText = szArgs.join(" ");

    const iRandomIcon = Math.floor((Math.random() * 39) + 0);
    const RandomAchievementHeader = [ "Achievement Earned!", "Achievement Unlocked!", "Achievement Get!", "Achievement Completed!"];

    let AchievementEncodeGenerate = "https://www.minecraftskinstealer.com/achievement/a.php?i=" + iRandomIcon + "&h=" + RandomAchievementHeader[Math.floor(Math.random() * RandomAchievementHeader.length)] + "&t=" + ArgumentText + "&.png";

    await message.channel.send(new Discord.Attachment(encodeURI(AchievementEncodeGenerate), "achievement.png")).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
};

module.exports.help =
{
    name: "achievement"
};