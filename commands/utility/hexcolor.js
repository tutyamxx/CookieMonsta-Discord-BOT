const Discord = require("discord.js");
const getJSON = require("get-json");
const gm = require("gm").subClass({ imageMagick: true });
const Jimp = require("jimp");
const CustomFunctions = require("../../functions/funcs.js");

const szFileNameColor = "hexcolor.png";

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Try specifying a HEX color?  :no_entry:");
    }

    const HexColorArgument = szArgs[0].trim().toString();
    const CheckHexFormat = new RegExp(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/, "gi");

    if(!CheckHexFormat.test(HexColorArgument))
    {
        return await message.reply(" :no_entry: this this is not a valid HEX color representation!  :no_entry:");
    }

    message.channel.startTyping();

    await getJSON("https://www.thecolorapi.com/id?hex=" + HexColorArgument.replace("#", ""), async (error, response) =>
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, for some reason I have encountered an error!  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        const ResponseHEXColor = JSON.stringify(await response.hex.value).replace(/"/g, '');
        const ResponseColorName = JSON.stringify(await response.name.value).replace(/"/g, '');

        const ResponseRGB = [];
        ResponseRGB[0] = JSON.stringify(await response.rgb.r).replace(/"/g, '');
        ResponseRGB[1] = JSON.stringify(await response.rgb.g).replace(/"/g, '');
        ResponseRGB[2] = JSON.stringify(await response.rgb.b).replace(/"/g, '');
        ResponseRGB[3] = JSON.stringify(await response.rgb.value).replace(/"/g, '');

        const ResponseHSL = [];
        ResponseHSL[0] = JSON.stringify(await response.hsl.h).replace(/"/g, '');
        ResponseHSL[1] = JSON.stringify(await response.hsl.s).replace(/"/g, '');
        ResponseHSL[2] = JSON.stringify(await response.hsl.l).replace(/"/g, '');
        ResponseHSL[3] = JSON.stringify(await response.hsl.value).replace(/"/g, '');

        const ResponseHSV = [];
        ResponseHSV[0] = JSON.stringify(await response.hsv.h).replace(/"/g, '');
        ResponseHSV[1] = JSON.stringify(await response.hsv.s).replace(/"/g, '');
        ResponseHSV[2] = JSON.stringify(await response.hsv.v).replace(/"/g, '');
        ResponseHSV[3] = JSON.stringify(await response.hsv.value).replace(/"/g, '');

        const ResponseCMYK = [];
        ResponseCMYK[0] = JSON.stringify(await response.cmyk.c).replace(/"/g, '');
        ResponseCMYK[1] = JSON.stringify(await response.cmyk.m).replace(/"/g, '');
        ResponseCMYK[2] = JSON.stringify(await response.cmyk.y).replace(/"/g, '');
        ResponseCMYK[3] = JSON.stringify(await response.cmyk.k).replace(/"/g, '');
        ResponseCMYK[4] = JSON.stringify(await response.cmyk.value).replace(/"/g, '');

        let ColorImage = new Jimp(400, 400, ResponseHEXColor, async (err, image) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");
            }
        });

        ColorImage.quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                await message.channel.stopTyping(true).catch(err => message.channel.stopTyping(true));
                console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");

                return;
            }

            const InvertColor = (hex) => "#" + hex.match(/[a-f0-9]{2}/ig).map(e => (255 - parseInt(e, 16) | 0).toString(16).replace(/^([a-f0-9])$/, "0$1")).join("");

            await gm(buffer)
            .font("Agency-FB.ttf", 28)
            .fill(InvertColor(ResponseHEXColor))
            .drawText(0, 0, ResponseColorName, "Center")
            .font("Agency-FB.ttf", 16)
            .fill(InvertColor(ResponseHEXColor))
            .drawText(0, 0, "RGB", "NorthWest")
            .drawText(0, 24, "Red: " + ResponseRGB[0], "NorthWest")
            .drawText(0, 48, "Green: " + ResponseRGB[1], "NorthWest")
            .drawText(0, 72, "Blue: " + ResponseRGB[2], "NorthWest")
            .drawText(0, 98, ResponseRGB[3], "NorthWest")
            .drawText(0, 0, "HSL", "NorthEast")
            .drawText(0, 24, "H: " + ResponseHSL[0], "NorthEast")
            .drawText(0, 48, "S: " + ResponseHSL[1], "NorthEast")
            .drawText(0, 72, "L: " + ResponseHSL[2], "NorthEast")
            .drawText(0, 98, ResponseHSL[3], "NorthEast")
            .drawText(0, 98, "HSV", "SouthWest")
            .drawText(0, 72, "H: " + ResponseHSV[0], "SouthWest")
            .drawText(0, 48, "S: " + ResponseHSV[1], "SouthWest")
            .drawText(0, 24, "V: " + ResponseHSV[2], "SouthWest")
            .drawText(0, 0, ResponseHSV[3], "SouthWest")
            .drawText(0, 122, "CMYK", "SouthEast")
            .drawText(0, 96, "C: " + ResponseCMYK[0], "SouthEast")
            .drawText(0, 72, "M: " + ResponseCMYK[1], "SouthEast")
            .drawText(0, 48, "Y: " + ResponseCMYK[2], "SouthEast")
            .drawText(0, 24, "K: " + ResponseCMYK[3], "SouthEast")
            .drawText(0, 0, ResponseCMYK[4], "SouthEast")
            .toBuffer(szFileNameColor, async function (err, buffer2)
            {
                if(err)
                {
                    await message.channel.stopTyping(true).catch(err => message.channel.stopTyping(true));
                    console.log("\x1b[31m*\x1b[0m Whoops! There is your error: \x1b[31m" + err + "\x1b[0m");

                    return;
                }

                await message.channel.send(new Discord.Attachment(buffer2, szFileNameColor)).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
            });
        });
    });      
};

module.exports.help =
{
    name: "hexcolor"
};