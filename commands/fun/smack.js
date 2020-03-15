const Discord = require("discord.js");
const BotConfig = require("../../config/botconfig.json");
const ameClient = require("amethyste-api");

const ameApi = new ameClient(BotConfig.AmeAPI_Token.trim());

module.exports.run = (bot, message, args) =>
{
    const user = message.author;
    const GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(GuildMember.user === user)
    {
        return message.reply(" why would you smack yourself? There are plenty of people here available to smack... :face_palm:");
    }

    if(GuildMember.user.bot)
    {
        return message.reply(" :no_entry: come on bruh, why BOT's? We are lonely machines... :robot:  :no_entry:");
    }

    message.channel.startTyping();

    ameApi.generate("batslap", { avatar: user.displayAvatarURL({ format: "png", size: 2048 }), url: GuildMember.user.displayAvatarURL({ format: "png", size: 2048 }) }).then((szImageBuffer) =>
    {
        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Smack!", bot.user.displayAvatarURL())
        .setColor(16711680)
        .setDescription(":flower_playing_cards: :regional_indicator_w::regional_indicator_t::regional_indicator_f:          :regional_indicator_s::regional_indicator_m::regional_indicator_a::regional_indicator_c::regional_indicator_k::regional_indicator_e::regional_indicator_d: :flower_playing_cards:")
        .addField(`**${GuildMember.user.username}** has been SMACKED by **${user.username}** !`, "SHUT THE FUCK UP BITCH")
        .attachFiles({ attachment: szImageBuffer, name: "wtf_smacked.png" })
        .setImage("attachment://wtf_smacked.png")
        .setFooter("Requested by: @" + user.username, user.displayAvatarURL())

        message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Uhh, something went wrong, try again? :confused:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
}

module.exports.help =
{
    name: "smack"
};