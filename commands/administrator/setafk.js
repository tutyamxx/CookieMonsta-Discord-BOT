const Discord = require("discord.js");

module.exports.run = (bot, message, szArgs) =>
{
    if(!message.member.hasPermission("MOVE_MEMBERS"))
    {
        return message.channel.send(":no_entry: You can't mate! You need `MOVE_MEMBERS` permission for this command. :laughing: :no_entry:");
    }

    const user = message.author;
    const TargetAFK = message.mentions.members.first();

    if(!TargetAFK)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    const GetTargetVoiceChannel = TargetAFK.voice.channel;

    if(!GetTargetVoiceChannel)
    {
        return message.reply(" :no_entry: nope, this user is not present in any voice channels!  :no_entry:");
    }

    const GetGuild = message.guild;

    if(GetGuild.available)
    {
        const GetGuildChannelAFK = GetGuild.afkChannelID;

        if(GetGuildChannelAFK === null)
        {
            return message.reply(" :no_entry: nope, I just can't move a member to a non-existing AFK channel! Try setting an AFK channel first? :thinking:   :no_entry:");
        }

        if(!GetTargetVoiceChannel)
        {
            return message.reply(" :no_entry: nope, this user is not present in any voice channels!  :no_entry:");
        }

        if(GetGuildChannelAFK === GetTargetVoiceChannel.id)
        {
            return message.reply(" :no_entry: nope, this user is already set **AFK** :zzz: !  :no_entry:");
        }

        TargetAFK.voice.setChannel(GetGuildChannelAFK);

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Admin Log", bot.user.displayAvatarURL())
        .setColor(2003199)
        .setDescription(`**${user}**  **MOVED**  **${TargetAFK.user}** to **AFK** channel :point_right: **${GetGuild.afkChannel.name}** !`)
        .setThumbnail("https://i.imgur.com/tRUSOjl.jpg")
        .setFooter("Used by: @" + user.username, user.displayAvatarURL())
        .setTimestamp();

        message.channel.send({ embed: DiscordRichEmbed });
    }
};

module.exports.help =
{
    name: "setafk"
};