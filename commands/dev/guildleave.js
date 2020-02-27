const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(bot)
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

        if(isNaN(MentionedGuildParam))
        {
            return await message.reply(" :no_entry: you must enter a valid guild id. Example: `634801165036421142`  :no_entry:");
        }

        if(MentionedGuildParam === "634801165036421142")
        {
            return await message.reply(" :no_entry: NO! I won't leave this guild :anger: !  :no_entry:");
        }

        let GetGuild = await bot.guilds.get(MentionedGuildParam);

        if(GetGuild === undefined)
        {
            return await message.reply(" Invalid guild or it seems that I have already left the: **" + MentionedGuildParam + "** guild :id: !");
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
        await message.channel.send("<:cookiemonsta:634866060465537034> **|** Okay, I have left the specified guild :id:: (**" + szArgs[0] + "**) !");
    }

    else
    {
        return await message.reply(" Sorry, something went wrong, you should probably check why :joy: !");
    }
};

module.exports.help =
{
    name: "guildleave"
};