const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(!message.member.hasPermission("BAN_MEMBERS"))
    {
        return await message.channel.send(":no_entry: You can't mate! Fucking biblical... :laughing: :no_entry:");
    }

    const user = message.author;
    let szSearch = szArgs.join(" ");

    if(!szSearch || CustomFunctions.isEmpty(szSearch))
    {
        return await message.reply(" :no_entry: Please provide a valid :id: or ``name``  :no_entry:");
    }

    try
    {
        let Bans = await message.guild.fetchBans();
        let Banned = Bans.get(szSearch) || Bans.find(u => u.tag.toLowerCase().includes(szSearch.toLowerCase()));

        if(!Banned)
        {
            return await message.reply(" I could not find a banned user by this :id: or ``name``.");
        }

        await message.guild.unban(Banned);

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Admin Log", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(2003199)
        .setDescription("**" + user + "** removed the **BAN** from **" + Banned.tag + "** :smirk:")
        .setThumbnail("https://i.imgur.com/p6nQ6Dk.jpg")
        .setFooter("Used by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
        .setTimestamp();

        await message.channel.send({ embed: DiscordRichEmbed });
    } 
    
    catch(err)
    {
        return await message.reply(" I have failed :scream: the **UNBAN** task, because of this reason: ``" + err.message + "``");
    }
};

module.exports.help =
{
    name: "unban"
};