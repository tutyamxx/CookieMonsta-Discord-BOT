
module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(GuildMember.user === user)
    {
        return await message.reply(`why would you smack yourself? There are plenty of people here available to smack... :face_palm:`);
    }

    if(GuildMember.user.bot)
    {
        return await message.reply(" :no_entry: come on bruh, why BOT's? We are lonely machines... :robot:  :no_entry:");
    }

    await message.channel.send(
    {
        embed:
        {
            color: 16711680,

            author:
            {
                name: user.username,
                icon_url: (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL
            },

            description: ":flower_playing_cards: :regional_indicator_w::regional_indicator_t::regional_indicator_f:    :regional_indicator_s::regional_indicator_m::regional_indicator_a::regional_indicator_c::regional_indicator_k::regional_indicator_e::regional_indicator_d: :flower_playing_cards:",

            fields:
            [
                {
                    name: "@" + GuildMember.user.username + " has been SMACKED by @" + user.username + " !",
                    value: "SHUT THE FUCK UP BITCH",
                }
            ],

            image:
            {
                url: "https://i.imgur.com/wy3HT5E.jpg",
                width: 800,
                height: 800
            },
        }
    });
};

module.exports.help =
{
    name: "smack"
};
