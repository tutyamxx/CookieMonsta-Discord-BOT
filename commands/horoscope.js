
const Discord = require("discord.js");
const IgnoreCase = require("ignore-case");
const getJSON = require("get-json");
const CustomFunctions = require("../functions/funcs.js");

const ZodiacSigns =
[
    ["Aries",       ":aries:"],
    ["Taurus",      ":taurus:"],
    ["Gemini",      ":gemini:"],
    ["Cancer",      ":cancer:"],
    ["Leo",         ":leo:"],
    ["Virgo",       ":virgo:"],
    ["Libra",       ":libra:"],
    ["Scorpio",     ":scorpius:"],
    ["Sagittarius", ":sagittarius:"],
    ["Capricorn",   ":capricorn:"],
    ["Aquarius",    ":aquarius:"],
    ["Pisces",      ":pisces:"]
];

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: missing argument! Type **!horoscope** ``Scorpio`` for example. :no_entry:");
    }

    let i;
    for(i = 0; i < ZodiacSigns.length; i++)
    {
        if(IgnoreCase.equals(ZodiacSigns[i][0], szArgs[0]))
        {
            await getJSON('http://horoscope-api.herokuapp.com/horoscope/today/' + ZodiacSigns[i][0], async function(error, response)
            {
                if(error)
                {
                    return await message.channel.send(":no_entry: Some kind of error occured! I will email the dev. Try again later :sob:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
                }

                let StringHoroscope = JSON.stringify(response.horoscope).replace(/"/g, '').replace(/'/g, '').replace(/\[/g, '').replace(/\]/g, '');

                const embed = new Discord.RichEmbed()
                .setAuthor("Cookie Monsta | Horoscope", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
                .setColor(26316)
                .setDescription("**Sign:** " + response.sunsign + " " + ZodiacSigns[i][1] + "\n\n" + StringHoroscope)
                .setThumbnail("https://i.imgur.com/9iraNPb.png")
                .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
                .setTimestamp()

                await message.channel.send({embed});
            });

            return;
        }
    }

    if(szArgs[0] === "list")
    {
        let ZodiacSignsList = "";

        for(i = 0; i < ZodiacSigns.length; i++)
        {
            ZodiacSignsList += ZodiacSigns[i][0] + ", ";
        }

        return await message.reply(" here is the list of zodiac signs :arrow_right: " + "***" + ZodiacSignsList + "***");
    }

    else
    {
        return await message.reply(" :no_entry: invalid argument! Type **!horoscope** ``list`` to see available zodiac signs :no_entry:");
    }
};

module.exports.help =
{
    name: "horoscope"
};
