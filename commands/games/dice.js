const Discord = require("discord.js");
const axios = require("axios");
const Jimp = require("jimp");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await message.channel.startTyping();

    await axios.get("http://roll.diceapi.com/json/2d6/").then(async (response) =>
    {
        const GetUserAvatar = (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL;

        const DiceNum1 = JSON.stringify(parseInt(await response.data.dice[0].value));
        const DiceNum2 = JSON.stringify(parseInt(await response.data.dice[1].value));

        const szDice1Image = "http://roll.diceapi.com/images/poorly-drawn/d6/" + DiceNum1 + ".png";
        const szDice2Image = "http://roll.diceapi.com/images/poorly-drawn/d6/" + DiceNum2 + ".png";

        const RandomDegreesDice1 = Math.floor((Math.random() * 360) + -360);
        const RandomDegreesDice2 = Math.floor((Math.random() * 360) + -360);

        let i1 = await Jimp.read("./BOTImages/RollDice/table.jpeg");
        let i2 = await Jimp.read(szDice1Image);
        let i3 = await Jimp.read(szDice2Image);
        let i4 = await Jimp.read(GetUserAvatar);

        await Promise.all([i1, i2, i3, i4]).then(async (images) =>
        {
            await images[1].resize(80, Jimp.AUTO).rotate(RandomDegreesDice1).quality(100);
            await images[2].resize(80, Jimp.AUTO).rotate(RandomDegreesDice2).quality(100);
            await images[3].resize(100, 100).quality(100);

            await images[0].composite(images[3], 0, 0).composite(images[1], 68, 90).composite(images[2], 180, 200).quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
            {
                if(err)
                {
                    console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Dice Game)\x1b[0m: \x1b[31m" + err + "\x1b[0m");
                }

                await message.channel.send(user + "You rolled **" + DiceNum1 + "** and **" + DiceNum2 + "** :point_down:", { files: [buffer] }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
                await message.react(":dice:634953930043817994");
            });
        });

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Sorry, I've lost the dice and you can't roll them at the moment! :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "dice"
};