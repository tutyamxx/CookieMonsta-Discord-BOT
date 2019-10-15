
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention someone to poke :boy:  :no_entry:");
    }

    if(GuildMember.user === message.author)
    {
        return await message.reply(` oh my god why would you poke yourself? :joy:`);
    }

    await message.channel.send(message.author + " just poked :point_right: " + GuildMember + "  :eyes:");
};

module.exports.help =
{
    name: "poke"
};
