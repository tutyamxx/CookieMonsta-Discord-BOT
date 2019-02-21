
module.exports.run = async (bot, message, args) =>
{
    await message.channel.send(
    {
        embed:
        {
            color: 16777215,

            author:
            {
                name: "Cookie Monsta | (╯°□°)╯︵ ┻━┻",
                icon_url: (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL
            },

            description: "(╯°□°)╯︵ ┻━┻ FLIP THAT TABLE.\n\n┻━┻ ︵ ヽ(°□°ヽ) FLIP THIS TABLE..\n\n┻━┻ ︵ ＼('0')/／ ︵ ┻━┻ FLIP ALL THE TABLES!\n\nಠ_ಠ *Son...*\n\nಠ____ಠ Put.\n\nಠ____ಠ The tables.\n\nಠ____ಠ Back.\n\n(╮°-°)╮┳━┳\n\n(╯°□°)╯︵ ┻━┻ NEVER!!!!",

            image:
            {
                url: "https://i.kinja-img.com/gawker-media/image/upload/s--iQjAucgS--/c_scale,f_auto,fl_progressive,q_80,w_800/hojkokfijt0ujov9lobq.gif",
                width: 800,
                height: 800
            },
        }
    });
};

module.exports.help =
{
    name: "tableflip"
};
