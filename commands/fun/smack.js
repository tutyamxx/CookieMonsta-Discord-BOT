const Discord = require("discord.js");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(GuildMember.user === user)
    {
        return message.reply(`why would you smack yourself? There are plenty of people here available to smack... :face_palm:`);
    }

    if(GuildMember.user.bot)
    {
        return message.reply(" :no_entry: come on bruh, why BOT's? We are lonely machines... :robot:  :no_entry:");
    }

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Smack!", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(16711680)
    .setDescription(":flower_playing_cards: :regional_indicator_w::regional_indicator_t::regional_indicator_f:          :regional_indicator_s::regional_indicator_m::regional_indicator_a::regional_indicator_c::regional_indicator_k::regional_indicator_e::regional_indicator_d: :flower_playing_cards:")
    .addField("**" + GuildMember.user.username + "** has been SMACKED by **" + user.username + "** !", "SHUT THE FUCK UP BITCH")
    .setImage("https://i.imgur.com/wy3HT5E.jpg")
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

    message.channel.send({ embed: DiscordRichEmbed });
}

module.exports.help =
{
    name: "smack"
};