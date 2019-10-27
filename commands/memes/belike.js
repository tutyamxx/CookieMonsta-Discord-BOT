const Discord = require("discord.js");
const Jimp = require("jimp");

module.exports.run = async (bot, message, args) =>
{
    message.channel.startTyping();
    
    let BillURL = "https://belikebill.ga/billgen-API.php?default=1&name=" + message.author.username.toString() + "&sex=m" + Math.floor(Math.random() * 10000) + 1 + "&.jpg";

    await Jimp.read(encodeURI(BillURL)).then(async (image) =>
    {
        image.getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                return console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
            }

            await message.channel.send(new Discord.Attachment(buffer, "belikebill.png")).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        });
    });
};

module.exports.help =
{
    name: "belike"
};