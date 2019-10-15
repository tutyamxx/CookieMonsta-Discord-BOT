
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await getJSON('https://randomfox.ca/floof/', async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Oh noes! Foxes ran away, try later perhaps?! :crying_cat_face:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        // --| Remove "" from start and end of string
        let FoxImageToString = JSON.stringify(response.image).replace(/"/g, '');

        await message.channel.send(
        {
            embed:
            {
                author:
                {
                    name: "Cookie Monsta | Random Fox",
                    icon_url: (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL
                },

                color: 11674146,

                image:
                {
                    url: FoxImageToString,
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
            message.react("🦊");
        });
    });
};

module.exports.help =
{
    name: "fox"
};
