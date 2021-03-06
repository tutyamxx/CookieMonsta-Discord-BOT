const Discord = require("discord.js");
const CookieMonsta = require("../../CookieMonstaBOT.js");

let bPlayingShell = {};
let UserShuffleShells = {};
let ShellGameID = {};
let szShellGameDescription = {};
let iGameEndTimer = {};

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    if(message.channel.permissionsFor(message.member.guild.me).has("MANAGE_MESSAGES", false) && message.channel.permissionsFor(message.member.guild.me).has("ADD_REACTIONS", false))
    {
        if(bPlayingShell[user.id] === true)
        {
            return message.reply(":no_entry: you are already in a **Shell Game** session! :no_entry:")
        }

        ShellGameID[user.id] = user.id;
        bPlayingShell[user.id] = true;

        UserShuffleShells[user.id] = Math.floor(( Math.random() * 3 ) + 1);

        const DiscordRichEmbed = new Discord.MessageEmbed()
        .setAuthor("Cookie Monsta | Shell Game", bot.user.displayAvatarURL())
        .setColor(12582656)
        .setDescription("**Shell Game**\n\nYou have to guess on which one of the shells is the :egg: hidden.\n\nChoose one of the shells to see if you were right, or click ❎ to end the game!\n\n\n:chestnut:	  :chestnut:     :chestnut:")
        .setThumbnail("https://i.imgur.com/HeqXIRR.jpg")

        if(!user.bot)
        {
            message.channel.send({ embed: DiscordRichEmbed }).then(async (msg) =>
            {
                await msg.react("\u0031\u20E3");    // 1
                await msg.react("\u0032\u20E3");    // 2
                await msg.react("\u0033\u20E3");    // 3
                await msg.react("❎");              // end

                iGameEndTimer[user.id] = setInterval(async () =>
                {
                    if(bPlayingShell[user.id] === false)
                    {
                        const DiscordRichEmbed1 = new Discord.MessageEmbed()
                        .setAuthor("Cookie Monsta | Shell Game", bot.user.displayAvatarURL())
                        .setColor(12582656)
                        .setDescription(szShellGameDescription[user.id])
                        .setThumbnail("https://i.imgur.com/HeqXIRR.jpg")

                        await msg.reactions.removeAll();
                        await msg.edit({ embed: DiscordRichEmbed1 });

                        bot.clearInterval(iGameEndTimer[user.id]);
                    }

                }, 1000);
            });
        }
    }

    else
    {
        return message.reply(":no_entry: I can't start a **Shell Game** session because I don't have `MANAGE_MESSAGES` and/or `ADD_REACTIONS` permissions! :no_entry:");
    }
};

module.exports.help =
{
    name: "shellgame"
};

exports.ShellGameID = ShellGameID;
exports.bPlayingShell = bPlayingShell;
exports.szShellGameDescription = szShellGameDescription;
exports.UserShuffleShells = UserShuffleShells;