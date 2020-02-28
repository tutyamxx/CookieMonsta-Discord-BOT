const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    if(!message.member.hasPermission("KICK_MEMBERS"))
    {
        return message.channel.send(":no_entry: You can't mate! You need ``KICK_MEMBERS`` permission for this command. :laughing: :no_entry:");
    }

    const user = message.author;
    let KickMember = message.mentions.members.first();

    if(!KickMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(message.author.id !== "266677298051153920")
    {
        return message.reply(" :no_entry_sign: nah, I can't kick my own Dev <:Bruh:635506622478942219>  :no_entry_sign:");
    }

    if(KickMember.user === user)
    {
        return message.reply(" :no_entry: but...... why ( ͝° ͜ʖ͡°) ? :face_palm:  :no_entry:");
    }

    if(!KickMember.kickable)
    {
        return message.reply(" :no_entry: nah, it seems that I can't kick this user! :no_entry:");
    }

    // --| Skip @mention, remove commas from reason argument and also trim it.
    let szReason = szArgs.slice(1).join(' ').trim();

    KickMember.kick(szReason).then((member) =>
    {
        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Admin Log", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor(2003199)
        .setDescription("**" + user + "** KICKED **" + KickMember.user + "** out from this server :rage:\n\n\n**Reason:**   " + (CustomFunctions.isEmpty(szReason) ? "No reason added." : szReason))
        .setThumbnail("https://i.imgur.com/p6nQ6Dk.jpg")
        .setFooter("Used by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
        .setTimestamp();

        message.channel.send({ embed: DiscordRichEmbed });

    }).catch((error) =>
    {
        message.channel.send("<:cookiemonsta:634866060465537034> **|** I have encountered an error during the **KICK** command: ``" + error.message + "``\n<:cookiemonsta:634866060465537034> **|** You might want to take a look here: (https://tutyamxx.github.io/cookie-monsta-website/tutorial.html)");
    });
};

module.exports.help =
{
    name: "kick"
};