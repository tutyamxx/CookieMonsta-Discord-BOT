const DatabaseImport = require("../database/database.js");

module.exports = async (bot, oldMember, newMember) =>
{
    if(oldMember.user.bot || newMember.user.bot)
    {
        return;
    }

    if(newMember.presence.status !== oldMember.presence.status)
    {
        const GetGuildID = newMember.guild.id;

        if(!await DatabaseImport.CookieMonsta_UserExists(GetGuildID, newMember.user.id))
        {
            await DatabaseImport.CookieMonsta_CreateUser(GetGuildID, newMember.user.id, 150, 0, 1, "01.png");
        }
    }
};
