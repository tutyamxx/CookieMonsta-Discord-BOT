
const Discord = require("discord.js");

const Jimp = require("jimp");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));;
    }

    message.channel.startTyping();

    let MemberAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

    let i1 = Jimp.read(MemberAvatar);

    let i2 = Jimp.read("./BOTImages/DeepFry/okhand.png");
    let i3 = Jimp.read("./BOTImages/DeepFry/100emoji.png");
    let i4 = Jimp.read("./BOTImages/DeepFry/laughingemoji.png");
    let i5 = Jimp.read("./BOTImages/DeepFry/fireemoji.png");
    let i6 = Jimp.read("./BOTImages/DeepFry/cry.png");

    Promise.all([i1, i2, i3, i4, i5, i6]).then(async images =>
    {
        await images[0].resize(400, 400).dither565().normalize().opaque()

        await images[1].resize(70, Jimp.AUTO).rotate(Math.floor(Math.random() * 360) + 1)
        await images[2].resize(80, Jimp.AUTO).rotate(Math.floor(Math.random() * 360) + 1)
        await images[3].resize(100, Jimp.AUTO).rotate(Math.floor(Math.random() * 360) + 1)
        await images[4].resize(Math.floor(Math.random() * 75) + 50, Jimp.AUTO).rotate(Math.floor(Math.random() * 360) + 1)
        await images[5].resize(30, Jimp.AUTO).rotate(Math.floor(Math.random() * 360) + 1)

        await images[0].composite(images[1], Math.floor(Math.random() * 70) + 10, 30)
        .composite(images[2], 280, 33)
        .composite(images[3], 28, 270)
        .composite(images[4], 269, 250)
        .composite(images[5], 230, 196)
        .contrast(1).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
            }

            await message.channel.send(new Discord.Attachment(buffer, "deepfry.png")).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        });
    });
}

module.exports.help =
{
    name: "deepfry"
};
