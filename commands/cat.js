
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    var user = message.author;

    await getJSON('http://aws.random.cat/meow', async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, the purr factory isn't generating kittens at the moment :crying_cat_face:  :no_entry:").then(()=> message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        var CatImageToString = JSON.stringify(response.file).replace(/"/g, '');

        await message.channel.send(
        {
            embed:
            {
                author:
                {
                    name: "Cookie Monsta | Random Cat",
                    icon_url: (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL
                },

                color: 16777215,

                image:
                {
                    url: CatImageToString,
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
            message.react("🐱");
        });
    });
};

module.exports.help =
{
    name: "cat"
};
