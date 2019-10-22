const fs = require("fs");
const CustomFunctions = require("../../functions/funcs.js");

const szFilePathJSON = "./devonly/list.json";

module.exports.run = async (bot, message, szArgs) =>
{
    if(message.author.id !== "266677298051153920")
    {
        return await message.reply(" :no_entry_sign: you're not the Dev pleb :facepalm:  :no_entry_sign:");
    }

    let guildList = bot.guilds;

    // guildList.forEach(async (guild) =>
    // {
    //     let GuildObj = [];
    //     GuildObj.push(
    //     {
    //         "guild_id: " + guild.id
    //         {
    //             guild_name: guild.name, 
    //             guild_region: CustomFunctions.GuildLocation(guild.region), 
    //             guild_member_count: guild.memberCount, 
    //             guild_verification_level: CustomFunctions.GuildVerificationLevel(guild.verificationLevel)
    //         }
    //     });

    //     let szOutputJSON = JSON.stringify(GuildObj);

    //     fs.writeFile(szFilePathJSON, szOutputJSON, "utf8", (err) =>
    //     {
    //         if(err)
    //         {
    //             return console.log(err);
    //         };
    //     });

    //     console.log(szOutputJSON)
    // });

    await message.channel.send(":recycle: ⇒ Your wish is my command my Lord :ok_hand:! Check your stuff dev. :wink:");
};

module.exports.help =
{
    name: "guildlist"
}