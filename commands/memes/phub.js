const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    const GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :facepalm:  :no_entry:");
    }

    let TextComment = szArgs.slice(1).join(" ");

    if(CustomFunctions.isEmpty(TextComment))
    {
        return await message.reply(" :no_entry: you need to add something to comment, try again. :no_entry:");
    }

    await message.channel.startTyping();

    const GetUserAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;
    const GetUserUsername = GuildMember.user.username;

    await axios.get(encodeURI(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${GetUserAvatar}&text=${TextComment}&username=${GetUserUsername}`)).then(async (response) =>
    {
        await message.channel.send(new Discord.Attachment(encodeURI(await response.data.message), "phub.png")).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Something went horribly wrong! Try again later?  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "phub"
};