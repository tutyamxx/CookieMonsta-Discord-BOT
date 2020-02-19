const Discord = require("discord.js");
const Jimp = require("jimp");
const gm = require("gm").subClass({ imageMagick: true });
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    let SearchQuery = szArgs.slice(0).join(' ');

    if(CustomFunctions.isEmpty(SearchQuery))
    {
        return await message.reply(" :no_entry: you need to add some text m8. :no_entry:");
    }

    if(SearchQuery.length > 27)
    {
        return await message.reply(" :no_entry: please don't exceed **27** characters in your text! :no_entry:");
    }

    if(message.mentions.members.first())
    {
        return await message.reply(" :no_entry: please don't mention people in your text! :no_entry:");
    }

    await message.channel.startTyping();

    let GetUserAvatar = (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL;

    let i1 = await Jimp.read(GetUserAvatar);
    let i2 = await Jimp.read("./BOTImages/ChangeMyMind/changemymind.jpg");

    await Promise.all([i1, i2]).then(async (images) =>
    {
        await images[0].resize(40, 40).rotate(9);
        await images[1].composite(images[0], 175, 43).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
            }

            await gm(buffer)
            .font("Helvetica.ttf", 14)
            .fill("#111111")
            .draw(["rotate -7 text 195, 290 '" + SearchQuery.replace(/'/g, "`").trim() + "'"])
            .toBuffer("changemymind.png", async (err, buffer2) =>
            {
                if(err)
                {
                    console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
                }

                await message.channel.send(new Discord.Attachment(buffer2, "changemymind.png")).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
            });
        });
    });
};

module.exports.help =
{
    name: "changemymind"
};