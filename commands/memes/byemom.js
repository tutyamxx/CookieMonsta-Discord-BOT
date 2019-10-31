const Discord = require("discord.js");
const Jimp = require("jimp");
const gm = require("gm").subClass({ imageMagick: true });
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return await message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    let SearchQuery = szArgs.slice(1).join(' ');

    if(CustomFunctions.isEmpty(SearchQuery))
    {
        return await message.reply(" :no_entry: you need to add something to search on Google, try again. :no_entry:");
    }

    if(SearchQuery.length > 34)
    {
        return await message.reply(" :no_entry: please don't exceed **34** characters in your Google search query! :no_entry:");
    }

    message.channel.startTyping();

    let GetUserAvatar = (GuildMember.user.avatarURL === null) ? GuildMember.user.defaultAvatarURL : GuildMember.user.avatarURL;

    let i1 = await Jimp.read(GetUserAvatar);
    let i2 = await Jimp.read(GetUserAvatar);
    let i3 = await Jimp.read("./BOTImages/ByeMom/byemom.png");

    await Promise.all([i1, i2, i3]).then(async images =>
    {
        await images[0].resize(70, 70).quality(100);
        await images[1].resize(125, 125).quality(100);

        await images[2].composite(images[0], 532, 9).composite(images[1], 76, 326).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                await message.channel.stopTyping(true).catch(err => message.channel.stopTyping(true));
                console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");

                return;
            }

            await gm(buffer)
            .font("Helvetica.ttf", 20)
            .fill("#111111")
            .draw(["rotate -25 text 70, 703 '" + SearchQuery.replace(/'/g, "`").trim() + "'"])
            .toBuffer("byemom.png", async function (err, buffer2)
            {
                if(err)
                {
                    await message.channel.stopTyping(true).catch(err => message.channel.stopTyping(true));
                    console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");

                    return;
                }

                await message.channel.send(new Discord.Attachment(buffer2, "byemom.png")).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
            });
        });
    });
};

module.exports.help =
{
    name: "byemom"
};