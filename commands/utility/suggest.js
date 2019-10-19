module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    let RandomCommand = await bot.commands.random();

    if(RandomCommand.help.name === "reloadcmd"
    || RandomCommand.help.name === "sendnews"
    || RandomCommand.help.name === "reboot"
    || RandomCommand.help.name === "guildleave"
    || RandomCommand.help.name === "clear")
    {
        RandomCommand = bot.commands.random();
    }

    await message.reply(" if you are out of ideas :thinking: you should try this command: **!" + RandomCommand.help.name + "**");
};

module.exports.help =
{
    name: "suggest"
};