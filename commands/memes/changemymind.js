const Discord = require("discord.js");
const Jimp = require("jimp");
const gm = require("gm").subClass({ imageMagick: true });
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    const user = message.author;

    let SearchQuery = szArgs.slice(0).join(" ");

    if(CustomFunctions.isEmpty(SearchQuery))
    {
        return message.reply(" :no_entry: you need to add some text m8. :no_entry:");
    }

    if(SearchQuery.length > 27)
    {
        return message.reply(" :no_entry: please don't exceed **27** characters in your text! :no_entry:");
    }

    if(message.mentions.members.first())
    {
        return message.reply(" :no_entry: please don't mention people in your text! :no_entry:");
    }

    message.channel.startTyping();

    let i1 = Jimp.read(user.displayAvatarURL({ format: "png", size: 2048 }));
    let i2 = Jimp.read("./BOTImages/ChangeMyMind/changemymind.jpg");

    Promise.all([i1, i2]).then((images) =>
    {
        images[0].resize(40, 40).rotate(9);
        images[1].composite(images[0], 175, 43).quality(100).getBuffer(Jimp.MIME_PNG, (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Change My Mind)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
            }

            gm(buffer)
            .font("Helvetica.ttf", 14)
            .fill("#111111")
            .draw(["rotate -7 text 195, 290 '" + SearchQuery.replace(/'/g, "`").trim() + "'"])
            .toBuffer("changemymind.png", (err, buffer2) =>
            {
                if(err)
                {
                    console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Change My Mind)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
                }

                message.channel.send(new Discord.MessageAttachment(buffer2, "changemymind.png")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
            });
        });
    });
};

module.exports.help =
{
    name: "changemymind"
};