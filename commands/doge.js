
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await getJSON('http://shibe.online/api/shibes?count=1&httpsUrls=true', async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Such sad! Much cry! Ain't working atm, dog. :cry:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        let DogeToString = JSON.stringify(response[0]).replace(/"/g, '');

        await message.channel.send(
        {
            embed:
            {
                author:
                {
                    name: "Cookie Monsta | Random Doge",
                    icon_url: (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL
                },

                color: 16753920,

                image:
                {
                    url: DogeToString,
                    width: 800,
                    height: 800
                },

                footer:
                {
                    icon_url: (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL,
                    text: "Requested by: @" + user.username
                }
            }
        }).
        then(function (message)
        {
            message.react("🐶");
        });
    });
};

module.exports.help =
{
    name: "doge"
};
