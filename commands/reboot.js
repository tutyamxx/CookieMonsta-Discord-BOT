
module.exports.run = async (bot, message, szArgs) =>
{
	if(message.author.id !== "266677298051153920")
	{
		return await message.reply(" :no_entry_sign: you're not the Dev pleb :facepalm:  :no_entry_sign:");
	}

	await message.channel.send(":arrows_counterclockwise:    :arrow_right:     :regional_indicator_r: :regional_indicator_e: :regional_indicator_b: :o2: :o2: :regional_indicator_t: :regional_indicator_i: :regional_indicator_n: :regional_indicator_g:  :exclamation: ").then(m => process.exit(1));
}

module.exports.help =
{
    name: "reboot"
};
