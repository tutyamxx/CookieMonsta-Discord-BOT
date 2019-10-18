const GetDatabaseData = require("../functions/getuserdata.js");

module.exports = async (bot, oldMember, newMember) =>
{
    if(oldMember.user.bot || newMember.user.bot)
    {
        return;
    }

    if(newMember.presence.status !== oldMember.presence.status)
    {
        await GetDatabaseData.CookiesUpdate(newMember.guild.id, newMember.user.id, 0);
    }
};
