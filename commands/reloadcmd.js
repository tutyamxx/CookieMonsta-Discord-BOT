const CustomFunctions = require("../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(message.author.id !== "266677298051153920")
    {
        return await message.reply(" :no_entry_sign: you're not the Dev pleb :facepalm:  :no_entry_sign:");
    }

    if(!szArgs || szArgs.size < 1 || CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: you must provide a command name to reload. <:dab:414433388104253450> :no_entry:");
    }

    const szCommandName = szArgs[0];

    if(!bot.commands.has(szCommandName))
    {
        return await message.reply(":no_entry: That command does not exist! :no_entry:");
    }

    delete require.cache[require.resolve(`./${szCommandName}.js`)];
    bot.commands.delete(szCommandName);

    const iProps = require(`./${szCommandName}.js`);
    bot.commands.set(szCommandName, iProps);

    await message.channel.send(`:recycle: ⇒ I have reloaded the **${szCommandName}** command my Lord! :ok_hand:`);
};

module.exports.help =
{
    name: "reloadcmd"
};