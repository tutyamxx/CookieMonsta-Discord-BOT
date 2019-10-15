
const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

	message.channel.startTyping();

    await getJSON('https://some-random-api.ml/pandafact', async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: some kind of error has occured! Try again later? :panda_face:  :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        let PandaFactToString = JSON.stringify(response.fact).replace(/"/g, '').replace(/\\/g, "``");

		const embed = new Discord.RichEmbed()
		.setAuthor("Cookie Monsta | Panda Facts", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
		.setColor("#000000")
		.setDescription(PandaFactToString)
		.setThumbnail("https://i.imgur.com/KQ2QMF2.png")
	   	.setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

		await message.channel.send({embed}).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
	});
};

module.exports.help =
{
    name: "pandafact"
};
