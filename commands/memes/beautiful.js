const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports.run = async (bot, message, args) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    message.channel.startTyping();

    const GetUserAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

    let i1 = await Jimp.read(GetUserAvatar);
    let i2 = await Jimp.read(GetUserAvatar);
    let i3 = await Jimp.read("./BOTImages/Beautiful/beautiful.png");

    await Promise.all([i1, i2, i3]).then(async images =>
    {
        await images[0].resize(82, 93).quality(100);
        await images[1].resize(83, 97).quality(100);

        await images[2].composite(images[0], 217, 15).composite(images[1], 206, 213).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                await message.channel.stopTyping(true).catch(err => message.channel.stopTyping(true));
                console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");

                return;
            }

            await message.channel.send(new Discord.Attachment(buffer, "beautiful.png")).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "beautiful"
};