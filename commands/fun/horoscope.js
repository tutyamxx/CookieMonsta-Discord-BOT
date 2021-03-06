const Discord = require("discord.js");
const IgnoreCase = require("ignore-case");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

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

module.exports.run = (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: missing argument! Make sure you add ``" + ZodiacSigns[Math.floor(Math.random() * ZodiacSigns.length)][0] + "`` for example. :no_entry:");
    }

    let i;
    for(i = 0; i < ZodiacSigns.length; i++)
    {
        if(IgnoreCase.equals(ZodiacSigns[i][0], szArgs[0]))
        {
            message.channel.startTyping();

            axios.get("http://horoscope-api.herokuapp.com/horoscope/today/" + ZodiacSigns[i][0]).then((response) =>
            {
                const StringHoroscope = JSON.stringify(response.data.horoscope).replace(/"/g, "").replace(/'/g, "").replace(/\[/g, "").replace(/\]/g, "");

                const DiscordRichEmbed = new Discord.MessageEmbed()
                .setAuthor("Cookie Monsta | Horoscope", bot.user.displayAvatarURL())
                .setColor(26316)
                .setDescription("**Sign:** " + response.data.sunsign + " " + ZodiacSigns[i][1] + "\n\n" + StringHoroscope)
                .setThumbnail("https://i.imgur.com/9iraNPb.png")
                .setFooter("Requested by: @" + user.username, user.displayAvatarURL())
                .setTimestamp()

                message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

            }).catch(() =>
            {
                return message.channel.send(":no_entry: Some kind of error occured! I will email the dev. Try again later :sob:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
            });

            return;
        }
    }

    if(szArgs[0] === "list")
    {
        let ZodiacSignsList = [];

        for(i = 0; i < ZodiacSigns.length; i++)
        {
            ZodiacSignsList.push(ZodiacSigns[i][0]);
        }

        return message.reply(" here is the list of zodiac signs :arrow_right: **" + ZodiacSignsList.join("**, **") + "**");
    }

    else
    {
        return message.reply(" :no_entry: invalid argument! Type ``list`` as a parameter to see available zodiac signs :no_entry:");
    }
};

module.exports.help =
{
    name: "horoscope"
};