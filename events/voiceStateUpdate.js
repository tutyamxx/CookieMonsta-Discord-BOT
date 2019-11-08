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
            await DatabaseImport.CookieMonsta_CheckCreateUser(GuildID, newMember.user.id);
        }
    }

    // -- | Joined voice channel
    else if(newUserChannel === undefined)
    {
        if(!newMember.bot)
        {
            await DatabaseImport.CookieMonsta_CheckCreateUser(GuildID, newMember.user.id);
        }
    }
};