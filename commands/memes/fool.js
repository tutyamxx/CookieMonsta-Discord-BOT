const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports.run = (bot, message, szArgs) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(message.isMentioned(bot.user))
    {
        return message.reply(" :no_entry: no, you are! :joy::joy::joy:  :no_entry:");
    }

    message.channel.startTyping();

    const GetUserAvatar = GuildMember.user.displayAvatarURL({ format: "png", size: 2048 });

    let i1 = Jimp.read(GetUserAvatar);
    let i2 = Jimp.read(GetUserAvatar);
    let i3 = Jimp.read("./BOTImages/CookieFool/fool.png");

    Promise.all([i1, i2, i3]).then((images) =>
    {
        images[0].resize(170, 150).quality(100);
        images[1].resize(130, 110).rotate(4).quality(100);

        images[2].composite(images[0], 136, 148).composite(images[1], 128, 637).quality(100).getBuffer(Jimp.MIME_PNG, (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Fool)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
            }

            message.channel.send(new Discord.MessageAttachment(buffer, "fool.jpeg")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "fool"
};