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
            return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
        }

        if(GuildMember.user.bot)
        {
            return message.reply(" :no_entry: I can only give XP :trophy: to real people! Blame the dev LEL. :no_entry:");
        }

        if(CustomFunctions.isEmpty(szArgs[1]))
        {
            return message.reply(" :no_entry: it seems your XP :trophy: parameter is empty! Try entering a number. :no_entry:" );
        }

        if(!CustomFunctions.isInt(szArgs[1]))
        {
            return message.reply(" :no_entry: it seems your XP :trophy: parameter is not a valid number! Try entering a valid number. :no_entry:" );
        }

        if(szArgs[1] > 9999999999 || szArgs[1] <= 0)
        {
            return message.reply(" :no_entry: I know sky is the limit, but try a number between ``1``and ``9999999999`` :no_entry:" );
        }

        await DatabaseImport.CookieMonsta_CheckCreateUser(GuildGetID, GuildMember.user.id);

        let ExperienceAmount = parseInt(szArgs[1]);
        const iTargetPoints = await DatabaseImport.CookieMonsta_GetUserPoints(GuildGetID, GuildMember.user.id);

        let iCalculateNewPoints = iTargetPoints + ExperienceAmount;
        const iTargetLevel = Math.floor(0.1 * Math.sqrt(iCalculateNewPoints));

        await DatabaseImport.CookieMonsta_UpdatePoints_And_Level(GuildGetID, GuildMember.user.id, parseInt(iCalculateNewPoints), parseInt(iTargetLevel));

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Admin Log", bot.user.displayAvatarURL())
        .setColor(2003199)
        .setDescription(`**${user}** gave **${GuildMember}** **${ExperienceAmount}** XP :trophy: !\n\n\n${GuildMember}'s level is now: **${parseInt(iTargetLevel)}** :blush: !`)
        .setThumbnail("https://i.imgur.com/p6nQ6Dk.jpg")
        .setFooter("Used by: @" + user.username, user.displayAvatarURL())
        .setTimestamp();

        message.channel.send({ embed: DiscordRichEmbed });
    }

    else
    {
        return message.channel.send(":no_entry: You can't mate! You need ``ADMINISTRATOR`` permission for this command. :laughing: :no_entry:");
    }
};

module.exports.help =
{
    name: "givexp"
};