
const Discord = require("discord.js");
const Jimp = require("jimp");

const CustomFunctions = require("../functions/funcs.js");

module.exports.run = async (bot, message, args) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    message.channel.startTyping();

    let GetUserAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;
    let UsernameText = GuildMember.user.username.toString();

    await Jimp.read("./BOTImages/RIP/rip.png").then(async (image) =>
    {
        Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(async function (font)
        {
            let totalWidth = CustomFunctions.measureText(font, UsernameText);

            Jimp.read(GetUserAvatar).then(async (image2) =>
            {
                await image2.resize(70, 70).greyscale();
                await image.print(font, Math.floor(image.bitmap.width / 2 - totalWidth / 2), 160, UsernameText).composite(image2, (image.bitmap.width / 2) - 37, 190).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
                {
                    if(err)
                    {
                        return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
                    }

                    await message.channel.send(new Discord.Attachment(buffer, "rip.png")).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
                });
            });
        });
    });
};

module.exports.help =
{
    name: "rip"
};
