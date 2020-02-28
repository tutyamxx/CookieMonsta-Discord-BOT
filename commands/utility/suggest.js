module.exports.run = (bot, message, szArgs) =>
{
    let RandomCommand = bot.commands.random();

    if(RandomCommand.help.name === "reloadcmd"  || RandomCommand.help.name === "sendnews"  || RandomCommand.help.name === "reboot"
    || RandomCommand.help.name === "guildleave" || RandomCommand.help.name === "guildlist" || RandomCommand.help.name === "clear"
    || RandomCommand.help.name === "refreshbanner")
    {
        RandomCommand = bot.commands.random();
    }

    message.reply(" if you are out of ideas :thinking: you should try this command: **!" + RandomCommand.help.name + "**");
};

module.exports.help =
{
    name: "suggest"
};