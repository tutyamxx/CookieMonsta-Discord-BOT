
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    var user = message.author;

    await getJSON('https://random-d.uk/api/v1/random', async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, the ducks got upset! Try again later :crying_cat_face:  :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        var DuckImageToString = JSON.stringify(response.url).replace(/"/g, '');

        await message.channel.send(
        {
            embed:
            {
                author:
                {
                    name: "Cookie Monsta | Random Ducky",
                    icon_url: (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL
                },

                color: 8421376,

                image:
                {
                    url: DuckImageToString,
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
            message.react("🦆");
        });
    });
};

module.exports.help =
{
    name: "ducky"
};
