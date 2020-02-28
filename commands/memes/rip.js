const Discord = require("discord.js");
const Jimp = require("jimp");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, args) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    message.channel.startTyping();

    let GetUserAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;
    let UsernameText = GuildMember.user.username.replace(/[^a-zA-Z0-9À-ž_ -]/g, "").toString();

    Jimp.read("./BOTImages/RIP/rip.png").then((image) =>
    {
        Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then((font) =>
        {
            let totalWidth = CustomFunctions.measureText(font, UsernameText);

            Jimp.read(GetUserAvatar).then((image2) =>
            {
                image2.resize(70, 70).greyscale();
                image.print(font, Math.floor(image.bitmap.width / 2 - totalWidth / 2), 160, UsernameText).composite(image2, (image.bitmap.width / 2) - 37, 190).getBuffer(Jimp.MIME_PNG, (err, buffer) =>
                {
                    if(err)
                    {
                        console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(RIP)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
                    }

                    message.channel.send(new Discord.Attachment(buffer, "rip.png")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
                });
            });
        });
    });
};

module.exports.help =
{
    name: "rip"
};