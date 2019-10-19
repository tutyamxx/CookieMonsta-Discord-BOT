const Discord = require("discord.js");
const IgnoreCase = require("ignore-case");
const CustomFunctions = require("../../functions/funcs.js");
const GetDatabaseData = require("../../functions/getuserdata.js");
const CookieMonsta = require("../../CookieMonstaBOT.js");

const ColorRoles =
[
    ["Blue",		"#4169E1"], ["Green",       "#27AE60"],
    ["Orange",		"#FF8C00"], ["Red",         "#FF0000"],
    ["Pink",		"#FF1493"], ["Violet",      "#8a2be2"],
    ["Brown",		"#B22222"], ["Lime",        "#00FF00"],
    ["Aqua",		"#00FFFF"], ["Yellow",      "#FFFF00"],
    ["White",		"#FFFFFF"], ["Gold",        "#FFD700"],
    ["Aquamarine",	"#7FFFD4"], ["Tomato",      "#FF6347"],
    ["Olive",		"#6B8E23"], ["Beige",       "#F5F5DC"],
    ["Orchid",		"#DA70D6"], ["PaleGreen",   "#98FB98"],
    ["Maroon",		"#800000"], ["Teal",        "#008080"],
    ["OrangeRed",	"#FF4500"], ["Purple",      "#911eb4"],
    ["Apricot",		"#ffd8b1"], ["GreenYellow", "#ADFF2F"],
    ["Ruby",		"#E0115F"], ["Magenta",     "#FF00FF"]
];

const CookieRolesPermissions =
[
    'CREATE_INSTANT_INVITE', 'ADD_REACTIONS', 'READ_MESSAGES',
    'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'EMBED_LINKS',
    'ATTACH_FILES', 'MENTION_EVERYONE', 'CONNECT',
    'SPEAK', 'CHANGE_NICKNAME', 'READ_MESSAGE_HISTORY',
    'USE_EXTERNAL_EMOJIS', 'EXTERNAL_EMOJIS', 'USE_VAD'
];

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: it seems your color parameter is empty or invalid! Try entering a color or type **!color** ``list``. :no_entry:" );
    }

    let ColorList = "";

    if(szArgs[0] === "list")
    {
        for(let i = 0; i < ColorRoles.length; i++)
        {
            ColorList += "***" + ColorRoles[i][0] + "***, ";
        }

        return await message.reply("available colors :art: are :arrow_right: " + ColorList);
    }

    if(CookieMonsta.UserDatabaseData.cookies < 150)
    {
        return await message.reply(" :no_entry: you don't have enough cookies :cookie: to buy a color! :art:  :no_entry:" );
    }

    let i, x;
    let ColorRoleFind;

    const user = message.author;

    for(i = 0; i < ColorRoles.length; i++)
    {
        if(IgnoreCase.equals(szArgs[0], ColorRoles[i][0]))
        {
            // --| If role exists // role => role.name
            ColorRoleFind = message.guild.roles.find(role => role.name === ColorRoles[i][0] + " Cookie");

            if(!ColorRoleFind)
            {
                for(x = 0; x < ColorRoles.length; x++)
                {
                    const role = message.member.guild.roles.find(role => role.name === ColorRoles[x][0] + " Cookie");

                    if(role && !message.member.roles.has(ColorRoleFind))
                    {
                        message.member.removeRole(role);
                    }
                }

                // --| Create new Color Cookie if doesn't exist
                await message.guild.createRole(
                {
                    name: ColorRoles[i][0] + " Cookie",
                    color: ColorRoles[i][1].toString(),
                    hoist: true,
                    mentionable: false,
                    permissions: CookieRolesPermissions
                    // I assume the above roles are the default ones... Possibly
                }).then(async () =>
                {
                    var FindNewColor = message.guild.roles.find(role => role.name === ColorRoles[i][0] + " Cookie");

                    await GetDatabaseData.CookiesRemove(message.guild.id, user.id, 150);

                    message.member.addRole(FindNewColor).catch(console.error);
                    message.channel.send(user + " has bought the color: **" + ColorRoles[i][0] + "** :art: for **150** cookies :cookie:");
                });
            }

            else
            {
                if(message.member.roles.has(ColorRoleFind.id))
                {
                    return await message.reply(" :no_entry: you already have this color applied! :art:  :no_entry:");
                }

                for(x = 0; x < ColorRoles.length; x++)
                {
                    const role = message.member.guild.roles.find(role => role.name === ColorRoles[x][0] + " Cookie");

                    if(role && !message.member.roles.has(ColorRoleFind.id))
                    {
                        message.member.removeRole(role);
                    }
                }

                await GetDatabaseData.CookiesRemove(message.guild.id, user.id, 150);

                message.member.addRole(ColorRoleFind).catch(console.error);
                message.channel.send(user + " has bought the color: **" + ColorRoles[i][0] + "** :art: for **150** cookies :cookie:");
            }
        }
    }
};

module.exports.help =
{
    name: "color"
};