const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(message.author.id !== "266677298051153920")
    {
        return await message.reply(" :no_entry_sign: you're not the Dev pleb :facepalm:  :no_entry_sign:");
    }

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: argument can't be empty! :no_entry:");
    }

    const MentionedGuildParam = szArgs[0].trim().toString();
    let GetGuild = await bot.guilds.get(MentionedGuildParam);

    if(GetGuild === undefined)
    {
        return await message.reply(" Invalid guild or I have already left this **" + MentionedGuildParam + "** guild :id: !");
    }

    await GetGuild.leave().catch(async (e) =>
    {
        return await message.reply(" I tried to leave this guild id :id:: **" + MentionedGuildParam + "** but I got this error: ``" + e.message + "`` !");
    });

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Guild Leave Log", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(2003199)
    .setDescription("I have left the specified guild\n\n:id:: (**" + szArgs[0] + "**) !")
    .setThumbnail((bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setTimestamp()

    await message.author.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "guildleave"
};