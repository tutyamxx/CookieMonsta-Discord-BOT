const Discord = require("discord.js");
const axios = require("axios");
const CustomFunctions = require("../../functions/funcs.js");
const BotConfig = require("../../config/botconfig.json");

module.exports.run = async (bot, message, szArgs) =>
{
    if(CustomFunctions.isEmpty(szArgs[0]))
    {
        return await message.reply(" :no_entry: this parameter can't be empty you scrub :facepalm: ! Please specify something to search for on FileList!  :no_entry:");
    }

    const user = message.author;
    const ArgumentText = szArgs.join(" ");

    await message.channel.startTyping();

    await axios.get("https://filelist.ro/api.php?username=" + BotConfig.Filelist_Username.trim() + "&passkey=" + BotConfig.Filelist_Key.trim() + "&action=search-torrents&type=name&query=" + encodeURI(ArgumentText)).then(async (response) =>
    {
        const SearchLatestTorrent = await response.data[0];

        if(SearchLatestTorrent === undefined || SearchLatestTorrent.length <= 0)
        {
            return await message.channel.send(":no_entry: Sorry, I couldn't find any torrent on FileList with that name... :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
        }

        const GetTorrentName = SearchLatestTorrent.name;
        const GetFreeLeech = (SearchLatestTorrent.freeleech === 0) ? "No" : "Yes";
        const GetTorrentUploadDate = SearchLatestTorrent.upload_date;

        const GetTorrentCategory = SearchLatestTorrent.category;
        const GetTorrentSmallDesc = SearchLatestTorrent.small_description;

        const GetTorrentSeeders = parseInt(SearchLatestTorrent.seeders);
        const GetTorrentLeechers = parseInt(SearchLatestTorrent.leechers);
        const GetTorrentDownloads = parseInt(SearchLatestTorrent.times_completed);
        const GetTorrentFiles = parseInt(SearchLatestTorrent.files);

        let szDescription = "`FileList.ro Result:`\n" +
        ":label: Torrent Name: **" + GetTorrentName + "**\n" +
        ":scroll: Category: **" + GetTorrentCategory + "**\n" +
        ":gear: Small Category: **" + GetTorrentSmallDesc + "**\n" + 
        ":four_leaf_clover: Freelech: **" + GetFreeLeech + "**\n" +
        ":date: Upload Date: **" + GetTorrentUploadDate + "**\n\n" +
        "`Torrent Information:`\n" +
        ":snail: Seeders: **" + GetTorrentSeeders + "** | Leechers: ** " + GetTorrentLeechers + "**\n" +
        ":inbox_tray: Downloads: **" + GetTorrentDownloads + "**\n" +
        ":file_folder: Files in torrent: **" + GetTorrentFiles + "**";

        const DiscordRichEmbed = new Discord.RichEmbed()
        .setAuthor("Cookie Monsta | FileList Search: " + ArgumentText, (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
        .setColor("#2956aa")
        .setDescription(szDescription)
        .setThumbnail("https://i.imgur.com/9OSd2BD.jpg")
        .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)
        .setTimestamp()

        await message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));

    }).catch(async () =>
    {
        return await message.channel.send(":no_entry: Sorry, something went wrong this time :sad: ... :no_entry:").then(async () => await message.channel.stopTyping(true)).catch(async () => await message.channel.stopTyping(true));
    });
};

module.exports.help =
{
    name: "filelist"
};