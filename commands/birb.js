
const Discord = require("discord.js");
const getJSON = require("get-json");

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    await getJSON('https://some-random-api.ml/birbimg', async function(error, response)
    {
        if(error)
        {
            return await message.channel.send(":no_entry: Sorry, no birbs to generate. Try again later :bird:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        let RandomBirb = JSON.stringify(response.link).replace(/"/g, '');

        await message.channel.send(
        {
            embed:
            {
                author:
                {
                    name: "Cookie Monsta | Random Birb",
                    icon_url: (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL
                },

                color: 11001920,

                image:
                {
                    url: RandomBirb,
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
            message.react("🦉");
            message.react("🐦");
        });
    });
};

module.exports.help =
{
    name: "birb"
};
