const Needle = require("needle");
const BotConfig = require("../config/botconfig.json");

async function PollTwitchAPI(szUser)
{
    return new Promise(async (resolve, reject) =>
    {
        const TwitchHeader =
        {
            headers:
            {
                "Client-ID": BotConfig.Twitch_API_ClientID.trim(),
                "Accept": "application/vnd.twitchtv.v5+json"
            }
        };

        Needle.get("https://api.twitch.tv/helix/users?login=" + szUser, TwitchHeader, async (error, response) =>
        {
            if(!error && response.statusCode === 200)
            {
                const UserTwitchID = await response.body.data[0].id;
                const UserTwitchAvatar = await response.body.data[0].profile_image_url;

                Needle.get("https://api.twitch.tv/helix/streams?user_id=" + UserTwitchID, TwitchHeader, async (error, response) =>
                {
                    if(!error && response.statusCode === 200)
                    {
                        const StreamChannel = await response.body.data[0];

                        if(StreamChannel !== undefined && StreamChannel.type === "live")
                        {
                            const StreamChannelURL = "https://www.twitch.tv/" + StreamChannel.user_name;

                            Needle.get("https://api.twitch.tv/helix/games?id=" + StreamChannel.game_id, TwitchHeader, async (error, response_game) =>
                            {
                                if(!error && response_game.statusCode === 200)
                                {
                                    const szGamePlayedName = await response_game.body.data[0].name;

                                    let TwitchResults =
                                    {
                                        livestream_user: StreamChannel.user_name,
                                        game_played: szGamePlayedName.toString(),
                                        viewers: StreamChannel.viewer_count,
                                        preview_thumbnail: StreamChannel.thumbnail_url.replace("{width}", "640").replace("{height}", "360"),
                                        language: StreamChannel.language.toUpperCase(),
                                        profile_avatar: UserTwitchAvatar.toString(),
                                        profile_twitch_url: StreamChannelURL.toString(),
                                        stream_description: StreamChannel.title
                                    };

                                    resolve(TwitchResults);
                                }
                            });
                        }

                        else
                        {
                            resolve(null);
                        }
                    }
                });
            }

            else
            {
                resolve(null);
            }
        });
    });
};

module.exports.PollTwitchAPI = PollTwitchAPI;