const Discord = require("discord.js");
const axios = require("axios");

const RandomMoonEmoji =
[
    ":first_quarter_moon:", ":full_moon:", ":last_quarter_moon:", ":new_moon:", ":waning_crescent_moon:", ":waning_gibbous_moon:", ":waxing_crescent_moon:", ":waxing_gibbous_moon:"
];

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;
    const GenerateRandomEmoji = RandomMoonEmoji[Math.floor(Math.random() * RandomMoonEmoji.length)];

    await message.channel.startTyping();

    await axios.get("http://api.open-notify.org/astros.json").then(async (response) =>
    {
        let PeopleInSpace = JSON.stringify(await response.data.number).replace(/"/g, "");

        let szPeopleNames = "";
        let szDescription = "";
        let AstroPersonName = "";

        if(parseInt(PeopleInSpace) <= 0
        || PeopleInSpace === undefined
        || PeopleInSpace === null)
        {
            szDescription = "There is nobody in space right now! " + GenerateRandomEmoji;
        }

        else if(parseInt(PeopleInSpace) === 1)
        {
            szDescription = "There is **one** person in space right now! " + GenerateRandomEmoji;
        }

        else
        {
            szDescription = "There are **" + parseInt(PeopleInSpace) + "** people in space right now! " + GenerateRandomEmoji;
        }

        for(let i = 0; i < parseInt(PeopleInSpace); i++)
        {
            AstroPersonName = JSON.stringify(response.data.people[i].name).replace(/"/g, '');

            szPeopleNames += ":busts_in_silhouette: [" + AstroPersonName + "](https://en.wikipedia.org/wiki/" + encodeURI(AstroPersonName) + ")\n";
        }

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | People in Space ISS", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#483D8B")
        .setDescription(szDescription + "\n\n" + szPeopleNames)
        .setThumbnail("https://i.imgur.com/hj6ouTF.jpg")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Sorry, but something went wrong! Try again later... :disappointed_relieved:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "peopleinspace"
};