const Discord = require("discord.js");
const axios = require("axios");
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

    await message.channel.startTyping();

    await axios.get("https://www.thecolorapi.com/id?hex=" + HexColorArgument.replace("#", "")).then(async (response) =>
    {
        // --| Remove "" from start and end of string
        const ResponseHEXColor = JSON.stringify(await response.data.hex.value).replace(/"/g, "");
        const ResponseColorName = JSON.stringify(await response.data.name.value).replace(/"/g, "");

        const ResponseRGB = [];
        ResponseRGB[0] = JSON.stringify(await response.data.rgb.r).replace(/"/g, "");
        ResponseRGB[1] = JSON.stringify(await response.data.rgb.g).replace(/"/g, "");
        ResponseRGB[2] = JSON.stringify(await response.data.rgb.b).replace(/"/g, "");
        ResponseRGB[3] = JSON.stringify(await response.data.rgb.value).replace(/"/g, "");

        const ResponseHSL = [];
        ResponseHSL[0] = JSON.stringify(await response.data.hsl.h).replace(/"/g, "");
        ResponseHSL[1] = JSON.stringify(await response.data.hsl.s).replace(/"/g, "");
        ResponseHSL[2] = JSON.stringify(await response.data.hsl.l).replace(/"/g, "");
        ResponseHSL[3] = JSON.stringify(await response.data.hsl.value).replace(/"/g, "");

        const ResponseHSV = [];
        ResponseHSV[0] = JSON.stringify(await response.data.hsv.h).replace(/"/g, "");
        ResponseHSV[1] = JSON.stringify(await response.data.hsv.s).replace(/"/g, "");
        ResponseHSV[2] = JSON.stringify(await response.data.hsv.v).replace(/"/g, "");
        ResponseHSV[3] = JSON.stringify(await response.data.hsv.value).replace(/"/g, "");

        const ResponseCMYK = [];
        ResponseCMYK[0] = JSON.stringify(await response.data.cmyk.c).replace(/"/g, "");
        ResponseCMYK[1] = JSON.stringify(await response.data.cmyk.m).replace(/"/g, "");
        ResponseCMYK[2] = JSON.stringify(await response.data.cmyk.y).replace(/"/g, "");
        ResponseCMYK[3] = JSON.stringify(await response.data.cmyk.k).replace(/"/g, "");
        ResponseCMYK[4] = JSON.stringify(await response.data.cmyk.value).replace(/"/g, "");

        let ColorImage = new Jimp(400, 400, ResponseHEXColor, async (err, image) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Hex Color)\x1b[0m image: \x1b[31m" + err + "\x1b[0m");
            }
        });

        ColorImage.quality(100).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
        {
            if(err)
            {
                console.log("\x1b[31m*\x1b[0m Error creating \x1b[33m(Hex Color)\x1b[0m image: \x1b[31m" + err + "\x1b[0m");
            }

            gm(buffer)
            .font("Agency-FB.ttf", 28)
            .fill(CustomFunctions.InvertColor(ResponseHEXColor, true))
            .drawText(0, 0, ResponseColorName, "Center")
            .font("Agency-FB.ttf", 16)
            .fill(CustomFunctions.InvertColor(ResponseHEXColor, true))
            .drawText(0, 2, "RGB", "NorthWest")
            .drawText(0, 24, "Red: " + ResponseRGB[0], "NorthWest")
            .drawText(0, 48, "Green: " + ResponseRGB[1], "NorthWest")
            .drawText(0, 72, "Blue: " + ResponseRGB[2], "NorthWest")
            .drawText(0, 98, ResponseRGB[3], "NorthWest")
            .drawText(0, 2, "HSL", "NorthEast")
            .drawText(0, 24, "Hue: " + ResponseHSL[0] + "°", "NorthEast")
            .drawText(0, 48, "Saturation: " + ResponseHSL[1] + "%", "NorthEast")
            .drawText(0, 72, "Lightness: " + ResponseHSL[2] + "%", "NorthEast")
            .drawText(0, 98, ResponseHSL[3], "NorthEast")
            .drawText(0, 98, "HSV", "SouthWest")
            .drawText(0, 72, "Hue: " + ResponseHSV[0] + "°", "SouthWest")
            .drawText(0, 48, "Saturation: " + ResponseHSV[1] + "%", "SouthWest")
            .drawText(0, 24, "Value: " + ResponseHSV[2] + "%", "SouthWest")
            .drawText(0, 0, ResponseHSV[3], "SouthWest")
            .drawText(0, 122, "CMYK", "SouthEast")
            .drawText(0, 96, "Cyan: " + ResponseCMYK[0] + "%", "SouthEast")
            .drawText(0, 72, "Magenta: " + ResponseCMYK[1] + "%", "SouthEast")
            .drawText(0, 48, "Yellow: " + ResponseCMYK[2] + "%", "SouthEast")
            .drawText(0, 24, "Black: " + ResponseCMYK[3] + "%", "SouthEast")
            .drawText(0, 0, ResponseCMYK[4], "SouthEast")
            .toBuffer(szFileNameColor, async (err, buffer2) =>
            {
                if(err)
                {
                    console.log("\x1b[31m*\x1b[0m Whoops! Error creating \x1b[33m(Hex Color)\x1b[0m image: \x1b[31m" + err + "\x1b[0m");
                }

                await message.channel.send(new Discord.Attachment(buffer2, szFileNameColor)).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
            });
        });
        
    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Sorry, for some reason I have encountered an error!  :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "hexcolor"
};