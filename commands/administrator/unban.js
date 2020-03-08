const Discord = require("discord.js");
const IgnoreCase = require("ignore-case");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(!message.member.hasPermission("BAN_MEMBERS"))
    {
        return message.channel.send(":no_entry: You can't mate! You need ``BAN_MEMBERS`` permission for this command. :laughing: :no_entry:");
    }

    const user = message.author;
    const szSearch = szArgs.join(" ");

    if(!szSearch || CustomFunctions.isEmpty(szSearch))
    {
        return message.reply(" :no_entry: Please provide a valid :id: or ``name``  :no_entry:");
    }

    try
    {
        let Bans = await message.guild.fetchBans();
        let Banned = Bans.find(userbanned => IgnoreCase.equals(userbanned.user.username, szSearch)) || Bans.find(userbanned => userbanned.user.id === szSearch);

        if(!Banned)
        {
            return message.reply(" I could not find a banned user by this :id: or ``name``.");
        }

        await message.guild.members.unban(Banned.user.id, `Ban appealed by ${user.username} using (UNBAN) command from ${bot.user.tag}`);

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Admin Log", bot.user.displayAvatarURL())
        .setColor(2003199)
        .setDescription(`**${user}** removed the **BAN** from **${Banned.user.tag}** :smirk:`)
        .setThumbnail("https://i.imgur.com/p6nQ6Dk.jpg")
        .setFooter("Used by: @" + user.username, user.displayAvatarURL())
        .setTimestamp();

        message.channel.send({ embed: DiscordRichEmbed });
    }

    catch(err)
    {
        return message.channel.send("<:cookiemonsta:634866060465537034> **|** I have encountered an error during **UNBAN** command: ``" + err.message + "``\n<:cookiemonsta:634866060465537034> **|** You might want to take a look here: (https://tutyamxx.github.io/cookie-monsta-website/tutorial.html)");
    }
};

module.exports.help =
{
    name: "unban"
};