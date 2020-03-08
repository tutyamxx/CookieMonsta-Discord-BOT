const DatabaseImport = require("../database/database.js");

module.exports = async (bot, oldMember, newMember) =>
{
    if(oldMember !== undefined && newMember !== undefined)
    {
        const UserOld = oldMember.user;
        const UserNew = newMember.user;

        if(!UserOld.bot && !UserNew.bot)
        {
            if(UserOld.id === UserNew.id)
            {
                await DatabaseImport.CookieMonsta_CheckCreateUser(newMember.guild.id, UserNew.id);
            }
        }
    }
};
