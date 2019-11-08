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
            const QueryCreateBannersTable = "CREATE TABLE IF NOT EXISTS `BannersTable` (`png_file` VARCHAR(255) NOT NULL, `username_color` VARCHAR(255) NOT NULL, `stats_color` VARCHAR(255) NOT NULL, PRIMARY KEY (`png_file`));";

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

        DatabaseConnection.query(QueryCheckForUser, [parseInt(iUser), parseInt(iGuild)], (err, results) =>
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

    let PrimaryKeyValue = parseInt(iGuild) + "-" + parseInt(iUser);

    DatabaseConnection.query(QueryUpdateUser, [PrimaryKeyValue, parseInt(iUser), parseInt(iGuild), (parseInt(iCookies) <= 0 || isNaN(iCookies) ? 0 : parseInt(iCookies)), (parseInt(iXP) <= 0 || isNaN(iXP) ? 0 : parseInt(iXP)), (parseInt(iLevel) <= 0 || isNaN(iLevel) ? 1 : parseInt(iLevel)), szBannerImage.trim(), PrimaryKeyValue, parseInt(iUser), parseInt(iGuild), (parseInt(iCookies) <= 0 || isNaN(iCookies) ? 0 : parseInt(iCookies)), (parseInt(iXP) <= 0 || isNaN(iXP) ? 0 : parseInt(iXP)), (parseInt(iLevel) <= 0 || isNaN(iLevel) ? 1 : parseInt(iLevel)), szBannerImage.trim()], (err, results) =>
    {
        if(err)
        {
            console.log("\x1b[31m*\x1b[0m Query error on (CookieMonsta_CreateUser): " + err + "\x1b[0m");
        }
    });
};

async function CookieMonsta_AddBannerToTable(szPngFile, szNameHex, szStatsHex)
{
    const QueryAddBanner = "INSERT INTO `BannersTable` (`png_file`, `username_color`, `stats_color`) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE `png_file` = ?, `username_color` = ?, `stats_color` = ?;";

    DatabaseConnection.query(QueryAddBanner, [szPngFile.trim(), szNameHex.trim(), szStatsHex.trim(), szPngFile.trim(), szNameHex.trim(), szStatsHex.trim()], (err, results) =>
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

        DatabaseConnection.query(QueryGetUserPoints, [parseInt(iUser), parseInt(iGuild)], (err, results) =>
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

        DatabaseConnection.query(QueryGetUserLevel, [parseInt(iUser), parseInt(iGuild)], (err, results) =>
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

    let PrimaryKeyValue = parseInt(iGuild) + "-" + parseInt(iUser);

    DatabaseConnection.query(QueryUpdatePointsAndLevel, [parseInt(iUser), parseInt(iGuild), (parseInt(iXPPoints) <= 0 || isNaN(iXPPoints) ? 0 : parseInt(iXPPoints)), (parseInt(iLevel) <= 0 || isNaN(iLevel) ? 1 : parseInt(iLevel)), PrimaryKeyValue], (err, results) =>
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

        DatabaseConnection.query(QueryGetUserCookies, [parseInt(iUser), parseInt(iGuild)], (err, results) =>
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

    let PrimaryKeyValue = parseInt(iGuild) + "-" + parseInt(iUser);

    DatabaseConnection.query(QueryUpdateCookies, [parseInt(iUser), parseInt(iGuild), (parseInt(iCookies) <= 0 || isNaN(iCookies) ? 0 : parseInt(iCookies)), PrimaryKeyValue], (err, results) =>
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

        DatabaseConnection.query(QueryGetUserBanner, [parseInt(iUser), parseInt(iGuild)], (err, results) =>
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

    let PrimaryKeyValue = parseInt(iGuild) + "-" + parseInt(iUser);

    DatabaseConnection.query(QueryUpdateUserBanner, [parseInt(iUser), parseInt(iGuild), szBannerImageFile.trim(), PrimaryKeyValue],(err, results) =>
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