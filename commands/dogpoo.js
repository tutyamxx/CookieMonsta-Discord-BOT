
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

    const RandomDegrees = Math.floor((Math.random() * 360) + 0);
    let GetUserAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

    let i1 = Jimp.read(GetUserAvatar);
    let i2 = Jimp.read("./BOTImages/DogPoo/dogpoop.png");

    Promise.all([i1, i2]).then(async images =>
    {
        await images[0].scaleToFit(50, 50).rotate(RandomDegrees).color([{ apply: 'red', params: [160] }]).color([{ apply: 'green', params: [82] }]).color([{ apply: 'blue', params: [45] }]).quality(100);
        await images[1].composite(images[0], 186, 249).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
            }

            await message.channel.send(new Discord.Attachment(buffer, "dogpoo.png")).then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "dogpoo"
};
