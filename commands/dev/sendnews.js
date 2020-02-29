const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");
const GetChannelDefault = require("../../functions/defaultchannel.js");

const RandomEmojiNews =
[
    ":smiley:", ":yum:", ":sweat_smile:", ":upside_down:", ":blush:", ":slight_smile:", ":smirk:", ":boy:", ":v:", ":ok_hand:", ":call_me:"
];

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    if(user.id !== "266677298051153920")
    {
        return message.reply(" :no_entry_sign: you're not the Dev pleb :facepalm:  :no_entry_sign:");
    }

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: you need to enter a message in order to send it! :no_entry:");
    }

    let NewsTextFromDev = szArgs.join(" ");
    let guildList = await bot.guilds.array();

    try
    {
        guildList.forEach(async (guild) =>
        {
            let cChannel = await GetChannelDefault.getDefaultChannel(guild);

            if(cChannel && cChannel.permissionsFor(guild.me).has('SEND_MESSAGES'))
            {
                const DiscordRichEmbed = new Discord.RichEmbed()
                .setAuthor("Cookie Monsta | Announcement Board!", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
                .setColor(16777215)
                .setDescription(":label: **From:** " + user.tag + "\n\n\n:desktop: **To:** All guilds." + "\n\n\n\n" + ":newspaper: **Message:** " + NewsTextFromDev + " " + RandomEmojiNews[Math.floor(Math.random() * RandomEmojiNews.length)] + "\n")
                .setThumbnail("https://i.imgur.com/Lfm6maV.jpg")
                .setTimestamp()
                .setFooter("This message has been sent to every guild!")

                cChannel.send({ embed: DiscordRichEmbed });
            }
        });
    }

    catch(err)
    {
        message.channel.send("I have encountered an error while sending news: **" + err.message + "**");
        console.log("\x1b[31m*\x1b[0m Error occured while sending news: \x1b[31m" + err.message + "\x1b[0m");
    }
};

module.exports.help =
{
    name: "sendnews"
};