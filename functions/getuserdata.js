
const CookieMonsta = require("../CookieMonstaBOT.js");

async function CookiesUpdate(guild, id, amount)
{
	if(!id.bot)
	{
		CookieMonsta.UserDatabaseData = await CookieMonsta.iDiscordClient.getScore.get(id, guild);

		if(!await CookieMonsta.UserDatabaseData)
		{
			CookieMonsta.UserDatabaseData = { id: `${guild}-${id}`, user: id, guild: guild, cookies: 150, points: 0, level: 1 };
		}

		CookieMonsta.UserDatabaseData.cookies += amount;

		await CookieMonsta.iDiscordClient.setScore.run(CookieMonsta.UserDatabaseData);
	}
};

async function CookiesRemove(guild, id, amount)
{
	if(!id.bot)
	{
		CookieMonsta.UserDatabaseData = await CookieMonsta.iDiscordClient.getScore.get(id, guild);

		if(!await CookieMonsta.UserDatabaseData)
		{
			CookieMonsta.UserDatabaseData = { id: `${guild}-${id}`, user: id, guild: guild, cookies: 150, points: 0, level: 1 };
		}

		CookieMonsta.UserDatabaseData.cookies -= amount;

		if(await CookieMonsta.UserDatabaseData.cookies <= 0)
		{
			CookieMonsta.UserDatabaseData.cookies = 0;
		}

		await CookieMonsta.iDiscordClient.setScore.run(CookieMonsta.UserDatabaseData);
	}
}

module.exports.CookiesUpdate = CookiesUpdate;
module.exports.CookiesRemove = CookiesRemove;
