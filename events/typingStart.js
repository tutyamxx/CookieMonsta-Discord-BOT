const DatabaseImport = require("../database/database.js");

module.exports = async (bot, channel, user) =>
{
    if(user.bot)
    {
        return;
    }

    const GuildID = channel.guild.id.toString();

    if(!await DatabaseImport.CookieMonsta_UserExists(GuildID, user.id))
    {
        await DatabaseImport.CookieMonsta_CreateUser(GuildID, user.id, 150, 0, 1, "01.png");
    }
};