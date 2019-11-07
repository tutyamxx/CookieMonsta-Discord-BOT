const DatabaseImport = require("../database/database.js");

module.exports = async (oldMember, newMember) =>
{
    const newUserChannel = newMember.voiceChannel
    const oldUserChannel = oldMember.voiceChannel

    const GuildID = newMember.guild.id;

    // --| Left voice channel
    if(oldUserChannel === undefined && newUserChannel !== undefined)
    {
        if(!newMember.bot)
        {
            if(!await DatabaseImport.CookieMonsta_UserExists(GuildID, newMember.user.id))
            {
                await DatabaseImport.CookieMonsta_CreateUser(GuildID, newMember.user.id, 150, 0, 1, "01.png");
            }
        }
    }

    // -- | Joined voice channel
    else if(newUserChannel === undefined)
    {
        if(!newMember.bot)
        {
            if(!await DatabaseImport.CookieMonsta_UserExists(GuildID, newMember.user.id))
            {
                await DatabaseImport.CookieMonsta_CreateUser(GuildID, newMember.user.id, 150, 0, 1, "01.png");
            }
        }
    }
};