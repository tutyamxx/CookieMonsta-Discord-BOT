
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    var user = message.author;

    await getJSON('https://dog.ceo/api/breeds/image/random', async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, but the canine factory isn't generating new dogos at the moment. :dog2:  :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        var DogImageToString = JSON.stringify(response.message).replace(/"/g, '');

        await message.channel.send(
        {
            embed:
            {
                author:
                {
                    name: "Cookie Monsta | Random Dog",
                    icon_url: (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL
                },

                color: 16777215,

                image:
                {
                    url: DogImageToString,
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
    name: "dog"
};
