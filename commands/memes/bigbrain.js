const Discord = require("discord.js");
const Jimp = require("jimp");
const gm = require("gm");

module.exports.run = async (bot, message, szArgs) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    }

    await message.channel.startTyping();

    let MemberAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;
    let ImageURL = await Jimp.read(MemberAvatar);

    const szImageName = "bigbrain.png";

    ImageURL.getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
    {
        if(err)
        {
            console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
        }

        gm(buffer).implode(-2.9).autoOrient().toBuffer(szImageName, async (err, buffer2) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
            }

            await message.channel.send(new Discord.Attachment(buffer2, szImageName)).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "bigbrain"
};