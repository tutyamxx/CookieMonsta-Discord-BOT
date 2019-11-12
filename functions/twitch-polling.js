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

        Needle.get("https://api.twitch.tv/kraken/users?login=" + szUser, TwitchHeader, async (error, response) =>
        {
            if(!error && response.statusCode === 200)
            {
                let UsersTwitch = await response.body.users;

                Needle.get("https://api.twitch.tv/kraken/streams/" + UsersTwitch[0]._id, TwitchHeader, async (error, response) =>
                {
                    if(!error && response.statusCode === 200)
                    {
                        let StreamChannel = await response.body.stream;
                        
                        if(StreamChannel !== null && StreamChannel.stream_type === "live" && StreamChannel.broadcast_platform === "live")
                        {
                            let TwitchResults =
                            {
                                livestream_user: StreamChannel.channel.display_name,
                                game_played: StreamChannel.game,
                                viewers: StreamChannel.viewers,
                                preview_thumbnail: StreamChannel.preview.large,
                                language: StreamChannel.channel.broadcaster_language.toUpperCase(),
                                profile_avatar: StreamChannel.channel.logo,
                                profile_twitch_url: StreamChannel.channel.url,
                                stream_description: StreamChannel.channel.status
                            };

                            resolve(TwitchResults);
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