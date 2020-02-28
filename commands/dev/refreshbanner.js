const CookieMonsta = require("../../CookieMonstaBOT.js");
const DatabaseImport = require("../../database/database.js");

// --| Card description | PNG file | username color | stats color & cookies color
const StatsCollection =
[
    ["Clouds", "01.png", "#9e8d69", "#DCDCDC"], ["Grayed Out Mirror", "02.png", "#ADD8E6", "#F5F5DC"], ["Lens Flare", "03.png", "#32CD32", "#FFFAFA"], ["Rust And Paper", "04.png", "#32CD32", "#FFFAFA"],
    ["Dry Dirty Paper", "05.png", "#c9c3ba", "#ffffff"], ["Black Graffiti", "06.png", "#1E90FF", "#FFFAFA"], ["Cracked Ground", "07.png", "#ceae85", "#ffffff"], ["Orange Waves", "08.png", "#FFA500", "#FF7F50"],
    ["Abstract", "09.png", "#ADD8E6", "#FFFFFF"], ["Warning Black", "10.png", "#FFFF00", "#FFFFFF"], ["Golden Plate", "11.png", "#FFFF00", "#fae37a"], ["Iron Man", "12.png", "#b29358", "#E0FFFF"],
    ["Blue Abstract", "13.png", "#2468c1", "#f2fcfd"], ["Red Car", "14.png", "#d23c17", "#ffffff"], ["Pinky Unicorn", "15.png", "#fefee5", "#ffffff"], ["Soldiers", "16.png", "#FF69B4", "#f6d8e6"],
    ["Chinatown", "17.png", "#00FF00", "#7FFFD4"], ["One Way Sign", "18.png", "#548ef9", "#ffffff"], ["Horse Rider", "19.png", "#d36075", "#FFFFFF"], ["Concert", "20.png", "#ffffff", "#fffcf1"],
    ["Dank Spongebob", "21.png", "#e3cc7a", "#ffffff"], ["Microphone Check", "22.png", "#ffffff", "#ffffff"], ["Party", "23.png", "#ffffff", "#ffffff"], ["PS4 Controller", "24.png", "#ffffff", "#ffffff"],
    ["Pie With Garlic", "25.png", "#eb9d66", "#ffffff"], ["Sci-Fi Gaming", "26.png", "#eb9d66", "#ffffff"], ["Rainbow", "27.png", "#5686a6", "#ffffff"], ["Books", "28.png", "#ffffff", "#ffffff"],
    ["Dark Eye Woman", "29.png", "#ffffff", "#ffffff"], ["Ancient", "30.png", "#bac7e6", "#ffffff"], ["Retro Sunrise", "31.png", "#c41fca", "#2387a9"], ["Darth Vader Sword", "32.png", "#eca8aa", "#65a3b6"],
    ["Fap Fap Fap", "33.png", "#ffffff", "#feecbe"], ["Awesome", "34.png", "#78123d", "#feecbe"], ["Doge Wow", "35.png", "#ffffff", "#feecbe"], ["Dota2 Newspaper", "36.png", "#ffffff", "#c3c4bf"],
    ["90's Party", "37.png", "#eee95c", "#ffffff"], ["Girl", "38.png", "#fca554", "#ffffff"], ["Construction", "39.png", "#ffffff", "#ffffff"], ["Biohazard Sign", "40.png", "#d2bb0e", "#ffffff"],
    ["Digital", "41.png", "#d2bb0e", "#ffffff"], ["Masked Woman", "42.png", "#24d6cd", "#ffffff"], ["Joker", "43.png", "#9b93b8", "#ffffff"], ["WASD Keys", "44.png", "#ea0e20", "#ffffff"],
    ["Pink Hearts", "45.png", "#ec82ab", "#fcecf2"], ["Cookie Monster", "46.png", "#ffffff", "#fcecf2"], ["Binary Rain", "47.png", "#334b72", "#d4e2fe"], ["Retro Flower", "48.png", "#f3d193", "#d4e2fe"],
    ["Spiderman Jumping", "49.png", "#7b446b", "#d4e2fe"], ["Venom Letters", "50.png", "#e83336", "#d4e2fe"], ["Dead In Space", "51.png", "#e83336", "#d4e2fe"], ["Abstract Triangle", "52.png", "#f5571e", "#d4e2fe"],
    ["Abstract Tea", "53.png", "#f5571e", "#d4e2fe"], ["Colorful Galaxy", "54.png", "#819962", "#d4e2fe"], ["Road", "55.png", "#e9ab2e", "#ffffff"], ["Spiderman: Into The Spider-Verse", "56.png", "#177099", "#ffffff"],
    ["Pink Haired Woman", "57.png", "#ec7099", "#ffffff"], ["Retro City", "58.png", "#ec7099", "#ffffff"], ["Drugs", "59.png", "#ffffff", "#ffffff"], ["Weed", "60.png", "#ffffff", "#ffffff"],
    ["Orange Naruto", "61.png", "#f6e973", "#ffffff"], ["Red Naruto", "62.png", "#f6e973", "#ffffff"], ["Super Sayian Goku", "63.png", "#f6e973", "#f8e1c7"], ["Goku Super Kaioken", "64.png", "#fcc4dd", "#f8e1c7"],
    ["Spider-Man Head", "65.png", "#ef6856", "#f8e1c7"], ["Joker Arkham City", "66.png", "#2d432a", "#f8e1c7"], ["Suicide Squad", "67.png", "#a7ee91", "#f8e1c7"], ["Harley Quinn", "68.png", "#a7ee91", "#f8e1c7"],
    ["Harley Quinn Bat", "69.png", "#a7ee91", "#d0e9e7"], ["Terror On The Rooftops", "70.png", "#8bcac9", "#d0e9e7"], ["Chinatown Rainy", "71.png", "#e290a0", "#ffffff"], ["Chinatown Soldier", "72.png", "#3dc6b1", "#ffffff"],
    ["Shark Mouse", "73.png", "#8cc4dc", "#ffffff"], ["Servers", "74.png", "#8cc4dc", "#ffffff"], ["Green Circuits", "75.png", "#199f6e", "#ffffff"], ["Board Circuits", "76.png", "#938bed", "#ffffff"],
    ["Abstract Rounded", "77.png", "#dc9752", "#ffffff"], ["Sci-Fi Landscape", "78.png", "#8793a4", "#ffffff"], ["Sci-Fi Orange Moon", "79.png", "#8793a4", "#ffffff"], ["Hacker Terminal", "80.png", "#9e9f65", "#ffffff"],
    ["Tuty", "81.png", "#9e9f65", "#ffffff"], ["Chucky", "82.png", "#77777a", "#ffffff"], ["Bitcoin Orange", "83.png", "#f98f33", "#ffffff"], ["Bitcoin Green", "84.png", "#56dfb8", "#56dfb8"],
    ["Purge Mask", "85.png", "#315d9a", "#ffffff"], ["Purge Mask 2", "86.png", "#315d9a", "#ffffff"], ["Bitcoin Circuits", "87.png", "#e3a829", "#ffffff"], ["Cryptocurrency", "88.png", "#e3a829", "#ffffff"],
    ["DedSec Skeleton Hand", "89.png", "#acfd32", "#ffffff"], ["DedSec", "90.png", "#acfd32", "#ffffff"], ["Golden Board", "91.png", "#e0b829", "#ffffff"],
    ["Suicide Squad Joker", "92.png", "#47fb2f", "#ffffff"], ["Mastered UI Goku", "93.png", "#7989d3", "#ffffff"], ["SSG And SSGB Vegeta", "94.png", "#27e2ef", "#ffffff"], ["SSGB Vegeta Final Flash", "95.png", "#27e2ef", "#ffffff"],
    ["SSGB Vegeta", "96.png", "#27e2ef", "#ffffff"], ["Vegeta The Prince", "97.png", "#27e2ef", "#ffffff"], ["SSJ4 Goku", "98.png", "#fade81", "#ffffff"],  ["SSGB Vegito", "99.png", "#57e8e6", "#ffffff"],
    ["Super Sayian God Vegeta", "100.png", "#efed7e", "#ffffff"], ["Flying Super Man", "101.png", "#20bede", "#ffffff"], ["Super Sayian Broly", "102.png", "#effd51", "#27f446"], ["SSJ4 Gogeta And SSGB Vegito", "103.png", "#20bfd8", "#ffffff"],
    ["UI Goku", "104.png", "#ffffff", "#ffffff"], ["SSJ4 Gogeta", "105.png", "#f79b81", "#ffffff"], ["ACES", "106.png", "#f5ead6", "#ffffff"], ["SS4 Gogeta Side", "107.png", "#f5ead6", "#ffffff"],
    ["Goku Multiple Forms", "108.png", "#fbd630", "#ffffff"], ["Gambit", "109.png", "#e64a8e", "#ffffff"], ["NieR Automata", "110.png", "#7f7189", "#ffffff"], ["Shenron", "111.png", "#99ab65", "#ffffff"],
    ["SSGB Gogeta", "112.png", "#28e0fc", "#ffffff"], ["Super Sayian 2 Broly", "113.png", "#6dc42a", "#ffffff"], ["Whis", "114.png", "#efaefb", "#ffffff"], ["Gordon Freeman", "115.png", "#e49733", "#ffffff"],
    ["Romanian Flag", "116.png", "#ffffff", "#ffffff"], ["Matrix", "117.png", "#ffffff", "#ffffff"], ["Woman Art", "118.png", "#ffffff", "#ffffff"], ["Blue Screen Of Death", "119.png", "#ffffff", "#ffffff"],
    ["Romanian Traditional Food", "120.png", "#e5e5e2", "#e5e5e2"], ["Fries", "121.png", "#fae880", "#e5e5e2"]
];

module.exports.run = async (bot, message, args) =>
{
    if(message.author.id !== "266677298051153920")
    {
        return message.reply(" :no_entry_sign: you're not the Dev pleb :facepalm:  :no_entry_sign:");
    }

    let i;
    for(i = 0; i < StatsCollection.length; i++)
    {
        await DatabaseImport.CookieMonsta_AddBannerToTable(StatsCollection[i][0], StatsCollection[i][1], StatsCollection[i][2], StatsCollection[i][3]);
    }

    message.channel.send(`:recycle: ⇒ I have updated the database with **${i}** banners :frame_photo: my lord! :ok_hand:`);
};

module.exports.help =
{
    name: "refreshbanner"
};