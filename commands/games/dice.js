const Discord = require("discord.js");
const axios = require("axios");
const Jimp = require("jimp");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    message.channel.startTyping();

    axios.get("http://roll.diceapi.com/json/2d6/").then((response) =>
    {
        const GetUserAvatar = user.displayAvatarURL({ format: "png", size: 2048 });

        const DiceNum1 = JSON.stringify(parseInt(response.data.dice[0].value));
        const DiceNum2 = JSON.stringify(parseInt(response.data.dice[1].value));

        const szDice1Image = "http://roll.diceapi.com/images/poorly-drawn/d6/" + DiceNum1 + ".png";
        const szDice2Image = "http://roll.diceapi.com/images/poorly-drawn/d6/" + DiceNum2 + ".png";

        const RandomDegreesDice1 = Math.floor((Math.random() * 360) + -360);
        const RandomDegreesDice2 = Math.floor((Math.random() * 360) + -360);

        let i1 = Jimp.read("./BOTImages/RollDice/table.jpeg");
        let i2 = Jimp.read(szDice1Image);
        let i3 = Jimp.read(szDice2Image);
        let i4 = Jimp.read(GetUserAvatar);

        Promise.all([i1, i2, i3, i4]).then((images) =>
        {
            images[1].resize(80, Jimp.AUTO).rotate(RandomDegreesDice1).quality(100);
            images[2].resize(80, Jimp.AUTO).rotate(RandomDegreesDice2).quality(100);
            images[3].resize(100, 100).quality(100);

            images[0].composite(images[3], 0, 0).composite(images[1], 68, 90).composite(images[2], 180, 200).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
            {
                if(err)
                {
                    console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Dice Game)\x1b[0m: \x1b[31m" + err + "\x1b[0m");
                }

                message.channel.send(`${user}, You rolled **${DiceNum1}** and **${DiceNum2}** :point_down:`, { files: [buffer] }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
                await message.react(":dice:634953930043817994");
            });
        });

    }).catch(() =>
    {
        return message.channel.send(":no_entry: Sorry, I've lost the dice and you can't roll them at the moment! :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "dice"
};