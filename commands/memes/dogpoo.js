const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports.run = (bot, message, args) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    message.channel.startTyping();

    const RandomDegrees = Math.floor((Math.random() * 360) + 0);
    let GetUserAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

    let i1 = Jimp.read(GetUserAvatar);
    let i2 = Jimp.read("./BOTImages/DogPoo/dogpoop.png");

    Promise.all([i1, i2]).then((images) =>
    {
        images[0].scaleToFit(50, 50).rotate(RandomDegrees).color([{ apply: 'red', params: [160] }]).color([{ apply: 'green', params: [82] }]).color([{ apply: 'blue', params: [45] }]).quality(100);
        images[1].composite(images[0], 186, 249).quality(100).getBuffer(Jimp.MIME_PNG, (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Dog Poo)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
            }

            message.channel.send(new Discord.Attachment(buffer, "dogpoo.png")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "dogpoo"
};