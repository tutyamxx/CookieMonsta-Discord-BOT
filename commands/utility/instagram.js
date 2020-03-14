const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Type an **Instagram** :fog: username?  :no_entry:");
    }

    if(message.mentions.members.first())
    {
        return message.reply(" :no_entry: please don't mention people, just type the **Instagram** :fog: username! :no_entry:");
    }

    const user = message.author;
    const szInstagramUsername = szArgs[0].trim();

    message.channel.startTyping();

    axios.get(`https://www.instagram.com/${szInstagramUsername}/?__a=1`).then((response) =>
    {
        if(response.status === 200)
        {
            const ResultResponse = response.data;

            const UserInstagramName = ResultResponse.graphql.user.full_name;
            const UserInstagramUsername = ResultResponse.graphql.user.username;
            const UserInstagramProfileLink = `https://www.instagram.com/${UserInstagramUsername}/`;
            const UserInstagramDescription = ResultResponse.graphql.user.biography.replace(/(?:\r\n|\r|\n)/gi, " ").replace(/\\/gi, "");
            const UserInstagramFollowing = parseInt(ResultResponse.graphql.user.edge_follow.count);
            const UserInstagramFollowers = parseInt(ResultResponse.graphql.user.edge_followed_by.count);
            const UserInstagramProfilePhotoHD = ResultResponse.graphql.user.profile_pic_url_hd;

            const UserInstagramPrivateProfile = ResultResponse.graphql.user.is_private;

            const UserInstagramLatestPost = (ResultResponse.graphql.user.edge_owner_to_timeline_media.edges.length > 0) ? ResultResponse.graphql.user.edge_owner_to_timeline_media.edges[0].node.display_url : "";
            const UserInstagramLatestPostLikes = (ResultResponse.graphql.user.edge_owner_to_timeline_media.edges.length > 0) ? parseInt(ResultResponse.graphql.user.edge_owner_to_timeline_media.edges[0].node.edge_liked_by.count) : "";
            const UserInstagramLatestPostComments = (ResultResponse.graphql.user.edge_owner_to_timeline_media.edges.length > 0) ? parseInt(ResultResponse.graphql.user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_comment.count) : "";

            let szDescription = ":link: Profile Link: " + UserInstagramProfileLink + "\n" +
            ":label: Username: **" + UserInstagramUsername + "**\n" +
            ":bust_in_silhouette: Full Name: **" + UserInstagramName + "**\n" +
            (CustomFunctions.isEmpty(UserInstagramDescription)  ? "" : ":tickets: Biography: **" + UserInstagramDescription + "**\n") +
            ":eyes: Following: **" + UserInstagramFollowing + "** `|` :family_mwbb: Followers: **" + UserInstagramFollowers + "**\n" +
            ":no_entry: Private Account: **" + (UserInstagramPrivateProfile === true ? "Yes" : "No") + "**" +
            (UserInstagramPrivateProfile === true ? "" : "\n\n`Latest Post Information`\n:heart: Likes: **" + UserInstagramLatestPostLikes + "** `|` :speech_balloon: Comments: **" + UserInstagramLatestPostComments + "**\n") +
            (UserInstagramPrivateProfile === true ? "" : "\n`Latest Post URL`\n[Click to see latest photo HD](" + UserInstagramLatestPost + ") • [Click to see latest post on Instagram](https://instagram.com/p/" + ResultResponse.graphql.user.edge_owner_to_timeline_media.edges[0].node.shortcode + ")")

            const DiscordRichEmbed = new Discord.MessageEmbed()
            .setAuthor("Cookie Monsta | Instagram Checker", bot.user.displayAvatarURL())
            .setColor("#DB2D78")
            .setDescription(szDescription)
            .setThumbnail(UserInstagramProfilePhotoHD)
            .setFooter("Requested by: @" + user.username, user.displayAvatarURL())
            .setTimestamp()

            message.channel.send({ embed: DiscordRichEmbed }).then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
        }

    }).catch(() =>
    {
        return message.reply(" :no_entry: Sorry, I could not find this user: `" + szInstagramUsername + "` on **Instagram** :fog:  :no_entry:").then(() => message.channel.stopTyping(true)).catch(() => message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "instagram"
};