const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    const GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :facepalm:  :no_entry:");
    }

    let TextComment = szArgs.slice(1).join(" ");

    if(CustomFunctions.isEmpty(TextComment))
    {
        return message.reply(" :no_entry: you need to add something to comment, try again. :no_entry:");
    }

    message.channel.startTyping();

    axios.get(encodeURI(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${GuildMember.user.displayAvatarURL({ format: "png", size: 2048 })}&text=${TextComment}&username=${GuildMember.user.username}`)).then((response) =>
    {
        message.channel.send(new Discord.MessageAttachment(encodeURI(response.data.message), "phub.png")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Something went horribly wrong! Try again later?  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "phub"
};