const Discord = require("discord.js");
const DatabaseImport = require("../../database/database.js");
const EmojiConvert = require("../../functions/emojiconvert.js");

let UserAlreadyRolling = {};
let iRollTheDiceInterval = {};

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;
    const GetGuildID = message.guild.id;

    await DatabaseImport.CookieMonsta_CheckCreateUser(GetGuildID, user.id);

    const iUserCookies = await DatabaseImport.CookieMonsta_GetUserCookies(GetGuildID, user.id);

    if(UserAlreadyRolling[user.id] === true)
    {
        return message.reply(":no_entry: You are already **Rolling the dice** :game_die:, please wait until is finished! :no_entry:");
    }

    const RandomDice = Math.floor(( Math.random() * 6 ) + 1);
    const RandomNewNumber = Math.floor(( Math.random() * 6 ) + 1);

    UserAlreadyRolling[user.id] = true;

    message.channel.send( `:game_die::game_die: :regional_indicator_r::regional_indicator_o::regional_indicator_l::regional_indicator_l:  :regional_indicator_t::regional_indicator_h::regional_indicator_e:  :regional_indicator_d::regional_indicator_i::regional_indicator_c::regional_indicator_e: :game_die::game_die:\n\n\n\n` + `													` + EmojiConvert.NumberToDiscordEmoji(RandomNewNumber) + `		\n\n\n` + `:fingers_crossed:  ***Is ${user} lucky enough to roll the dice to this number?***  :fingers_crossed:`);

    iRollTheDiceInterval[user.id] = setInterval (async () =>
    {
        if(RandomDice === RandomNewNumber)
        {
            message.channel.send( `:four_leaf_clover: ${user} has rolled the dice and it won! **40** cookies :cookie: awarded! :four_leaf_clover:`);
            await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, user.id, iUserCookies + 40);
        }

        else
        {
            message.channel.send( `:game_die:  ${user} has rolled the dice and it lost! He got number:  ` + EmojiConvert.NumberToDiscordEmoji(RandomDice) + "  :triumph: :triumph:");
        }

        UserAlreadyRolling[user.id] = false;
        bot.clearInterval(iRollTheDiceInterval[user.id]);

    }, 3000);
};

module.exports.help =
{
    name: "roll"
};