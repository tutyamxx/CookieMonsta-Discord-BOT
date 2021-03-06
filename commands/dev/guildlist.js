const fs = require("fs");
const CustomFunctions = require("../../functions/funcs.js");

const szFilePathJSON = "./devonly/list.json";

module.exports.run = (bot, message, szArgs) =>
{
    if(message.author.id !== "266677298051153920")
    {
        return message.reply(" :no_entry_sign: you're not the Dev pleb :facepalm:  :no_entry_sign:");
    }

    const GuildList = bot.guilds.cache;
    let ArrayGuild = [];

    GuildList.forEach((guild) =>
    {
        ArrayGuild.push(
        {
            guild_id: guild.id,
            guild_icon_url: guild.iconURL({ format: "png", size: 2048 }),
            guild_splash_url: (guild.splashURL() === null) ? "No Splash URL" : guild.splashURL(),
            guild_name_acronym: guild.nameAcronym,
            guild_name: guild.name,
            guild_large: (guild.large === true) ? "Large" : "Medium",
            guild_verified: (guild.verified === true) ? "Verified" : "Not Verified",
            guild_available: (guild.available === true) ? "Avaliable" : "Server Outage",
            guild_ownerid: guild.ownerID,
            guild_region: CustomFunctions.GuildLocation(guild),
            guild_member_count: guild.memberCount,
            guild_verification_level: CustomFunctions.GuildVerificationLevel(guild)
        });

        fs.writeFile(szFilePathJSON, JSON.stringify(ArrayGuild, null, 4), "utf8", (err) =>
        {
            if(err)
            {
                return message.channel.send(":recycle: ⇒ I have encountered an error sir: **" + err + "**");
            };
        });
    });

    message.channel.send(":recycle: ⇒ Your wish is my command my Lord :ok_hand:! Check your nerdy dev stuff. :wink:");
};

module.exports.help =
{
    name: "guildlist"
}