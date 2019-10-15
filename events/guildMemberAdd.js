
const Discord = require("discord.js");

const gm = require("gm").subClass({ imageMagick: true });
const Jimp = require("jimp");

const DefChannel = require("../functions/defaultchannel.js");

const szRandomGreetBanners =
[
	"/BOTImages/Banner/01.png",
	"/BOTImages/Banner/02.png",
	"/BOTImages/Banner/03.png",
	"/BOTImages/Banner/04.png",
	"/BOTImages/Banner/05.png",
	"/BOTImages/Banner/06.png",
	"/BOTImages/Banner/07.png",
	"/BOTImages/Banner/08.png",
	"/BOTImages/Banner/09.png",
	//"/BOTImages/Banner/10.png",
	//"/BOTImages/Banner/11.png",
	"/BOTImages/Banner/12.png"
];

module.exports = async (bot, member, guild) =>
{
    if(member)
    {
        let GetUserAvatar = (member.user.avatarURL === null) ? member.user.defaultAvatarURL : member.user.avatarURL;
        let GetUserName = member.user.username.replace(/'/g, "`").trim();

        await Jimp.read(__basedir + szRandomGreetBanners[Math.floor(Math.random() * szRandomGreetBanners.length)]).then(async (image) =>
        {
            await Jimp.read(GetUserAvatar).then(async (image2) =>
            {
                await image2.resize(184, Jimp.AUTO);
                await image.composite(image2, 59, 59).getBuffer(Jimp.MIME_PNG, async (err, buffer) =>
                {
                    if(err)
                    {
                        return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err);
                    }

                    await gm(buffer)
                    .font("./BOTFonts/Agency-FB.ttf", (GetUserName.length >= 32) ? 28 : 40 )
                    .fill("#ffffff")
                    .draw(["text 264, 115 '" + GetUserName + "'"])
                    .font("./BOTFonts/Agency-FB.ttf", 42)
                    .fill( "#ffffff" )
                    .draw(["text 264, 220 'Member: #"  + member.guild.memberCount + "'"])
                    .toBuffer("banner.png", async function (err, buffer2)
                    {
                        if(err)
                        {
                            return console.log("[+] Log Report [+] ---> Whoops! There is your error: " + err);
                        }

                        let channel = DefChannel.getDefaultChannel(member.guild);

                        if(channel && channel.permissionsFor(member.guild.me).has('SEND_MESSAGES'))
                        {
                            await channel.send(new Discord.Attachment(buffer2, "welcome.png"));
                        }
                    });
                });
            });
        });
    }
};
