
const Discord = require("discord.js");
const getJSON = require("get-json");

const CustomFunctions = require("../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    var user = message.author;
    var szQuestion = szArgs.join(" ").trim();

    if(CustomFunctions.isEmpty(szQuestion))
    {
        return await message.reply(":no_entry: your question can't be empty! :no_entry:");
    }

    if(szQuestion.substr(-1) !== "?")
    {
        return await message.reply(":no_entry: does that look like a question to you :question:  :no_entry:");
    }

    await getJSON('https://yesno.wtf/api/', async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: YES it is an error! NO, try again later :sob:  :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        var ReplyJson = JSON.stringify(response.image).replace(/"/g, '');
        var AnswerJson = JSON.stringify(response.answer).replace(/"/g, '');

        const embed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Yes/No", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor((AnswerJson === "yes") ? "#0080ff" : "#ff4000")
        .setDescription("***Your Question:***  " + CustomFunctions.capitalizeFirstLetter(szQuestion) + "\n\n***My answer:***  `` " + CustomFunctions.capitalizeFirstLetter(AnswerJson) + " ``")
        .setImage(ReplyJson)
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({embed});
    });
};

module.exports.help =
{
    name: "yn"
};
