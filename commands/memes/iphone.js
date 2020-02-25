const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = async (bot, message, args) =>
{
    const GuildMember = message.mentions.members.first();

    if (!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :facepalm:  :no_entry:");
    }

    await message.channel.startTyping();

    const GetUserAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

    await axios.get(encodeURI("https://nekobot.xyz/api/imagegen?type=iphonex&url=") + GetUserAvatar).then(async (response) =>
    {
        await message.channel.send(new Discord.Attachment(encodeURI(await response.data.message), "iphone.png")).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Someone broke our iPhone :iphone:, contact Apple? :joy:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "iphone"
};