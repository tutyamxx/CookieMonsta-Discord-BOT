const axios = require("axios");
const BotConfig = require("../config/botconfig.json");

const TwitchHeader =
{
    headers:
    {
        "Client-ID": BotConfig.Twitch_API_ClientID.trim(),
        "Accept": "application/vnd.twitchtv.v5+json"
    }
};

async function PollTwitchAPI(szUser)
{
    return new Promise((resolve) =>
    {
        axios.get("https://api.twitch.tv/helix/users?login=" + szUser, TwitchHeader).then((response) =>
        {
            const TwitchResponseData = response.data.data[0];

            if(response.status === 200 && TwitchResponseData !== undefined)
            {
                const UserTwitchID = TwitchResponseData.id;
                const UserTwitchAvatar = TwitchResponseData.profile_image_url;

                axios.get("https://api.twitch.tv/helix/streams?user_id=" + UserTwitchID, TwitchHeader).then((response) =>
                {
                    if(response.status === 200)
                    {
                        const StreamChannel = response.data.data[0];

                        if(StreamChannel !== undefined && StreamChannel.type === "live")
                        {
                            const StreamChannelURL = "https://www.twitch.tv/" + StreamChannel.user_name;

                            axios.get("https://api.twitch.tv/helix/games?id=" + StreamChannel.game_id, TwitchHeader).then((response_game) =>
                            {
                                if(response_game.status === 200)
                                {
                                    const szGamePlayedName = response_game.data.data[0].name;

                                    let TwitchResults =
                                    {
                                        livestream_user: StreamChannel.user_name,
                                        game_played: szGamePlayedName.toString(),
                                        viewers: StreamChannel.viewer_count,
                                        preview_thumbnail: StreamChannel.thumbnail_url.replace("{width}", "640").replace("{height}", "360") + "&" + Math.floor(Math.random() * 8000) + 1,
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