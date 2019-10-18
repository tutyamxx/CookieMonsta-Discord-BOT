const Discord = require("discord.js");
const GetDatabaseData = require("../functions/getuserdata.js");
const CookieMonsta = require("../CookieMonstaBOT.js");
const CustomFunctions = require("../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(!message.member.hasPermission("ADMINISTRATOR"))
    {
        return await message.channel.send(":no_entry: You can't mate! Fucking biblical... :laughing: :no_entry:");
    }

    const user = message.author;

    let GuildGetID = message.guild.id;
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(GuildMember.user.bot)
    {
        return await message.reply(" :no_entry: I can only give XP :trophy: to real people! Blame the dev LEL. :no_entry:");
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
        return await message.reply(" :no_entry: I know sky is the limit, but try a number between ``1``and ``999999`` :no_entry:" );
    }

    let ExperienceAmount = parseInt(szArgs[1]);

    let GetTargetData = await bot.getScore.get(GuildMember.user.id, GuildGetID);

    if(!GetTargetData)
    {
        await GetDatabaseData.CookiesUpdate(GuildGetID, GuildMember.user.id, 0);
    }

    GetTargetData.points += ExperienceAmount;

    let TargetLevel = Math.floor(0.1 * Math.sqrt(GetTargetData.points));

    GetTargetData.level = TargetLevel;
    await bot.setScore.run(GetTargetData);

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Admin Log", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(2003199)
    .setDescription("**" + user + "** gave **" + GuildMember + "** **" + ExperienceAmount + "** XP :trophy: !\n\n\n" + GuildMember + "'s level is now: **" + TargetLevel + "** :blush: !")
    .setThumbnail("https://i.imgur.com/p6nQ6Dk.jpg")
    .setFooter("Used by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
    .setTimestamp();

    await message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "givexp"
};