const Discord = require("discord.js");
const Jimp = require("jimp");
const gm = require("gm");

module.exports.run = async (bot, message, szArgs) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));;
    }

    message.channel.startTyping();

    let MemberAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;
    let ImageURL = await Jimp.read(MemberAvatar);

    const szDrawnImageName = "draw.png";

    ImageURL.getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
    {
        if(err)
        {
            await message.channel.stopTyping(true).catch(err => message.channel.stopTyping(true));
            console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");

            return;
        }

        await gm(buffer).border(1, 1).borderColor("black").charcoal(0.1).coalesce().despeckle().autoOrient().toBuffer(szDrawnImageName, async (err, buffer2) =>
        {
            if(err)
            {
                await message.channel.stopTyping(true).catch(err => message.channel.stopTyping(true));
                console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");

                return;
            }

            await message.channel.send(new Discord.Attachment(buffer2, szDrawnImageName)).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "draw"
};