const Discord = require("discord.js");

module.exports.run = (bot, message, args) =>
{
    const user = message.author;

    let FormatMessage = ":cookie:  ***OMM NOM, NOM NOM***   **-- Cookie Monsta**  :cookie:\n\n\n \
    :small_blue_diamond:   You will automatically receive **150** cookies ``(One time only)``!\n \
    :small_blue_diamond:   You will pay **150** cookies every time you buy a **color**\n \
    :small_blue_diamond:   If you are **100%** HOT, you will receive **15** cookies\n \
    :small_blue_diamond:   If you get the same number as shown while **rolling**, you will receive **40** cookies, otherwise you will lose **10**\n \
    :small_blue_diamond:   You will receive **20** cookies for winning a **Death Battle**, and lose **10** cookies if enemy wins\n \
    :small_blue_diamond:   If you lose in **Russian Roulette**, you will lose **10** cookies and get ``KICKED`` out from the server, but if you win you will get **5** cookies and sometimes I will give you **1** extra cookie for free\n \
    :small_blue_diamond:   **Slots** - Paycheck is calculated based on 3 of the same type Emoji's. You will lose **10** cookies for each play. If you win, for a ***diagonal***  line you get **10%** multiplier for cookies, for a ***horizontal***  line you get **25%** multiplier, for a ***V shape***  line you get **8%** multiplier, for a **double horizontal**  line you get **150%** multiplier and for a **full screen** ***(JACKPOT)***  you get a **500%** multiplier!\n \
    :small_blue_diamond:   To play a **sound** on the voice channel it costs you **300** cookies.\n \
    :small_blue_diamond:   By winning a Shell Game, you get a random prize between **1** and **10** cookies. Good luck!\n \
    :small_blue_diamond:   You will lose **20** cookies for casting, win random prize for regular fish and **200** cookies for catching a whale!\n \
    :small_blue_diamond:   Spinning a fidget spinner for more than **40** seconds, will get you **400** cookies\n \
    :small_blue_diamond:   Setting a custom profile card costs **25000** cookies.";

    const DiscordRichEmbed = new Discord.RichEmbed()
    .setAuthor("Cookie Monsta | Information and Prices", (bot.user.avatarURL === null) ? bot.user.defaultAvatarURL : bot.user.avatarURL)
    .setColor(2003199)
    .setDescription(FormatMessage)
    .setThumbnail("https://i.imgur.com/KaqBWI9.png")
    .setFooter("Requested by: @" + user.username, (user.avatarURL === null) ? user.defaultAvatarURL : user.avatarURL)

    message.channel.send({ embed: DiscordRichEmbed }).then(async () => await message.react("🍪"));
};

module.exports.help =
{
    name: "cookieinfo"
};