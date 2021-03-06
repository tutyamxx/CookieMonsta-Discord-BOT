const Discord = require("discord.js");
const Jimp = require("jimp");
const gm = require("gm");

module.exports.run = (bot, message, args) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    }

    message.channel.startTyping();

    let i1 = Jimp.read(GuildMember.user.displayAvatarURL({ format: "png", size: 2048 }));
    let i2 = Jimp.read("./BOTImages/DeepFry/okhand.png");
    let i3 = Jimp.read("./BOTImages/DeepFry/100emoji.png");
    let i4 = Jimp.read("./BOTImages/DeepFry/laughingemoji.png");
    let i5 = Jimp.read("./BOTImages/DeepFry/fireemoji.png");
    let i6 = Jimp.read("./BOTImages/DeepFry/cry.png");

    const szDeepFryImage = "deepfry.png";

    const iRandomDesaturation = [0, 5, 0, 70, 100, 0, 3];
    const iRandomPosterize = [5, 8];
    const iRandomInvert = Math.floor(Math.random() * 6);

    Promise.all([i1, i2, i3, i4, i5, i6]).then((images) =>
    {
        images[0].resize(400, 400).dither565().normalize().opaque();

        images[1].resize(70, Jimp.AUTO).rotate(Math.floor(Math.random() * 360) + 1);
        images[2].resize(80, Jimp.AUTO).rotate(Math.floor(Math.random() * 360) + 1);
        images[3].resize(100, Jimp.AUTO).rotate(Math.floor(Math.random() * 360) + 1);
        images[4].resize(Math.floor(Math.random() * 75) + 50, Jimp.AUTO).rotate(Math.floor(Math.random() * 360) + 1);
        images[5].resize(30, Jimp.AUTO).rotate(Math.floor(Math.random() * 360) + 1);

        images[0].composite(images[1], Math.floor(Math.random() * 70) + 10, 30)
        .composite(images[2], 280, 33)
        .composite(images[3], 28, 270)
        .composite(images[4], 269, 250)
        .composite(images[5], 230, 196)
        .color([{ apply: "desaturate", params: [iRandomDesaturation[Math.floor(Math.random() * iRandomDesaturation.length)]] }])
        .posterize(iRandomPosterize[Math.floor(Math.random() * iRandomPosterize.length)])
        .quality(100)
        .getBuffer(Jimp.MIME_PNG, (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Deepfry)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
            }

            gm(buffer).noise("impulse").sharpen(3, 3).toBuffer(szDeepFryImage, async (err, buffer2) =>
            {
                if(err)
                {
                    console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Deepfry)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
                }

                if(iRandomInvert === 1)
                {
                    const iFriedImage = await Jimp.read(buffer2);

                    iFriedImage.invert().getBuffer(Jimp.MIME_PNG, (err, buffer3) =>
                    {
                        if(err)
                        {
                            console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Deepfry)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
                        }

                        message.channel.send(new Discord.MessageAttachment(buffer3, szDeepFryImage)).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));

                    });
                }

                else
                {
                    message.channel.send(new Discord.MessageAttachment(buffer2, szDeepFryImage)).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
                }
            });
        });
    });
}

module.exports.help =
{
    name: "deepfry"
};