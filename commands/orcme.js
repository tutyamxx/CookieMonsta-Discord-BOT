
const Discord = require("discord.js");

const CustomFunctions = require("../functions/funcs.js");

module.exports.run = async (bot, message, args) =>
{
    var RandomOrcName1 = CustomFunctions.GenerateOrcName();
    var RandomOrcName2 = CustomFunctions.GenerateOrcName();
    var RandomOrcName3 = CustomFunctions.GenerateOrcName();

    var ThreeOrcNames = Math.floor(( Math.random() * 3 ) + 1);

    var OrcNameGenerated;

    if(ThreeOrcNames === 3)
    {
        OrcNameGenerated = "<:orc:535863331781869568> **" + RandomOrcName1 + " " + RandomOrcName2 + " " + RandomOrcName3 + "** <:orc:535863331781869568>";
    }

    else
    {
        OrcNameGenerated = "<:orc:535863331781869568> **" + RandomOrcName1 + " " + RandomOrcName2 + "** <:orc:535863331781869568>";
    }

    var user = message.author;

    const embed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Your Orc Name Is", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(2263842)
    .setDescription(OrcNameGenerated)
    .setThumbnail("https://i.imgur.com/nygjC55.png")
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

    await message.channel.send({embed})
};

module.exports.help =
{
    name: "orcme"
};
