const Discord = require("discord.js");
const axios = require("axios");

module.exports.run = (bot, message, args) =>
{
    const GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :facepalm:  :no_entry:");
    }

    message.channel.startTyping();

    axios.get(encodeURI(`https://nekobot.xyz/api/imagegen?type=baguette&url=${GuildMember.user.displayAvatarURL({ format: "png", size: 2048 })}`)).then((response) =>
    {
        message.channel.send(new Discord.MessageAttachment(encodeURI(response.data.message), "baguette.png")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Out of baguettes :french_bread: ! Oh noes, try again? :confused:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "baguette"
};