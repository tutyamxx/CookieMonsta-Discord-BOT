const Discord = require("discord.js");

const RandomColorsPurge = [ 9699539, 4915330, 255, 65280, 16776960, 16744192, 16711680, 13189184 ];

module.exports.run = async (bot, message, szArgs) =>
{
    if(!message.member.hasPermission("ADMINISTRATOR"))
    {
        return message.channel.send(":no_entry: You can't mate! You need ``ADMINISTRATOR`` permission for this command. :laughing: :no_entry:");
    }

    const iMessagesAmount = parseInt(szArgs[0]);

    await message.delete().then(async () =>
    {
        const user = message.author;
        const ArrayFetchedMessages = await message.channel.messages.fetch({ before: message.id, limit: (isNaN(iMessagesAmount) ? 100 : ((iMessagesAmount > 100) ? 100 : iMessagesAmount)) });

        await message.channel.bulkDelete(ArrayFetchedMessages).catch((error) =>
        {
            return message.reply(`:no_entry_sign: ${error.message} :no_entry_sign:`);
        });

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setColor(RandomColorsPurge[Math.floor(Math.random() * RandomColorsPurge.length)])
        .setDescription(":earth_africa: :x: :regional_indicator_c::regional_indicator_h::regional_indicator_a::regional_indicator_t:     :regional_indicator_p::regional_indicator_u::regional_indicator_r::regional_indicator_g::regional_indicator_e::regional_indicator_d: :x: :earth_africa:\n\n")
        .addField("Chat has been PURGED due to high number of messages", "NOOOOO! My cookies! 👀")
        .setImage("https://i.imgur.com/UCuPAjF.jpg")
        .setFooter("Chat Purged by: @" + user.username, user.displayAvatarURL())
        .setTimestamp()

        message.channel.send({ embed: DiscordRichEmbed }).then(async (msg) => await msg.delete({ timeout: 5000 }).catch(e => false)).catch(e => false);

    }).catch((error) =>
    {
        message.channel.send("<:cookiemonsta:634866060465537034> **|** I have encountered an error during the **CLEAR** command: ``" + error.message + "``\n<:cookiemonsta:634866060465537034> **|** You might want to take a look here: (https://tutyamxx.github.io/cookie-monsta-website/tutorial.html)");
    });
};

module.exports.help =
{
    name: "clear"
};