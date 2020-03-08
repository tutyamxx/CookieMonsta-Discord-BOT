const Discord = require("discord.js");

module.exports.run = (bot, message, args) =>
{
    const GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention someone to poke :boy:  :no_entry:");
    }

    if(GuildMember.user === message.author)
    {
        return message.reply(" oh my god why would you poke yourself? :joy:");
    }

    message.channel.send(`<:cookiemonsta:634866060465537034> **|** ${message.author} just poked :point_right: ${GuildMember} <:zoomeyes:685988596053835796>`);
};

module.exports.help =
{
    name: "poke"
};