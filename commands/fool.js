
const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports.run = async (bot, message, szArgs) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(message.isMentioned(bot.user))
    {
        return await message.reply(" :no_entry: no, you are! :joy::joy::joy:  :no_entry:");
    }

    message.channel.startTyping();

    let GetUserAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

    let i1 = Jimp.read(GetUserAvatar);
    let i2 = Jimp.read(GetUserAvatar);
    let i3 = Jimp.read("./BOTImages/CookieFool/fool.png");

    Promise.all([i1, i2, i3]).then(async images =>
    {
        await images[0].resize(170, 150).quality(100);
        await images[1].resize(130, 110).rotate(4).quality(100);

        await images[2].composite(images[0], 136, 148).composite(images[1], 128, 637).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
            }

            await message.channel.send(new Discord.Attachment(buffer, "fool.jpeg")).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "fool"
};
