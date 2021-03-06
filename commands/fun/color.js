const Discord = require("discord.js");
const IgnoreCase = require("ignore-case");
const CustomFunctions = require("../../functions/funcs.js");
const DatabaseImport = require("../../database/database.js");
const CookieMonsta = require("../../CookieMonstaBOT.js");

const ColorRoles =
[
    ["Blue", "#4169E1"],        ["Green", "#27AE60"],
    ["Orange", "#FF8C00"],      ["Red", "#FF0000"],
    ["Pink", "#FF1493"],        ["Violet", "#8a2be2"],
    ["Brown", "#B22222"],       ["Lime", "#00FF00"],
    ["Aqua", "#00FFFF"],        ["Yellow", "#FFFF00"],
    ["White", "#FFFFFF"],       ["Gold", "#FFD700"],
    ["Aquamarine", "#7FFFD4"],  ["Tomato", "#FF6347"],
    ["Olive", "#6B8E23"],       ["Beige", "#F5F5DC"],
    ["Orchid", "#DA70D6"],      ["PaleGreen", "#98FB98"],
    ["Maroon", "#800000"],      ["Teal", "#008080"],
    ["OrangeRed", "#FF4500"],   ["Purple", "#911eb4"],
    ["Apricot", "#ffd8b1"],     ["GreenYellow", "#ADFF2F"],
    ["Ruby", "#E0115F"],        ["Magenta", "#FF00FF"],
    ["Army", "#4b5320"],        ["LimePie", "#cdd31e"]
];

const CookieRolesPermissions =
[
    "CREATE_INSTANT_INVITE", "CHANGE_NICKNAME", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES",
    "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS",
    "ADD_REACTIONS", "CONNECT", "SPEAK", "USE_VAD"
];

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: it seems your color parameter is empty or invalid! Try entering a color or type ``list`` as a parameter.  :no_entry:");
    }

    if(!message.member.guild.me.hasPermission(["MANAGE_ROLES", "SEND_MESSAGES"]))
    {
        return message.reply(" :no_entry: I need the `MANAGE_ROLES` and `SEND_MESSAGES` permissions in order to apply colors :art: !  :no_entry:");
    }

    let ColorList = [];

    if(szArgs[0] === "list")
    {
        for(let i = 0; i < ColorRoles.length; i++)
        {
            ColorList.push(ColorRoles[i][0]);
        }

        return message.reply(" available colors (**" + parseInt(ColorRoles.length) + "**) :art: are :arrow_right: **" + ColorList.join("**, **") + "**");
    }

    const user = message.author;
    const GetGuildID = message.guild.id;

    await DatabaseImport.CookieMonsta_CheckCreateUser(GetGuildID, user.id);

    const iUserCookies = await DatabaseImport.CookieMonsta_GetUserCookies(GetGuildID, user.id);

    if(iUserCookies < 150)
    {
        return message.reply(" :no_entry: you need **150** cookies :cookie: to buy a color! :art:  :no_entry:");
    }

    let i, x;
    let ColorRoleFind;

    for(i = 0; i < ColorRoles.length; i++)
    {
        if(IgnoreCase.equals(szArgs[0], ColorRoles[i][0]))
        {
            // --| If role exists // role => role.name
            ColorRoleFind = message.guild.roles.cache.find(role => role.name === ColorRoles[i][0] + " Cookie");

            if(!ColorRoleFind)
            {
                for(x = 0; x < ColorRoles.length; x++)
                {
                    const role = message.member.guild.roles.cache.find(role => role.name === ColorRoles[x][0] + " Cookie");

                    if(role && !message.member.roles.cache.has(ColorRoleFind))
                    {
                        await message.member.roles.remove(role).catch((error) =>
                        {
                            return message.channel.send("<:cookiemonsta:634866060465537034> **|** I have encountered an error during the **COLOR** command: ``" + error.message + "``\n<:cookiemonsta:634866060465537034> **|** You might want to take a look here: (https://tutyamxx.github.io/cookie-monsta-website/tutorial.html)");
                        });
                    }
                }

                // --| Create new Color Cookie if doesn't exist
                await message.guild.roles.create(
                {
                    data:
                    {
                        name: ColorRoles[i][0] + " Cookie",
                        color: ColorRoles[i][1].toString(),
                        hoist: true,
                        mentionable: false,
                        permissions: CookieRolesPermissions
                    }

                }).then(async () =>
                {
                    const FindNewColor = message.guild.roles.cache.find(role => role.name === ColorRoles[i][0] + " Cookie");

                    await message.member.roles.add(FindNewColor).then(async () =>
                    {
                        await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, user.id, iUserCookies - 150);
                        message.channel.send(`${user} has bought the color: **${ColorRoles[i][0]}** :art: for **150** cookies :cookie:`);

                    }).catch((error) =>
                    {
                        return message.channel.send("<:cookiemonsta:634866060465537034> **|** I have encountered an error during the **COLOR** command: ``" + error.message + "``\n<:cookiemonsta:634866060465537034> **|** You might want to take a look here: (https://tutyamxx.github.io/cookie-monsta-website/tutorial.html)");
                    });

                }).catch((error) =>
                {
                    return message.channel.send("<:cookiemonsta:634866060465537034> **|** I have encountered an error during the **COLOR** command: ``" + error.message + "``\n<:cookiemonsta:634866060465537034> **|** You might want to take a look here: (https://tutyamxx.github.io/cookie-monsta-website/tutorial.html)");
                });
            }

            else
            {
                if(message.member.roles.cache.has(ColorRoleFind.id))
                {
                    return message.reply(" :no_entry: you already have this color applied! :art:  :no_entry:");
                }

                for(x = 0; x < ColorRoles.length; x++)
                {
                    const role = message.member.guild.roles.cache.find(role => role.name === ColorRoles[x][0] + " Cookie");

                    if(role && !message.member.roles.cache.has(ColorRoleFind.id))
                    {
                        await message.member.roles.remove(role).catch((error) =>
                        {
                            return message.channel.send("<:cookiemonsta:634866060465537034> **|** I have encountered an error during the **COLOR** command: ``" + error.message + "``\n<:cookiemonsta:634866060465537034> **|** You might want to take a look here: (https://tutyamxx.github.io/cookie-monsta-website/tutorial.html)");
                        });
                    }
                }

                await message.member.roles.add(ColorRoleFind).then(async () =>
                {
                    await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, user.id, iUserCookies - 150);
                    message.channel.send(`${user} has bought the color: **${ColorRoles[i][0]}** :art: for **150** cookies :cookie:`);

                }).catch((error) =>
                {
                    return message.channel.send("<:cookiemonsta:634866060465537034> **|** I have encountered an error during the **COLOR** command: ``" + error.message + "``\n<:cookiemonsta:634866060465537034> **|** You might want to take a look here: (https://tutyamxx.github.io/cookie-monsta-website/tutorial.html)");
                });
            }
        }
    }
};

module.exports.help =
{
    name: "color"
};