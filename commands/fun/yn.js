const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;
    let szQuestion = szArgs.join(" ").trim();

    if(CustomFunctions.isEmpty(szQuestion))
    {
        return await message.reply(":no_entry: your question can't be empty! :no_entry:");
    }

    if(szQuestion.substr(-1) !== "?")
    {
        return await message.reply(":no_entry: does that look like a question to you :question:  :no_entry:");
    }

    await message.channel.startTyping();

    await axios.get("https://yesno.wtf/api/").then(async (response) =>
    {
        // --| Remove "" from start and end of string
        const ReplyJson = JSON.stringify(await response.data.image).replace(/"/g, "");
        const AnswerJson = JSON.stringify(await response.data.answer).replace(/"/g, "");

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Yes/No", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor((AnswerJson === "yes") ? "#0080ff" : "#ff4000")
        .setDescription("***Your Question:***  " + CustomFunctions.capitalizeFirstLetter(szQuestion) + "\n\n***My answer:***  `` " + CustomFunctions.capitalizeFirstLetter(AnswerJson) + " ``")
        .setImage(ReplyJson)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: YES it is an error! NO, try again later :sob:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "yn"
};