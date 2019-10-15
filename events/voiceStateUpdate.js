
const GetDatabaseData = require("../functions/getuserdata.js");

module.exports = async (oldMember, newMember) =>
{
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    let GuildID = newMember.guild.id;

    // --| Left voice channel
    if(oldUserChannel === undefined && newUserChannel !== undefined)
    {
        if(!newMember.bot)
        {
            await GetDatabaseData.CookiesUpdate(GuildID, newMember.user.id, 0);
        }
    }

    // -- | Joined voice channel
    else if(newUserChannel === undefined)
    {
        if(!newMember.bot)
        {
            await GetDatabaseData.CookiesUpdate(GuildID, newMember.user.id, 0);
        }
    }
};
