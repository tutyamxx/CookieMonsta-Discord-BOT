
const Needle = require("needle");

module.exports.run = async (bot, message, args) =>
{
    message.channel.startTyping();

	await Needle.get("https://api.github.com/zen", async function(error, response)
	{
		if(!error && response.statusCode == 200)
		{
			var ZenWords = await response.body.replace(/"/g, '').replace(/'/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/\\/g, '"');

			await message.channel.send("``Cookie Monsta | GitHub Zen`` :tanabata_tree:\n" + "```diff\n- " + ZenWords + "```").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
		}

		else
		{
			return await message.channel.send(":no_entry: Something went wrong! Be patient, try again later! :sob:  :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
		}
	});
};

module.exports.help =
{
    name: "zen"
};
