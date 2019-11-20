const Discord = require("discord.js");
const DatabaseImport = require("../../database/database.js");
const CookieMonsta = require("../../CookieMonstaBOT.js");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(message.member.hasPermission("ADMINISTRATOR") || message.author.id === "266677298051153920")
    {
        const user = message.author;
        const GuildMember = message.mentions.members.first();
        const GuildGetID = message.guild.id;

        if(!GuildMember)
        {
            return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
        }

        if(GuildMember.user.bot)
        {
            return await message.reply(" :no_entry: I can only give cookies :cookie: to real people! Blame the dev LEL. :no_entry:");
        }

        if(CustomFunctions.isEmpty(szArgs[1]))
        {
            return await message.reply(" :no_entry: it seems your cookies :cookie: parameter is empty! Try entering a number. :no_entry:" );
        }

        if(!CustomFunctions.isInt(szArgs[1]))
        {
            return await message.reply(" :no_entry: it seems your cookies :cookie: parameter is not a valid number! Try entering a valid number. :no_entry:" );
        }

        if(szArgs[1] > 9999999999 || szArgs[1] <= 0)
        {
            return await message.reply(" :no_entry: I know sky is the limit, but try a number between ``1``and ``9999999999`` :no_entry:" );
        }

        await DatabaseImport.CookieMonsta_CheckCreateUser(GuildGetID, GuildMember.user.id);
        
        const iCookieAmount = parseInt(szArgs[1]);
        const iCurrentUserCookies = await DatabaseImport.CookieMonsta_GetUserCookies(GuildGetID, GuildMember.user.id);

        let iCalculateNewCookies = iCurrentUserCookies + iCookieAmount;

        await DatabaseImport.CookieMonsta_SetUserCookies(GuildGetID, GuildMember.user.id, iCalculateNewCookies);

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Admin Log", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(2003199)
        .setDescription("**" + user + "** gave **" + GuildMember + "** **" + iCookieAmount + "** cookies :cookie: !")
        .setThumbnail("https://i.imgur.com/p6nQ6Dk.jpg")
        .setFooter("Used by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
        .setTimestamp();

        await message.channel.send({ embed: DiscordRichEmbed });
    }

    else
    {
        return await message.channel.send(":no_entry: You can't mate! Fucking biblical... :laughing: :no_entry:");
    }
};

module.exports.help =
{
    name: "givecookies"
};