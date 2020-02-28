const Discord = require("discord.js");
const Mixer = require("@mixer/client-node");
const CustomFunctions = require("../../functions/funcs.js");
const BotConfig = require("../../config/botconfig.json");

const MixerClient = new Mixer.Client(new Mixer.DefaultRequestRunner());
MixerClient.use(new Mixer.OAuthProvider(MixerClient, { clientId: BotConfig.Mixer_ClientID.trim() }));

module.exports.run = (bot, message, szArgs) =>
{
    const user = message.author;

    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Please specify a Mixer.com streamer username!  :no_entry:");
    }

    message.channel.startTyping();

    const MixerUserArgument = szArgs[0].trim();

    MixerClient.request("GET", "channels/" + MixerUserArgument).then((response) =>
    {
        if(response.body.online)
        {
            const szUserStreamName = response.body.user.username.toString();
            const szUserStreamAvatarURL = response.body.user.avatarUrl.toString();
            const szUserStreamGamePlayed = response.body.type.name.toString();
            const szUserStreamTitle = response.body.name.toString();
            const szUserStreamLanguage = response.body.languageId.toString().toUpperCase();
            const szUserStreamBannerURL = response.body.thumbnail.url.toString();

            const iCurrentUserViewers = parseInt(response.body.viewersCurrent);
            const iUserMixerLevel = parseInt(response.body.user.level);
            const iUserTotalSparks = parseInt(response.body.user.sparks);

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

            message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        }

        else
        {
            return message.reply(" I could not find ``" + MixerUserArgument + "`` on Mixer.com, or the user is offline.  :head_bandage:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        }
    });
};

module.exports.help =
{
    name: "livemixer"
};