const Discord = require("discord.js");

const RandomColorsPurge =
[
    9699539,
    4915330,
    255,
    65280,
    16776960,
    16744192,
    16711680,
    13189184
];

module.exports.run = async (bot, message, args) =>
{
    if(!message.member.hasPermission("ADMINISTRATOR"))
    {
        return await message.channel.send(":no_entry: You can't mate! Fucking biblical... :laughing: :no_entry:");
    }

    await message.delete().then(async () =>
    {
        const user = message.author;

        const fetched = await message.channel.fetchMessages({ limit: 99 });
        await message.channel.bulkDelete(fetched).catch(error => message.reply(`:no_entry_sign: ${error} :no_entry_sign:`));

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setColor(RandomColorsPurge[Math.floor(Math.random() * RandomColorsPurge.length)])
        .setDescription(":earth_africa: :x: :regional_indicator_c::regional_indicator_h::regional_indicator_a::regional_indicator_t:     :regional_indicator_p::regional_indicator_u::regional_indicator_r::regional_indicator_g::regional_indicator_e::regional_indicator_d: :x: :earth_africa:\n\n")
        .addField("Chat has been PURGED due to high number of messages", "NOOOOO! My cookies! 👀")
        .setImage("https://i.imgur.com/UCuPAjF.jpg")
        .setFooter("Char Purged by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
        .setTimestamp()

        await message.channel.send({ embed: DiscordRichEmbed });
    });
};

module.exports.help =
{
    name: "clear"
};