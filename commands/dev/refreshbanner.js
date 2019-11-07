const CookieMonsta = require("../../bot.js");
const DatabaseImport = require("../../database/database.js");

// --| PNG file | username color | stats color & cookies color
const StatsCollection =
[
    ["01.png", "#9e8d69", "#DCDCDC"], ["02.png", "#ADD8E6", "#F5F5DC"], ["03.png", "#32CD32", "#FFFAFA"], ["04.png", "#32CD32", "#FFFAFA"],
    ["05.png", "#c9c3ba", "#ffffff"], ["06.png", "#1E90FF", "#FFFAFA"], ["07.png", "#ceae85", "#ffffff"], ["08.png", "#FFA500", "#FF7F50"],
    ["09.png", "#ADD8E6", "#FFFFFF"], ["10.png", "#FFFF00", "#FFFFFF"], ["11.png", "#FFFF00", "#fae37a"], ["12.png", "#b29358", "#E0FFFF"],
    ["13.png", "#2468c1", "#f2fcfd"], ["14.png", "#d23c17", "#ffffff"], ["15.png", "#fefee5", "#ffffff"], ["16.png", "#FF69B4", "#f6d8e6"],
    ["17.png", "#00FF00", "#7FFFD4"], ["18.png", "#548ef9", "#ffffff"], ["19.png", "#d36075", "#FFFFFF"], ["20.png", "#ffffff", "#fffcf1"],
    ["21.png", "#e3cc7a", "#ffffff"], ["22.png", "#ffffff", "#ffffff"], ["23.png", "#ffffff", "#ffffff"], ["24.png", "#ffffff", "#ffffff"],
    ["25.png", "#eb9d66", "#ffffff"], ["26.png", "#eb9d66", "#ffffff"], ["27.png", "#5686a6", "#ffffff"], ["28.png", "#ffffff", "#ffffff"],
    ["29.png", "#ffffff", "#ffffff"], ["30.png", "#bac7e6", "#ffffff"], ["31.png", "#c41fca", "#2387a9"], ["32.png", "#eca8aa", "#65a3b6"],
    ["33.png", "#ffffff", "#feecbe"], ["34.png", "#78123d", "#feecbe"], ["35.png", "#ffffff", "#feecbe"], ["36.png", "#ffffff", "#c3c4bf"],
    ["37.png", "#eee95c", "#ffffff"], ["38.png", "#fca554", "#ffffff"], ["39.png", "#ffffff", "#ffffff"], ["40.png", "#d2bb0e", "#ffffff"],
    ["41.png", "#d2bb0e", "#ffffff"], ["42.png", "#24d6cd", "#ffffff"], ["43.png", "#9b93b8", "#ffffff"], ["44.png", "#ea0e20", "#ffffff"],
    ["45.png", "#ec82ab", "#fcecf2"], ["46.png", "#ffffff", "#fcecf2"], ["47.png", "#334b72", "#d4e2fe"], ["48.png", "#f3d193", "#d4e2fe"],
    ["49.png", "#7b446b", "#d4e2fe"], ["50.png", "#e83336", "#d4e2fe"], ["51.png", "#e83336", "#d4e2fe"], ["52.png", "#f5571e", "#d4e2fe"],
    ["53.png", "#f5571e", "#d4e2fe"], ["54.png", "#819962", "#d4e2fe"], ["55.png", "#e9ab2e", "#ffffff"], ["56.png", "#177099", "#ffffff"],
    ["57.png", "#ec7099", "#ffffff"], ["58.png", "#ec7099", "#ffffff"], ["59.png", "#ffffff", "#ffffff"], ["60.png", "#ffffff", "#ffffff"],
    ["61.png", "#f6e973", "#ffffff"], ["62.png", "#f6e973", "#ffffff"], ["63.png", "#f6e973", "#f8e1c7"], ["64.png", "#fcc4dd", "#f8e1c7"],
    ["65.png", "#ef6856", "#f8e1c7"], ["66.png", "#2d432a", "#f8e1c7"], ["67.png", "#a7ee91", "#f8e1c7"], ["68.png", "#a7ee91", "#f8e1c7"],
    ["69.png", "#a7ee91", "#d0e9e7"], ["70.png", "#8bcac9", "#d0e9e7"], ["71.png", "#e290a0", "#ffffff"], ["72.png", "#3dc6b1", "#ffffff"],
    ["73.png", "#8cc4dc", "#ffffff"], ["74.png", "#8cc4dc", "#ffffff"], ["75.png", "#199f6e", "#ffffff"], ["76.png", "#938bed", "#ffffff"],
    ["77.png", "#dc9752", "#ffffff"], ["78.png", "#8793a4", "#ffffff"], ["79.png", "#8793a4", "#ffffff"], ["80.png", "#9e9f65", "#ffffff"],
    ["81.png", "#9e9f65", "#ffffff"], ["82.png", "#77777a", "#ffffff"], ["83.png", "#f98f33", "#ffffff"], ["84.png", "#56dfb8", "#56dfb8"],
    ["85.png", "#315d9a", "#ffffff"], ["86.png", "#315d9a", "#ffffff"], ["87.png", "#e3a829", "#ffffff"], ["88.png", "#e3a829", "#ffffff"],
    ["89.png", "#acfd32", "#ffffff"], ["90.png", "#acfd32", "#ffffff"], ["91.png", "#e0b829", "#ffffff"]
];

module.exports.run = async (bot, message, args) =>
{
    if(message.author.id !== "266677298051153920")
    {
        return await message.reply(" :no_entry_sign: you're not the Dev pleb :facepalm:  :no_entry_sign:");
    }

    let i;
    for(i = 0; i < StatsCollection.length; i++)
    {
        await DatabaseImport.CookieMonsta_AddBannerToTable(StatsCollection[i][0], StatsCollection[i][1], StatsCollection[i][2]);
    }

    message.channel.send(`:recycle: ⇒ I have updated the database with **${i}** banners :frame_photo: my lord! :ok_hand:`);
};

module.exports.help =
{
    name: "refreshbanner"
};