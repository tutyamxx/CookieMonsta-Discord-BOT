const Discord = require("discord.js");
const Jimp = require("jimp");

const szRandomJailImages =
[
    "./BOTImages/Jail/jail.png",
    "./BOTImages/Jail/jail2.png",
    "./BOTImages/Jail/jail3.png"
];

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
    let i2 = await Jimp.read(szRandomJailImages[Math.floor(Math.random() * szRandomJailImages.length)]);

    await Promise.all([i1, i2]).then(async (images) =>
    {
        await images[0].resize(400, Jimp.AUTO).quality(100);
        await images[1].resize(400, Jimp.AUTO).quality(100);

        await images[1].composite(images[0], 0, 0, { mode: Jimp.BLEND_DESTINATION_OVER }).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
            }

            await message.channel.send(new Discord.Attachment(buffer, "jail.png")).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        });
    });
}

module.exports.help =
{
    name: "jail"
};