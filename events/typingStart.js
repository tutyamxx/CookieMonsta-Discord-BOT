
const GetDatabaseData = require("../functions/getuserdata.js");

module.exports = async (bot, channel, user) =>
{
    if(user.bot)
    {
        return;
    }

    await GetDatabaseData.CookiesUpdate(channel.guild.id.toString(), user.id, 0);
};
