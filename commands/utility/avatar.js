const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));;
    }

    message.channel.startTyping();

    let MemberAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

    const PicEmojis = [ ":mount_fuji:", ":mountain:", ":mountain_snow:", ":sunrise_over_mountains:", ":sunrise:", ":city_sunset:" ];
    const RandomPicEmojis = PicEmojis[Math.floor(Math.random() * PicEmojis.length)];

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | User Avatar ", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setDescription(RandomPicEmojis + " Here is " + GuildMember.user + "'s avatar :small_red_triangle_down:")
    .setColor(2003199)
    .setImage(MemberAvatar)
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

    await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
};

module.exports.help =
{
    name: "avatar"
};
