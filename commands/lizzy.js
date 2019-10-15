
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await getJSON('https://nekos.life/api/lizard', async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, no lizzibois found. Try again later :lizard:  :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        let LizzyImageToString = JSON.stringify(response.url).replace(/"/g, '');

        await message.channel.send(
        {
            embed:
            {
                author:
                {
                    name: "Cookie Monsta | Random Lizzy Boi",
                    icon_url: (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL
                },

                color: 4443520,

                image:
                {
                    url: LizzyImageToString,
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
            message.react("🦎");
        });
    });
};

module.exports.help =
{
    name: "lizzy"
};
