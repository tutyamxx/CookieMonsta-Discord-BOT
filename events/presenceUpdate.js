const DatabaseImport = require("../database/database.js");

module.exports = async (bot, oldMember, newMember) =>
{
    if(oldMember.user.bot || newMember.user.bot)
    {
        return;
    }

    if(newMember.presence.status !== oldMember.presence.status)
    {
        await DatabaseImport.CookieMonsta_CheckCreateUser(newMember.guild.id, newMember.user.id);
    }
};
