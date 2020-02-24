const Discord = require("discord.js");
const Mixer = require("@mixer/client-node");
const CustomFunctions = require("../../functions/funcs.js");
const BotConfig = require("../../config/botconfig.json");

const MixerClient = new Mixer.Client(new Mixer.DefaultRequestRunner());
MixerClient.use(new Mixer.OAuthProvider(MixerClient, { clientId: BotConfig.Mixer_ClientID.trim() }));

module.exports.run = async (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Please specify a Mixer.com streamer username!  :no_entry:");
    }

    await message.channel.startTyping();

    const MixerUserArgument = szArgs[0].trim();

    await MixerClient.request("GET", "channels/" + MixerUserArgument).then(async (response) =>
    {
        if(await response.body.online)
        {
            const szUserStreamName = await response.body.user.username.toString();
            const szUserStreamAvatarURL = await response.body.user.avatarUrl.toString();
            const szUserStreamGamePlayed = await response.body.type.name.toString();
            const szUserStreamTitle = await response.body.name.toString();
            const szUserStreamLanguage = await response.body.languageId.toString().toUpperCase();
            const szUserStreamBannerURL = await response.body.thumbnail.url.toString();

            const iCurrentUserViewers = parseInt(await response.body.viewersCurrent);
            const iUserMixerLevel = parseInt(await response.body.user.level);
            const iUserTotalSparks = parseInt(await response.body.user.sparks);

            const szMixerProfileURL = "https://mixer.com/" + szUserStreamName;

            let szDescription = "`Mixer.com Results:`\n" +
            ":speaking_head: User: **" + szUserStreamName + "**\n" +
            ":label: Stream Title: **" + szUserStreamTitle.replace(/\\/gi, "") + "**\n" +
            ":sparkler: User Sparks: **" + iUserTotalSparks + "**\n" +
            ":gem: User Mixer Level: **" + iUserMixerLevel + "**\n" +
            ":link: URL: [" + szMixerProfileURL + "](" + szMixerProfileURL + ")\n\n" +
            "`Stream Information:`\n" +
            ":microphone: Stream Language: **" + szUserStreamLanguage + "**\n" +
            ":video_game: Streaming: **" + szUserStreamGamePlayed + "**\n" +
            ":busts_in_silhouette: Viewers: **" + iCurrentUserViewers + "**\n";

            const DiscordRichEmbed = new Discord.RichEmbed()
            .setAuthor("Cookie Monsta | Mixer LIVE Check", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
            .setColor("#02052")
            .setDescription(szDescription)
            .setThumbnail(szUserStreamAvatarURL)
            .attachFile({ attachment: szUserStreamBannerURL, name: "mixer_thumbnail.png" })
            .setImage("attachment://mixer_thumbnail.png")
            .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
            .setTimestamp()

            await message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

        else
        {
            return await message.reply(" I could not find ``" + MixerUserArgument + "`` on Mixer.com, or the user is offline.  :head_bandage:").then(() => message.channel.stopTyping(true)).catch(err => message.channel.stopTyping(true));
        }

    });
};

module.exports.help =
{
    name: "livemixer"
};