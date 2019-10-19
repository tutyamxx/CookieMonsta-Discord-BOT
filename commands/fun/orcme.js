const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, args) =>
{
    let RandomOrcName1 = CustomFunctions.GenerateOrcName();
    let RandomOrcName2 = CustomFunctions.GenerateOrcName();
    let RandomOrcName3 = CustomFunctions.GenerateOrcName();

    let ThreeOrcNames = Math.floor(( Math.random() * 3 ) + 1);

    let OrcNameGenerated;

    if(ThreeOrcNames === 3)
    {
        OrcNameGenerated = "<:orc:635178458720239617> **" + RandomOrcName1 + " " + RandomOrcName2 + " " + RandomOrcName3 + "** <:orc:635178458720239617>";
    }

    else
    {
        OrcNameGenerated = "<:orc:635178458720239617> **" + RandomOrcName1 + " " + RandomOrcName2 + "** <:orc:635178458720239617>";
    }

    const user = message.author;

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Your Orc Name Is", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(2263842)
    .setDescription(OrcNameGenerated)
    .setThumbnail("https://i.imgur.com/nygjC55.png")
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

    await message.channel.send({ embed: DiscordRichEmbed })
};

module.exports.help =
{
    name: "orcme"
};