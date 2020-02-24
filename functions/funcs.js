const moment = require("moment");

function bytesToSize(bytes)
{
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    if(bytes == 0) return '0 Byte';

    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

function GuildLocation(guild)
{
    let ReturnLocation;

    switch(guild.region)
    {
        case "brazil":
            ReturnLocation = "Brazil";
            break;

        case "eu-central":
            ReturnLocation = "Central Europe";
            break;

        case "europe":
            ReturnLocation = "Europe";
            break;

        case "eu-west":
            ReturnLocation = "Western Europe";
            break;

        case "hongkong":
            ReturnLocation = "Hong Kong";
            break;

        case "russia":
            ReturnLocation = "Russia";
            break;

        case "japan":
            ReturnLocation = "Japan";
            break;

        case "singapore":
            ReturnLocation = "Singapore";
            break;

        case "southafrica":
            ReturnLocation = "South Africa";
            break;

        case "sydney":
            ReturnLocation = "Sydney";
            break;

        case "us-central":
            ReturnLocation = "US Central";
            break;

        case "us-east":
            ReturnLocation = "US East";
            break;

        case "us-west":
            ReturnLocation = "US West";
            break;
    }

    return ReturnLocation;
};

function GuildVerificationLevel(guild)
{
    let ReturnVerificationLevel;

    switch(guild.verificationLevel)
    {
        case 0:
            ReturnVerificationLevel = "None";
            break;

        case 1:
            ReturnVerificationLevel = "Low";
            break;

        case 2:
            ReturnVerificationLevel = "Medium";
            break;

        case 3:
            ReturnVerificationLevel = "(╯°□°）╯︵ ┻━┻";
            break;

        case 4:
            ReturnVerificationLevel = "┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻";
            break;
    }

    return ReturnVerificationLevel;
};

function isEmpty(str)
{
	return (!str || 0 === str.length);
};

function reverseString(str)
{
    return str.split("").reverse().join("");
};

function secondsToString(seconds)
{
    seconds = Math.trunc(seconds);

    let numdays = Math.floor((seconds % 31536000) / 86400);
    let numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    let numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    let numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;

    return `**${numdays}** days **${numhours}** hours **${numminutes}** minutes **${numseconds}** seconds`;
};

function CheckHalloween()
{
    // --| Halloween checkings
    const iToday = moment().startOf("day");
    const iHalloweenDate = moment("31-10", "DD-MM");
    const iDaysTillHalloween = iHalloweenDate.diff(iToday, "days");

    // --| If there are 5 days until halloween or actual halloween
    // --| 5 days left till Halloween - 0 It's Halloween
    if(iDaysTillHalloween === 5 
    || iDaysTillHalloween === 4
    || iDaysTillHalloween === 3
    || iDaysTillHalloween === 2
    || iDaysTillHalloween === 1 
    || iDaysTillHalloween === 0)
    {
        return true;
    }

    // --| Halloween passed
    else if(iDaysTillHalloween < 0)
    {
        return false;
    }
};

function CheckChristmas()
{
    // --| Christmas checkings
    const iToday = moment().startOf("day");
    const iChristmasDate = moment("25-12", "DD-MM");
    const iDaysTillChristmas = iChristmasDate.diff(iToday, "days");

    // --| If there are 10 days until christmas or actual christmas
    // --| 10 days left till Christmas 0 - It's Christmas
    if(iDaysTillChristmas === 10 || iDaysTillChristmas === 9 || iDaysTillChristmas === 8 
    || iDaysTillChristmas === 7 || iDaysTillChristmas === 6 
    || iDaysTillChristmas === 5 || iDaysTillChristmas === 4 
    || iDaysTillChristmas === 3 || iDaysTillChristmas === 2
    || iDaysTillChristmas === 1 || iDaysTillChristmas === 0)
    {
        return true;
    }

    // --| Christmas passed
    else if(iDaysTillChristmas < 0)
    {
        return false;
    }
};

function capitalizeFirstLetter(string)
{
	return string.charAt(0).toUpperCase() + string.slice(1);
};

function measureText(font, text)
{
    let x = 0;

    for(let i = 0; i < text.length; i++)
    {
        if(font.chars[text[i]])
        {
            x += font.chars[text[i]].xoffset + (font.kernings[text[i]] && font.kernings[text[i]][text[i + 1]] ? font.kernings[text[i]][text[i + 1]] : 0) + (font.chars[text[i]].xadvance || 0);
        }
    }

    return x;
};

function isInt(value)
{
    let x = parseFloat(value);

    return !isNaN(value) && (x | 0) === x;
};

function format_time_fancy(time)
{
    // --| Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // --| Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0)
    {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
};

function Check_Dank_Meme(iKills, iDeaths)
{
    let szMemeEmoji = "";

    if(iKills < iDeaths)
    {
        szMemeEmoji = "<:kekw:636318717378297908>";
    }

    else if(iKills >= iDeaths)
    {
        szMemeEmoji = "<:monkaH:636318974245601293>";
    }

    return szMemeEmoji;
};

function Dota2_Team_Check(iPlayerSlot)
{
    let DotaPlayerTeam = "";

    if(iPlayerSlot >= 0 && iPlayerSlot <= 127)
    {
        DotaPlayerTeam = "Radiant";
    }

    else if(iPlayerSlot >= 128 && iPlayerSlot <= 255)
    {
        DotaPlayerTeam = "Dire";
    }

    return DotaPlayerTeam;
};

function Dota2_GameMode_Check(iGameMode)
{
    let szGameModeName = "Not Listed";

    switch(parseInt(iGameMode))
    {
        case 1:
            szGameModeName = "All Pick";
            break;
        
        case 2:
            szGameModeName = "Captains Mode";
            break;
        
        case 3:
            szGameModeName = "Random Draft";
            break;
        
        case 4:
            szGameModeName = "Single Draft";
            break;
        
        case 5:
            szGameModeName = "All Random";
            break;
        
        case 12:
            szGameModeName = "Least Played";
            break;

        case 13:
            szGameModeName = "Least Played";
            break;

        case 16:
            szGameModeName = "Captains Draft";
            break;
        
        case 18:
            szGameModeName = "Ability Draft";
            break;
        
        case 20:
            szGameModeName = "All Random Deathmatch";
            break;
        
        case 21:
            szGameModeName = "1v1 Mid";
            break;
        
        case 22:
            szGameModeName = "All Pick";
            break;

        case 23:
            szGameModeName = "Turbo";
            break;
        
        case 24:
            szGameModeName = "Mutation";
            break;
    }

    return szGameModeName;
};

function Dota2_GameType_Check(iGameType)
{
    let szGameTypeName = "Unknown";

    switch(parseInt(iGameType))
    {
        case 0:
            szGameTypeName = "Normal";
            break;
        
        case 5:
            szGameTypeName = "Party Ranked";
            break;
        
        case 6:
            szGameTypeName = "Solo Ranked";
            break;
        
        case 7:
            szGameTypeName = "Ranked";
            break;
        
        case 9:
            szGameTypeName = "Battle Cup";
            break;
    }

    return szGameTypeName;
};

function Dota2_CalculateWinrate(iWonMatches, iLostMatches)
{
    let flCalculate = (parseInt(iWonMatches) / (parseInt(iWonMatches) + parseInt(iLostMatches))) * 100;

    return parseFloat(flCalculate).toFixed(2);
};

function Dota2_ConvertToLaneRole(iRole)
{
    let szLaneRole = "API Error";

    switch(iRole)
    {
        case 1:
            szLaneRole = "Safe Lane";
            break;
        
        case 2:
            szLaneRole = "Mid Lane";
            break;
        
        case 3:
            szLaneRole = "Off Lane";
            break;
        
        case 4:
            szLaneRole = "Jungle";
            break;
    }

    return szLaneRole;
};

function Guild_GetContentFilter(iFilterLevel)
{
    let szFilterName = "Unknown";

    switch(iFilterLevel)
    {
        case 0:
            szFilterName = "No Scan";
            break;

        case 1:
            szFilterName = "Scan Non-Roles";
            break;

        case 2:
            szFilterName = "Scan All";
            break;
    }

    return szFilterName;
};

function InvertColor(HEX, bw)
{
    if(HEX.indexOf("#") === 0)
    {
        HEX = HEX.slice(1);
    }

    // --| Convert 3-digit hex to 6-digits.
    if(HEX.length === 3)
    {
        HEX = HEX[0] + HEX[0] + HEX[1] + HEX[1] + HEX[2] + HEX[2];
    }

    if(HEX.length !== 6)
    {
        throw new Error("Invalid HEX color.");
    }

    const r = parseInt(HEX.slice(0, 2), 16);
    const g = parseInt(HEX.slice(2, 4), 16);
    const b = parseInt(HEX.slice(4, 6), 16);

    if(bw)
    {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? "#000000" : "#FFFFFF";
    }

    // --| Invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);

    return "#" + padZero(r) + padZero(g) + padZero(b);
};

module.exports.bytesToSize = bytesToSize;
module.exports.GuildLocation = GuildLocation;
module.exports.GuildVerificationLevel = GuildVerificationLevel;
module.exports.isEmpty = isEmpty;
module.exports.reverseString = reverseString;
module.exports.secondsToString = secondsToString;
module.exports.CheckHalloween = CheckHalloween;
module.exports.CheckChristmas = CheckChristmas;
module.exports.capitalizeFirstLetter = capitalizeFirstLetter;
module.exports.measureText = measureText;
module.exports.isInt = isInt;
module.exports.GenerateOrcName = GenerateOrcName;
module.exports.format_time_fancy = format_time_fancy;
module.exports.Check_Dank_Meme = Check_Dank_Meme;
module.exports.Dota2_Team_Check = Dota2_Team_Check;
module.exports.Dota2_GameMode_Check = Dota2_GameMode_Check;
module.exports.Dota2_GameType_Check = Dota2_GameType_Check;
module.exports.Dota2_CalculateWinrate = Dota2_CalculateWinrate;
module.exports.Dota2_ConvertToLaneRole = Dota2_ConvertToLaneRole;
module.exports.Guild_GetContentFilter = Guild_GetContentFilter;
module.exports.InvertColor = InvertColor;