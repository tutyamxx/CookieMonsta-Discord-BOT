const DatabaseImport = require("../database/database.js");

module.exports = async (bot, channel, user) =>
{
    if(user.bot || user === undefined)
    {
        return;
    }

    const GuildID = channel.guild.id.toString();
    
    await DatabaseImport.CookieMonsta_CheckCreateUser(GuildID, user.id);
};