const Discord = require("discord.js");
const Jimp = require("jimp");
const mergeImg = require("merge-img");

module.exports.run = async (bot, message, args) =>
{
    message.channel.startTyping();

    const GarFieldComics = [];
    let GarfieldImage = [];

    GarFieldComics[0] = Math.floor((Math.random() * 52) + 1);
    GarFieldComics[1] = Math.floor((Math.random() * 54) + 1);
    GarFieldComics[2] = Math.floor((Math.random() * 52) + 1);

    GarfieldImage[0] = "http://www.gmiller.net/misc/Garfield/MIXED/A_G_" + GarFieldComics[0] + ".png";
    GarfieldImage[1] = "http://www.gmiller.net/misc/Garfield/MIXED/B_G_" + GarFieldComics[1] + ".png";
    GarfieldImage[2] = "http://www.gmiller.net/misc/Garfield/MIXED/C_G_" + GarFieldComics[2] + ".png";

    await mergeImg([GarfieldImage[0], GarfieldImage[1], GarfieldImage[2]], { color: 0xffffffff, align: "center", offset: 7, margin: { top: 7, right: 7, bottom: 7, left: 7 } }).then(async (image) =>
    {
        image.getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                await message.channel.stopTyping(true).catch(err => message.channel.stopTyping(true));
                console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");

                return;
            }

            await message.channel.send(new Discord.Attachment(buffer, "garfield_comics.png")).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "garfield"
};