const Discord = require("discord.js");
const getJSON = require("get-json");
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

    await getJSON("https://yesno.wtf/api/", async (error, response) =>
    {
        if(error)
        {
            return await message.channel.send(":no_entry: YES it is an error! NO, try again later :sob:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        let ReplyJson = JSON.stringify(await response.image).replace(/"/g, '');
        let AnswerJson = JSON.stringify(await response.answer).replace(/"/g, '');

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Yes/No", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor((AnswerJson === "yes") ? "#0080ff" : "#ff4000")
        .setDescription("***Your Question:***  " + CustomFunctions.capitalizeFirstLetter(szQuestion) + "\n\n***My answer:***  `` " + CustomFunctions.capitalizeFirstLetter(AnswerJson) + " ``")
        .setImage(ReplyJson)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed });
    });
};

module.exports.help =
{
    name: "yn"
};