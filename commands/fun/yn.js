const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    const user = message.author;
    let szQuestion = szArgs.join(" ").trim();

    if(CustomFunctions.isEmpty(szQuestion))
    {
        return message.reply(":no_entry: your question can't be empty! :no_entry:");
    }

    if(szQuestion.substr(-1) !== "?")
    {
        return message.reply(":no_entry: does that look like a question to you :question:  :no_entry:");
    }

    message.channel.startTyping();

    axios.get("https://yesno.wtf/api/").then((response) =>
    {
        // --| Remove "" from start and end of string
        const ReplyJson = JSON.stringify(response.data.image).replace(/"/g, "");
        const AnswerJson = JSON.stringify(response.data.answer).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Yes/No", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor((AnswerJson === "yes") ? "#0080ff" : "#ff4000")
        .setDescription("***Your Question:***  " + CustomFunctions.capitalizeFirstLetter(szQuestion) + "\n\n***My answer:***  `` " + CustomFunctions.capitalizeFirstLetter(AnswerJson) + " ``")
        .setImage(ReplyJson)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: YES it is an error! NO, try again later :sob:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "yn"
};