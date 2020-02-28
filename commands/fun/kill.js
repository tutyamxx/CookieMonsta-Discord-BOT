const Discord = require("discord.js");

const RandomKillGifs =
[
    "https://i.imgur.com/B1wbSq6.gif", "https://i.imgur.com/wVeo8RI.gif",
    "https://i.imgur.com/UtjQAIq.gif", "https://i.imgur.com/1z6UlXX.gif",
    "https://i.imgur.com/nlwqdWX.gif", "https://i.imgur.com/hwCTise.gif",
    "https://i.imgur.com/TnHjP4m.gif", "https://i.imgur.com/lT3E9cO.gif",
    "https://i.imgur.com/3sJ195R.gif", "https://i.imgur.com/k4vip37.gif",
    "https://i.imgur.com/rL3AP9A.gif", "https://i.imgur.com/6nPK0OL.gif",
    "hhttps://i.imgur.com/vLoT6u9.gif", "https://i.imgur.com/BAn0RQm.gif",
    "https://i.imgur.com/9TGJRts.gif", "https://i.imgur.com/cyL7qGC.gif",
    "https://i.imgur.com/ehjdq3p.gif", "https://i.imgur.com/vv54PU6.gif",
    "https://i.imgur.com/R5Ssn4n.gif", "https://i.imgur.com/UovBmdk.gif",
    "https://i.imgur.com/yYkfNqs.gif", "https://i.imgur.com/7f93Unw.gif",
    "https://i.imgur.com/enFEC3m.gif", "https://i.imgur.com/KkNHLVM.gif",
    "https://i.imgur.com/wFUfQj8.gif", "https://i.imgur.com/7Kt75bH.gif",
    "https://i.imgur.com/F9TZoA0.gif", "https://i.imgur.com/ErltK0R.gif",
    "https://i.imgur.com/kcB5Jj3.gif", "https://i.imgur.com/7OHssc1.gif",
    "https://i.imgur.com/6YjN3Az.gif", "https://i.imgur.com/Pt1mgMU.gif",
    "https://i.imgur.com/qF5vdN0.gif", "https://i.imgur.com/pEU0XFO.gif",
    "https://i.imgur.com/CNzflH0.gif", "https://i.imgur.com/nqbpu5T.gif"
];

const RandomKillTypes =
[
    "DISGRACEFULLY",
    "WITH FATALITY",
    "IN COLD BLOOD",
    "WITH NO MERCY",
    "MERCILESS",
    "DISGUSTINGLY",
    "IN A NASTY BLOODY WAY",
    "IN A GORY WAY",
    "WITH NO BLOOD DROPPED"
];

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(GuildMember.user === user)
    {
        return message.reply(" why would you kill yourself? There are plenty of people here available to kill... :face_palm:");
    }

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Kill Confirmed", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(16711680)
    .setDescription(user + "  ***KILLED***  " + GuildMember.user + " ***" + RandomKillTypes[Math.floor(Math.random() * RandomKillTypes.length)] + "***  !")
    .setImage(RandomKillGifs[Math.floor(Math.random() * RandomKillGifs.length)])
    .setFooter("Used by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

    message.channel.send({ embed: DiscordRichEmbed });
};

module.exports.help =
{
    name: "kill"
};