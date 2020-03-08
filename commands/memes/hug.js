const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    if(GuildMember.user === user)
    {
        return message.reply(`are you that lonely? :sob: Come here bro :hugging:`);
    }

    message.channel.startTyping();

    const GetUserAvatar = user.displayAvatarURL({ format: "png", size: 2048 });
    const GetTargetAvatar = GuildMember.user.displayAvatarURL({ format: "png", size: 2048 });

    let i1 = Jimp.read(GetTargetAvatar);
    let i2 = Jimp.read(GetUserAvatar);
    let i3 = Jimp.read("./BOTImages/Hugs/hugpat.png");

    Promise.all([i1, i2, i3]).then((images) =>
    {
        images[0].resize(120, Jimp.AUTO).quality(100).rotate(-330);
        images[1].resize(120, Jimp.AUTO).quality(100).rotate(65).flip(true, false);

        images[2].composite(images[0], 33, 19).composite(images[1], 132, 117).quality(100).dither565().getBuffer(Jimp.MIME_PNG, (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Hug)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
            }

            message.channel.send("<:pepoComfy:634867566665400324> Hello darkness my old friend... <:pepoComfy:634867566665400324> \n\n**" + user.username + "** sends a hug to **" + GuildMember.user.username + "**!", { files: [buffer] }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "hug"
};