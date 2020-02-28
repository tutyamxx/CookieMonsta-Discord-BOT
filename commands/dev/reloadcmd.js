const fs = require("fs");
const { join } = require("path");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    if(message.author.id !== "266677298051153920")
    {
        return message.reply(" :no_entry_sign: you're not the Dev pleb :facepalm:  :no_entry_sign:");
    }

    if(!szArgs || szArgs.size < 1 || CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: you must provide a command name to reload. <:FeelsDabMan:634890825230319640> :no_entry:");
    }

    const szCommandName = szArgs[0];

    if(!bot.commands.has(szCommandName))
    {
        return message.reply(":no_entry: That command does not exist! :no_entry:");
    }

    fs.readdirSync(join(__dirname, "..")).forEach(ResultFile =>
    {
        const szFilesPath = fs.readdirSync(join(__dirname, "..", ResultFile));

        if(szFilesPath.includes(`${szCommandName}.js`))
        {
            const szFile = `../${ResultFile}/${szCommandName}.js`;

            try
            {
                delete require.cache[require.resolve(szFile)];
                bot.commands.delete(szCommandName);

                const iProps = require(szFile);
                bot.commands.set(iProps.help.name.toLowerCase(), iProps);

                return message.channel.send(`:recycle: ⇒ I have reloaded the **${szCommandName}** command my Lord! :ok_hand:`);
            }

            catch(err)
            {
                return message.channel.send(`:recycle: ⇒ Could not reload: **${szArgs[0]}** command my Lord! :triumph:`);
            }
        }
    });
};

module.exports.help =
{
    name: "reloadcmd"
};