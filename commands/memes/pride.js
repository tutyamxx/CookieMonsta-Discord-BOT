const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports.run = async (bot, message, args) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));;
    }

    await message.channel.startTyping();

    let MemberAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

    let i1 = await Jimp.read(MemberAvatar);
    let i2 = await Jimp.read("./BOTImages/Pride/pride.png");

    await Promise.all([i1, i2]).then(async (images) =>
    {
        await images[0].resize(400, 400).quality(100);
        await images[1].resize(400, 400).quality(100);

        await images[1].composite(images[0], 0, 0, { mode: Jimp.BLEND_SOURCE_OVER, opacitySource: 0.2, opacityDest: 0.6 }).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
            }

            await message.channel.send(new Discord.Attachment(buffer, "pride.png")).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        });
    });
}

module.exports.help =
{
    name: "pride"
};