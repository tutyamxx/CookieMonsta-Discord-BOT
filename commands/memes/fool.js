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

    await message.channel.startTyping();

    let GetUserAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

    let i1 = await Jimp.read(GetUserAvatar);
    let i2 = await Jimp.read(GetUserAvatar);
    let i3 = await Jimp.read("./BOTImages/CookieFool/fool.png");

    await Promise.all([i1, i2, i3]).then(async (images) =>
    {
        await images[0].resize(170, 150).quality(100);
        await images[1].resize(130, 110).rotate(4).quality(100);

        await images[2].composite(images[0], 136, 148).composite(images[1], 128, 637).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
            }

            await message.channel.send(new Discord.Attachment(buffer, "fool.jpeg")).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "fool"
};