const Discord = require("discord.js");
const CustomFunctions = require("../../functions/funcs.js");
const TwitchPolling = require("../../functions/twitch-polling.js");

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Please specify a Twitch.TV username!  :no_entry:");
    }

    await message.channel.startTyping();

    const TwitchUserArgument = szArgs[0].trim();
    let GetUserLive = await TwitchPolling.PollTwitchAPI(TwitchUserArgument);

    // --| User is LIVE
    if(GetUserLive !== null)
    {
        let szDescription = "`Twitch.TV Results:`\n" +
        ":speaking_head: User: **" + GetUserLive.livestream_user + "**\n" +
        ":label: Stream Title: **" + GetUserLive.stream_description.replace(/\\/gi, "") + "**\n" +
        ":link: URL: [" + GetUserLive.profile_twitch_url + "](" + GetUserLive.profile_twitch_url + ")\n\n" +
        "`Stream Information:`\n" +
        ":microphone: Stream Language: **" + GetUserLive.language + "**\n" +
        ":video_game: Streaming: **" + GetUserLive.game_played + "**\n" + 
        ":busts_in_silhouette: Viewers: **" + GetUserLive.viewers + "**\n";

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | Twitch LIVE Check", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#6441a5")
        .setDescription(szDescription)
        .setThumbnail(GetUserLive.profile_avatar)
        .attachFile({ attachment: GetUserLive.preview_thumbnail, name: "twitch_thumbnail.png" })
        .setImage("attachment://twitch_thumbnail.png")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
        .setTimestamp()

        await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    }

    else
    {
        return await message.reply(" I could not find ``" + TwitchUserArgument + "`` on Twitch.TV, or the user is offline.  :head_bandage:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
    }
};

module.exports.help =
{
    name: "livetwitch"
};