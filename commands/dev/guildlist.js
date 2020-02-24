const fs = require("fs");

const szFilePathJSON = "./devonly/list.json";

module.exports.run = async (bot, message, szArgs) =>
{
    if(message.author.id !== "266677298051153920")
    {
        return await message.reply(" :no_entry_sign: you're not the Dev pleb :facepalm:  :no_entry_sign:");
    }

    let GuildList = bot.guilds;
    let ArrayGuild = [];

    GuildList.forEach(async (guild) =>
    {
        ArrayGuild.push(
        {
            guild_id: parseInt(guild.id),
            guild_icon_url: guild.iconURL,
            guild_splash_url: (guild.splashURL === null) ? "No Splash URL" : guild.splashURL,
            guild_name_acronym: guild.nameAcronym,
            guild_name: guild.name,
            guild_large: (guild.large === true) ? "Large" : "Medium",
            guild_verified: (guild.verified === true) ? "Verified" : "Not Verified",
            guild_available: (guild.available === true) ? "Avaliable" : "Server Outage",
            guild_ownerid: parseInt(guild.ownerID),
            guild_region: guild.region,
            guild_member_count: guild.memberCount,
            guild_verification_level: parseInt(guild.verificationLevel)
        });

        fs.writeFile(szFilePathJSON, JSON.stringify(ArrayGuild, null, 4), "utf8", (err) =>
        {
            if(err)
            {
                return message.channel.send(":recycle: ⇒ I have encountered an error sir: **" + err + "**");
            };
        });
    });

    await message.channel.send(":recycle: ⇒ Your wish is my command my Lord :ok_hand:! Check your nerdy dev stuff. :wink:");
};

module.exports.help =
{
    name: "guildlist"
}