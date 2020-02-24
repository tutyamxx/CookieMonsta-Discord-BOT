const Discord = require("discord.js");
const DatabaseImport = require("../../database/database.js");
const CookieMonsta = require("../../CookieMonstaBOT.js");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(message.member.hasPermission("ADMINISTRATOR") || message.author.id === "266677298051153920")
    {
        const user = message.author;
        const GuildGetID = message.guild.id;
        const GuildMember = message.mentions.members.first();

        if(!GuildMember)
        {
            return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
        }

        if(GuildMember.user.bot)
        {
            return await message.reply(" :no_entry: I can only remove XP :trophy: from real people! Blame the dev LEL. :no_entry:");
        }

        if(CustomFunctions.isEmpty(szArgs[1]))
        {
            return await message.reply(" :no_entry: it seems your XP :trophy: parameter is empty! Try entering a number. :no_entry:" );
        }

        if(!CustomFunctions.isInt(szArgs[1]))
        {
            return await message.reply(" :no_entry: it seems your XP :trophy: parameter is not a valid number! Try entering a valid number. :no_entry:" );
        }

        if(szArgs[1] > 9999999999 || szArgs[1] <= 0)
        {
            return await message.reply(" :no_entry: I know sky is the limit, but try a number between ``1``and ``9999999999`` :no_entry:" );
        }

        let ExperienceAmount = parseInt(szArgs[1]);

        await DatabaseImport.CookieMonsta_CheckCreateUser(GuildGetID, GuildMember.user.id);

        const iTargetPoints = await DatabaseImport.CookieMonsta_GetUserPoints(GuildGetID, GuildMember.user.id);
        let iCalculateNewPoints = iTargetPoints - ExperienceAmount;

        if(iCalculateNewPoints <= 0)
        {
            iCalculateNewPoints = 0;
        }

        let iTargetNewLevel = Math.floor(0.1 * Math.sqrt(iCalculateNewPoints));

        if(iTargetNewLevel <= 0)
        {
            iTargetNewLevel = 1;
        }

        await DatabaseImport.CookieMonsta_UpdatePoints_And_Level(GuildGetID, GuildMember.user.id, parseInt(iCalculateNewPoints), parseInt(iTargetNewLevel));

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Admin Log", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#B22222")
        .setDescription("**" + user + "** removed from **" + GuildMember + "** **" + ExperienceAmount + "** XP :trophy: !\n\n\n" + GuildMember + "'s level is now: **" + parseInt(iTargetNewLevel) + "** :worried: !")
        .setThumbnail("https://i.imgur.com/S3YRHSW.jpg")
        .setFooter("Used by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
        .setTimestamp();

        await message.channel.send({ embed: DiscordRichEmbed });
    }

    else
    {
        return await message.channel.send(":no_entry: You can't mate! You need ``ADMINISTRATOR`` permission for this command. :laughing: :no_entry:");
    }
};

module.exports.help =
{
    name: "removexp"
};