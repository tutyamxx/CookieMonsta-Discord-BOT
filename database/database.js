const CookieMonsta = require("../CookieMonstaBOT.js");

const SQLite = require("better-sqlite3");
const sql = new SQLite('./c00ki3z.sqlite');

function InitialiseDatabase()
{
    // --| DB Stuff
    const DBTable = sql.prepare("SELECT COUNT(*) FROM `sqlite_master` WHERE `type` = 'table' AND `name` = 'CookiesTable';").get();

    if(!DBTable['COUNT(*)'])
    {
        sql.prepare("CREATE TABLE IF NOT EXISTS `CookiesTable` (`id` TEXT PRIMARY KEY, `user` TEXT, `guild` TEXT, `cookies` INTEGER, `points` INTEGER, `level` INTEGER);").run();
        sql.prepare("CREATE UNIQUE INDEX IF NOT EXISTS `idx_CookiesTable_id` ON `CookiesTable` (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    // --| DB Prefix Stuff
    const DBTablePrefix = sql.prepare("SELECT COUNT(*) FROM `sqlite_master` WHERE `type` = 'table' AND `name` = 'PrefixTable';").get();

    if(!DBTablePrefix['COUNT(*)'])
    {
        sql.prepare("CREATE TABLE IF NOT EXISTS `PrefixTable` (`guild` TEXT PRIMARY KEY, `command_prefix` TEXT);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    CookieMonsta.iDiscordClient.getScore = sql.prepare("SELECT * FROM `CookiesTable` WHERE `user` = ? AND `guild` = ?");
    CookieMonsta.iDiscordClient.setScore = sql.prepare("INSERT OR REPLACE INTO `CookiesTable` (`id`, `user`, `guild`, `cookies`, `points`, `level`) VALUES (@id, @user, @guild, @cookies, @points, @level);");
};

module.exports.InitialiseDatabase = InitialiseDatabase;
module.exports.SQLite = SQLite;
module.exports.sql = sql;