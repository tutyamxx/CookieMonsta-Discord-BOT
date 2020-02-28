const Discord = require("discord.js");

module.exports.run = (bot, message, args) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention someone to poke :boy:  :no_entry:");
    }

    if(GuildMember.user === message.author)
    {
        return message.reply(` oh my god why would you poke yourself? :joy:`);
    }

    message.channel.send(message.author + " just poked :point_right: " + GuildMember + "  :eyes:");
};

module.exports.help =
{
    name: "poke"
};