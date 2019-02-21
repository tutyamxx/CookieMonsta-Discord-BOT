
const Discord = require("discord.js");
const getJSON = require("get-json");

var RandomMoonEmoji =
[
	":first_quarter_moon:", ":full_moon:", ":last_quarter_moon:", ":new_moon:", ":waning_crescent_moon:", ":waning_gibbous_moon:", ":waxing_crescent_moon:", ":waxing_gibbous_moon:"
];

module.exports.run = async (bot, message, args) =>
{
    var user = message.author;
	var GenerateRandomEmoji = RandomMoonEmoji[Math.floor(Math.random() * RandomMoonEmoji.length)];

	message.channel.startTyping();

	await getJSON("http://api.open-notify.org/astros.json", async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, but something went wrong! Try again later... :disappointed_relieved:  :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        var PeopleInSpace = JSON.stringify(response.number).replace(/"/g, '');

		var szPeopleNames = "";
		var szDescription = "";
		var AstroPersonName = "";

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

		for(var i = 0; i < parseInt(PeopleInSpace); i++)
		{
			AstroPersonName = JSON.stringify(response.people[i].name).replace(/"/g, '');

			szPeopleNames += ":busts_in_silhouette: [" + AstroPersonName + "](https://en.wikipedia.org/wiki/" + encodeURI(AstroPersonName) + ")\n";
		}

        const embed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | People in Space ISS", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#483D8B")
        .setDescription(szDescription + "\n\n" + szPeopleNames)
        .setThumbnail("https://i.imgur.com/hj6ouTF.jpg")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

        await message.channel.send({embed}).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "peopleinspace"
};
