const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports.run = async (bot, message, args) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :facepalm:  :no_entry:");
    }

    message.channel.startTyping();

    let GetUserAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

    let i1 = await Jimp.read(GetUserAvatar);
    let i2 = await Jimp.read("./BOTImages/WorseHitler/hitler.jpg");

    await Promise.all([i1, i2]).then(async images =>
    {
        await images[0].scaleToFit(70, 70).quality(100);
        await images[1].composite(images[0], 28, 27).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                return console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
            }

            await message.channel.send(new Discord.Attachment(buffer, "worsethanhitler.png")).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "hitler"
};