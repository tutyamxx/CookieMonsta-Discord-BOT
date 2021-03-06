const Discord = require("discord.js");
const Jimp = require("jimp");
const gm = require("gm").subClass({ imageMagick: true });
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = (bot, message, szArgs) =>
{
    let GuildMember = message.mentions.members.first();

    if(!GuildMember)
    {
        return message.reply(" :no_entry: not happening! Please mention a valid member of this server! :boy:  :no_entry:");
    }

    let SearchQuery = szArgs.slice(1).join(' ');

    if(CustomFunctions.isEmpty(SearchQuery))
    {
        return message.reply(" :no_entry: you need to add something to search on Google, try again. :no_entry:");
    }

    if(SearchQuery.length > 34)
    {
        return message.reply(" :no_entry: please don't exceed **34** characters in your Google search query! :no_entry:");
    }

    message.channel.startTyping();

    const GetUserAvatar = GuildMember.user.displayAvatarURL({ format: "png", size: 2048 });

    let i1 = Jimp.read(GetUserAvatar);
    let i2 = Jimp.read(GetUserAvatar);
    let i3 = Jimp.read("./BOTImages/ByeMom/byemom.png");

    Promise.all([i1, i2, i3]).then((images) =>
    {
        images[0].resize(70, 70).quality(100);
        images[1].resize(125, 125).quality(100);

        images[2].composite(images[0], 532, 9).composite(images[1], 76, 326).quality(100).getBuffer(Jimp.MIME_PNG, (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Bye Mom)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
            }

            gm(buffer)
            .font("Helvetica.ttf", 20)
            .fill("#111111")
            .draw(["rotate -25 text 70, 703 '" + SearchQuery.replace(/'/g, "`").trim() + "'"])
            .toBuffer("byemom.png", (err, buffer2) =>
            {
                if(err)
                {
                    console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Bye Mom)\x1b[0m meme: \x1b[31m" + err + "\x1b[0m");
                }

                message.channel.send(new Discord.MessageAttachment(buffer2, "byemom.png")).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
            });
        });
    });
};

module.exports.help =
{
    name: "byemom"
};