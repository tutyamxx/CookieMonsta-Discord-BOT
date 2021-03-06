const MySQL = require("mysql2");
const BotConfig = require("../config/botconfig.json");

const DatabaseConnection = MySQL.createConnection(
{
    host: BotConfig.Database_Host.trim(),
    user: BotConfig.Database_User.trim(),
    password: BotConfig.Database_Password.trim(),
    database: BotConfig.Database_DB.trim()
});

async function CookieMonsta_InitialiseDatabase()
{
    const QueryShowTables = "SHOW TABLES IN " + BotConfig.Database_DB.trim() + ";";

    DatabaseConnection.query(QueryShowTables, (err, results) =>
    {
        if(err)
        {
            console.log("\x1b[31m*\x1b[0m Query error: " + err + "\x1b[0m");
        }

        if(Object.entries(results).length <= 0)
        {
            // --| Create users table
            const QueryCreateUsersCookieTable = "CREATE TABLE IF NOT EXISTS `UserCookiesTable` (`id` VARCHAR(255) NOT NULL, `user` VARCHAR(255) NOT NULL, `guild` VARCHAR(255) NOT NULL, `cookies` BIGINT NOT NULL, `xp_points` BIGINT NOT NULL, `level` MEDIUMINT NOT NULL, `user_banner_img` TEXT NOT NULL, PRIMARY KEY (`id`));";

            DatabaseConnection.query(QueryCreateUsersCookieTable, (err, results) =>
            {
                if(err)
                {
                    console.log("\x1b[31m*\x1b[0m Query error: " + err + "\x1b[0m");
                }

                const QueryCreateUniqueIndex = "CREATE UNIQUE INDEX `unique_userid` ON `UserCookiesTable` (`guild`, `user`);";

                DatabaseConnection.query(QueryCreateUniqueIndex, (err, results) =>
                {
                    if(err)
                    {
                        console.log("\x1b[31m*\x1b[0m Query error while creating UNIQUE INDEX: " + err + "\x1b[0m");
                    }
                });

                console.log("\x1b[31m*\x1b[0m I have successfully created `\x1b[32mUserCookiesTable\x1b[0m`");
            });

            // --| Create prefix table
            const QueryCreatePrefixTable = "CREATE TABLE IF NOT EXISTS `PrefixTable` (`guild` VARCHAR(255) NOT NULL, `prefix` TEXT NOT NULL, PRIMARY KEY (`guild`));"

            DatabaseConnection.query(QueryCreatePrefixTable, (err, results) =>
            {
                if(err)
                {
                    console.log("\x1b[31m*\x1b[0m Query error: " + err + "\x1b[0m");
                }

                console.log("\x1b[31m*\x1b[0m I have successfully created `\x1b[32mPrefixTable\x1b[0m`");
            });

            // --| Create banners table
            const QueryCreateBannersTable = "CREATE TABLE IF NOT EXISTS `BannersTable` (`card_description` TEXT NOT NULL, `png_file` VARCHAR(255) NOT NULL, `username_color` VARCHAR(255) NOT NULL, `stats_color` VARCHAR(255) NOT NULL, PRIMARY KEY (`png_file`));";

            DatabaseConnection.query(QueryCreateBannersTable, (err, results) =>
            {
                if(err)
                {
                    console.log("\x1b[31m*\x1b[0m Query error: " + err + "\x1b[0m");
                }

                console.log("\x1b[31m*\x1b[0m I have successfully created `\x1b[32mBannersTable\x1b[0m`");
            });
        }

        console.log("\x1b[31m*\x1b[0m I have successfully connected to the database :)!");
        console.log("\x1b[31m*\x1b[0m All tables have been checked and created if they did not exist!");
    });
};

async function CookieMonsta_UserExists(iGuild, iUser)
{
    return new Promise((resolve, reject) =>
    {
        const QueryCheckForUser = "SELECT * FROM `UserCookiesTable` WHERE `user` = ? AND `guild` = ?;";

        DatabaseConnection.query(QueryCheckForUser, [iUser, iGuild], (err, results) =>
        {
            if(err)
            {
                reject(err.message);
            }

            if(Object.entries(results).length <= 0)
            {
                resolve(false);
            }

            resolve(true);
        });
    });
};

async function CookieMonsta_CreateUser(iGuild, iUser, iCookies, iXP, iLevel, szBannerImage)
{
    const QueryUpdateUser = "INSERT INTO `UserCookiesTable` (`id`, `user`, `guild`, `cookies`, `xp_points`, `level`, `user_banner_img`) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE `id` = ?, `user` = ?, `guild` = ?, `cookies` = ?, `xp_points` = ?, `level` = ?, `user_banner_img` = ?;";

    const PrimaryKeyValue = iGuild + "-" + iUser;

    DatabaseConnection.query(QueryUpdateUser, [PrimaryKeyValue, iUser, iGuild, (parseInt(iCookies) <= 0 || isNaN(iCookies) ? 0 : parseInt(iCookies)), (parseInt(iXP) <= 0 || isNaN(iXP) ? 0 : parseInt(iXP)), (parseInt(iLevel) <= 0 || isNaN(iLevel) ? 1 : parseInt(iLevel)), szBannerImage.trim(), PrimaryKeyValue, iUser, iGuild, (parseInt(iCookies) <= 0 || isNaN(iCookies) ? 0 : parseInt(iCookies)), (parseInt(iXP) <= 0 || isNaN(iXP) ? 0 : parseInt(iXP)), (parseInt(iLevel) <= 0 || isNaN(iLevel) ? 1 : parseInt(iLevel)), szBannerImage.trim()], (err, results) =>
    {
        if(err)
        {
            console.log("\x1b[31m*\x1b[0m Query error on (CookieMonsta_CreateUser): " + err + "\x1b[0m");
        }
    });
};

async function CookieMonsta_AddBannerToTable(szCardDescription, szPngFile, szNameHex, szStatsHex)
{
    const QueryAddBanner = "INSERT INTO `BannersTable` (`card_description`, `png_file`, `username_color`, `stats_color`) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE `card_description` = ?, `png_file` = ?, `username_color` = ?, `stats_color` = ?;";

    DatabaseConnection.query(QueryAddBanner, [szCardDescription.trim(), szPngFile.trim(), szNameHex.trim(), szStatsHex.trim(), szCardDescription.trim(), szPngFile.trim(), szNameHex.trim(), szStatsHex.trim()], (err, results) =>
    {
        if(err)
        {
            console.log("\x1b[31m*\x1b[0m Query error on (CookieMonsta_AddBannerToTable): " + err + "\x1b[0m");
        }
    });
};

async function CookieMonsta_GetUserPoints(iGuild, iUser)
{
    return new Promise((resolve, reject) =>
    {
        const QueryGetUserPoints = "SELECT `xp_points` FROM `UserCookiesTable` WHERE `user` = ? AND `guild` = ?;";

        DatabaseConnection.query(QueryGetUserPoints, [iUser, iGuild], (err, results) =>
        {
            if(err)
            {
                reject(err.message);
            }

            if(results.length <= 0)
            {
                resolve(0);
            }

            resolve(parseInt(results[0].xp_points));
        });
    });
};

async function CookieMonsta_GetUserLevel(iGuild, iUser)
{
    return new Promise((resolve, reject) =>
    {
        const QueryGetUserLevel = "SELECT `level` FROM `UserCookiesTable` WHERE `user` = ? AND `guild` = ?;";

        DatabaseConnection.query(QueryGetUserLevel, [iUser, iGuild], (err, results) =>
        {
            if(err)
            {
                reject(err.message);
            }

            if(results.length <= 0)
            {
                resolve(1);
            }

            resolve(parseInt(results[0].level));
        });
    });
};

async function CookieMonsta_UpdatePoints_And_Level(iGuild, iUser, iXPPoints, iLevel)
{
    const QueryUpdatePointsAndLevel = "UPDATE `UserCookiesTable` SET `user` = ?, `guild` = ?, `xp_points` = ?, `level` = ? WHERE `id` = ?;";

    const PrimaryKeyValue = iGuild + "-" + iUser;

    DatabaseConnection.query(QueryUpdatePointsAndLevel, [iUser, iGuild, (parseInt(iXPPoints) <= 0 || isNaN(iXPPoints) ? 0 : parseInt(iXPPoints)), (parseInt(iLevel) <= 0 || isNaN(iLevel) ? 1 : parseInt(iLevel)), PrimaryKeyValue], (err, results) =>
    {
        if(err)
        {
            console.log("\x1b[31m*\x1b[0m Query error on (CookieMonsta_UpdatePoints_And_Level): " + err + "\x1b[0m");
        }
    });
};

async function CookieMonsta_GetUserCookies(iGuild, iUser)
{
    return new Promise((resolve, reject) =>
    {
        const QueryGetUserCookies = "SELECT `cookies` FROM `UserCookiesTable` WHERE `user` = ? AND `guild` = ?;";

        DatabaseConnection.query(QueryGetUserCookies, [iUser, iGuild], (err, results) =>
        {
            if(err)
            {
                reject(err.message);
            }

            if(results.length <= 0)
            {
                resolve(0);
            }

            resolve(parseInt(results[0].cookies));
        });
    });
};

async function CookieMonsta_SetUserCookies(iGuild, iUser, iCookies)
{
    const QueryUpdateCookies = "UPDATE `UserCookiesTable` SET `user` = ?, `guild` = ?, `cookies` = ? WHERE `id` = ?;";

    const PrimaryKeyValue = iGuild + "-" + iUser;

    DatabaseConnection.query(QueryUpdateCookies, [iUser, iGuild, (parseInt(iCookies) <= 0 || isNaN(iCookies) ? 0 : parseInt(iCookies)), PrimaryKeyValue], (err, results) =>
    {
        if(err)
        {
            console.log("\x1b[31m*\x1b[0m Query error on (CookieMonsta_SetUserCookies): " + err + "\x1b[0m");
        }
    });
};

async function CookieMonsta_GetUserProfileBanner(iGuild, iUser)
{
    return new Promise((resolve, reject) =>
    {
        const QueryGetUserBanner = "SELECT `user_banner_img` FROM `UserCookiesTable` WHERE `user` = ? AND `guild` = ?;";

        DatabaseConnection.query(QueryGetUserBanner, [iUser, iGuild], (err, results) =>
        {
            if(err)
            {
                reject(err.message);
            }

            if(results.length <= 0)
            {
                resolve("01");
            }

            // --| Remove .png from string
            resolve(results[0].user_banner_img.slice(0, -4));
        });
    });
};

async function CookieMonsta_SetUserProfileBanner(iGuild, iUser, szBannerImageFile)
{
    const QueryUpdateUserBanner = "UPDATE `UserCookiesTable` SET `user` = ?, `guild` = ?, `user_banner_img` = ? WHERE `id` = ?;";

    const PrimaryKeyValue = iGuild + "-" + iUser;

    DatabaseConnection.query(QueryUpdateUserBanner, [iUser, iGuild, szBannerImageFile.trim(), PrimaryKeyValue],(err, results) =>
    {
        if(err)
        {
            console.log("\x1b[31m*\x1b[0m Query error on (CookieMonsta_SetUserProfileBanner): " + err + "\x1b[0m");
        }
    });
};

async function CookieMonsta_GetBannerFromDatabase(szFileName)
{
    return new Promise((resolve, reject) =>
    {
        const QueryGetBanner = "SELECT * FROM `BannersTable` WHERE `png_file` = ?;";
        const szPngFile = szFileName + ".png";

        DatabaseConnection.query(QueryGetBanner, szPngFile.toString(), (err, results) =>
        {
            if(err)
            {
                reject(err.message);
            }

            if(Object.keys(results).length <= 0)
            {
                resolve("No banner found with that name");
            }

            else
            {
                let BannerDetailsResult =
                {
                    card_description: results[0].card_description,
                    png_file: results[0].png_file,
                    username_color: results[0].username_color,
                    stats_color: results[0].stats_color
                };

                resolve(BannerDetailsResult);
            }
        });
    });
};

async function CookieMonsta_GetAllBanners()
{
    return new Promise((resolve, reject) =>
    {
        const QueryGetAllBanners = "SELECT * FROM `BannersTable`;";

        DatabaseConnection.query(QueryGetAllBanners, (err, results) =>
        {
            if(err)
            {
                reject(err.message);
            }

            if(Object.keys(results).length <= 0)
            {
                resolve("No banners found");
            }

            else
            {
                resolve(results);
            }
        });
    });
};

async function CookieMonsta_CheckCreateUser(iGuild, iUser)
{
    if(!await CookieMonsta_UserExists(iGuild, iUser))
    {
        await CookieMonsta_CreateUser(iGuild, iUser, 150, 0, 1, "01.png");
    }
};

async function CookieMonsta_GetGuildPrefix(iGuild)
{
    return new Promise((resolve, reject) =>
    {
        const QueryGetPrefix = "SELECT `prefix` FROM `PrefixTable` WHERE `guild` = ?;";

        DatabaseConnection.query(QueryGetPrefix, iGuild, (err, results) =>
        {
            if(err)
            {
                reject(err.message);
            }

            if(Object.keys(results).length <= 0)
            {
                // --| If there is no result returned, there is no need to fill the database with default prefixes
                // --| We just return "!" the default prefix
                resolve("!");
            }

            else
            {
                resolve(results[0].prefix.toString());
            }
        });
    });
};

async function CookieMonsta_SetGuildPrefix(iGuild, szPrefix)
{
    const QuerySetPrefix = "INSERT INTO `PrefixTable` (`guild`, `prefix`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `prefix` = ?";

    DatabaseConnection.query(QuerySetPrefix, [iGuild, szPrefix.trim(), szPrefix.trim()], (err, results) =>
    {
        if(err)
        {
            console.log("\x1b[31m*\x1b[0m Query error on (CookieMonsta_SetGuildPrefix): " + err + "\x1b[0m");
        }
    });
};

async function CookieMonsta_GetAllFromPrefix()
{
    return new Promise((resolve, reject) =>
    {
        const QueryGetAll = "SELECT * FROM `PrefixTable`";

        DatabaseConnection.query(QueryGetAll, (err, results) =>
        {
            if(err)
            {
                reject(err.message);
            }

            resolve(results);
        });
    });
};

module.exports.CookieMonsta_InitialiseDatabase = CookieMonsta_InitialiseDatabase;
module.exports.CookieMonsta_UserExists = CookieMonsta_UserExists;
module.exports.CookieMonsta_CreateUser = CookieMonsta_CreateUser;
module.exports.CookieMonsta_GetUserPoints = CookieMonsta_GetUserPoints;
module.exports.CookieMonsta_GetUserLevel = CookieMonsta_GetUserLevel;
module.exports.CookieMonsta_GetUserCookies = CookieMonsta_GetUserCookies;
module.exports.CookieMonsta_GetUserProfileBanner = CookieMonsta_GetUserProfileBanner;
module.exports.CookieMonsta_SetUserCookies = CookieMonsta_SetUserCookies;
module.exports.CookieMonsta_UpdatePoints_And_Level = CookieMonsta_UpdatePoints_And_Level;
module.exports.CookieMonsta_SetUserProfileBanner = CookieMonsta_SetUserProfileBanner;
module.exports.CookieMonsta_AddBannerToTable = CookieMonsta_AddBannerToTable;
module.exports.CookieMonsta_GetBannerFromDatabase = CookieMonsta_GetBannerFromDatabase;
module.exports.CookieMonsta_GetAllBanners = CookieMonsta_GetAllBanners;
module.exports.CookieMonsta_CheckCreateUser = CookieMonsta_CheckCreateUser;
module.exports.CookieMonsta_GetGuildPrefix = CookieMonsta_GetGuildPrefix
module.exports.CookieMonsta_SetGuildPrefix = CookieMonsta_SetGuildPrefix;
module.exports.CookieMonsta_GetAllFromPrefix = CookieMonsta_GetAllFromPrefix;