const DatabaseImport = require("../database/database.js");

module.exports = async (oldState, newState) =>
{
    const UserOldChannel = newState.channelID;
    const UserNewChannel = oldState.channelID;

    const GuildID = newState.guild.id;

    if(!newState.bot || !oldState.bot)
    {
        // --| User has joined a voice channel
        if((UserOldChannel === undefined && UserNewChannel === undefined) || (UserOldChannel === null && UserNewChannel === undefined))
        {
            await DatabaseImport.CookieMonsta_CheckCreateUser(GuildID, newState.id);
        }

        // --| User has left a voice channel
        else if((UserOldChannel !== undefined && UserNewChannel === undefined) || (UserNewChannel !== undefined && UserNewChannel === undefined))
        {
            await DatabaseImport.CookieMonsta_CheckCreateUser(GuildID, newState.id);
        }
    }
};