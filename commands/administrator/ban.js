const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    if(!message.member.hasPermission("BAN_MEMBERS"))
    {
        return message.channel.send(":no_entry: You can't mate! You need ``BAN_MEMBERS`` permission for this command. :laughing: :no_entry:");
    }

    const user = message.author;
    const BanMember = message.mentions.members.first();

    if(!BanMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(message.author.id !== "266677298051153920")
    {
        return message.reply(" :no_entry_sign: nah, I can't ban my own Dev <:Bruh:635506622478942219>  :no_entry_sign:");
    }

    if(BanMember.user === user)
    {
        return message.reply(" :no_entry: but...... why ( ͝° ͜ʖ͡°) ? :face_palm:  :no_entry:");
    }

    if(!BanMember.bannable)
    {
        return message.reply(" :no_entry: nah, it seems that I can't ban this user! :no_entry:");
    }

    // --| Skip @mention, remove commas from reason argument and also trim it.
    const szReason = szArgs.slice(1).join(" ").trim();

    message.guild.members.ban(BanMember, { reason: szReason }).then((member) =>
    {
        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Admin Log", bot.user.displayAvatarURL())
        .setColor(2003199)
        .setDescription(`**${user}** **BANNED** **${BanMember.user}** out from this server :rage:\n\n\n**Reason:** ${(CustomFunctions.isEmpty(szReason) ? "No reason added." : szReason)}`)
        .setThumbnail("https://i.imgur.com/Y3C3kKF.png")
        .setFooter("Used by: @" + user.username, user.displayAvatarURL())
        .setTimestamp();

        message.channel.send({ embed: DiscordRichEmbed });

    }).catch((error) =>
    {
        message.channel.send("<:cookiemonsta:634866060465537034> **|** I have encountered an error during the **BAN** command: ``" + error.message + "``\n<:cookiemonsta:634866060465537034> **|** You might want to take a look here: (https://tutyamxx.github.io/cookie-monsta-website/tutorial.html)");
    });
};

module.exports.help =
{
    name: "ban"
};