const CookieMonsta = require("../CookieMonstaBOT.js");

const SQLite = require("better-sqlite3");
const sql = new SQLite('./c00ki3z.sqlite');

function InitialiseDatabase()
{
    // --| DB Stuff
    const DBTable = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'CookiesTable';").get();

    if(!DBTable['count(*)'])
    {
        sql.prepare("CREATE TABLE CookiesTable (id TEXT PRIMARY KEY, user TEXT, guild TEXT, cookies INTEGER, points INTEGER, level INTEGER);").run();
        sql.prepare("CREATE UNIQUE INDEX idx_CookiesTable_id ON CookiesTable (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    CookieMonsta.iDiscordClient.getScore = sql.prepare("SELECT * FROM CookiesTable WHERE user = ? AND guild = ?");
    CookieMonsta.iDiscordClient.setScore = sql.prepare("INSERT OR REPLACE INTO CookiesTable (id, user, guild, cookies, points, level) VALUES (@id, @user, @guild, @cookies, @points, @level);");
};

module.exports.InitialiseDatabase = InitialiseDatabase;
module.exports.SQLite = SQLite;
module.exports.sql = sql;