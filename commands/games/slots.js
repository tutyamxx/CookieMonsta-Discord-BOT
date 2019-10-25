const Discord = require("discord.js");
const CookieMonsta = require("../../CookieMonstaBOT.js");
const GetDatabaseData = require("../../functions/getuserdata.js");
const EmojiConvert = require("../../functions/emojiconvert.js");

let UserAlreadySlotting = {};
let iSlotTimeInterval = {};
let UserCoinsWon = {};

module.exports.run = async (bot, message, args) =>
{
    let GuildGetID = message.guild.id;
    const user = message.author;

    if(CookieMonsta.UserDatabaseData.cookies < 10)
    {
        return await message.reply(":no_entry: you don't have enough cookies :cookie: to do that! :no_entry:");
    }

    if(UserAlreadySlotting[user.id] === true)
    {
        return await message.reply(":no_entry: you are already using the **Rolling Slots** machine! :no_entry:");
    }

    let SlotNumbers = new Array(3);                 // 0 - 1 - 2
    let SlotColumn, b, c;

    for(SlotColumn = 0; SlotColumn < SlotNumbers.length; SlotColumn++)
    {
        SlotNumbers[SlotColumn] = new Array(9);     // 0 - 1 - 2
                                                    // 3 - 4 - 5
                                                    // 6 - 7 - 8
    }


    const szSlotsMessage = await message.channel.send(":slot_machine:  **Rolling Slots!** :slot_machine:");
    let szSlotsMessageEdit = ":slot_machine:  **Rolling Slots!** :slot_machine:\n\n";

    let i = 0;

    UserAlreadySlotting[user.id] = true;

    for(b = 0; b < SlotNumbers.length; b++)
    {
        for(c = 0; c < 9; c++)
        {
            SlotNumbers[b][c] = Math.floor((Math.random() * 9));
        }
    }

    iSlotTimeInterval[user.id] = setInterval (async function ()
    {
        i += 1;

        if(i === 1)
        {
            szSlotsMessageEdit += "	  [" + EmojiConvert.SlotNumberToIcon(SlotNumbers[0][0]) + "][" + EmojiConvert.SlotNumberToIcon(SlotNumbers[1][1]) + "[" + EmojiConvert.SlotNumberToIcon(SlotNumbers[2][2]) + "]\n";
        }

        else if(i === 2)
        {
            szSlotsMessageEdit += "	  [" + EmojiConvert.SlotNumberToIcon(SlotNumbers[0][3]) + "][" + EmojiConvert.SlotNumberToIcon(SlotNumbers[1][4]) + "[" + EmojiConvert.SlotNumberToIcon(SlotNumbers[2][5]) + "]\n";
        }

        else if(i === 3)
        {
            szSlotsMessageEdit += "	  [" + EmojiConvert.SlotNumberToIcon(SlotNumbers[0][6]) + "][" + EmojiConvert.SlotNumberToIcon(SlotNumbers[1][7]) + "[" + EmojiConvert.SlotNumberToIcon(SlotNumbers[2][8]) + "]\n";
        }

        else if(i === 4)
        {
            bot.clearInterval(iSlotTimeInterval[user.id]);
            UserAlreadySlotting[user.id] = false;

            // | X    |
            // |  X   |
            // |   X  |
            if(SlotNumbers[0][0] === SlotNumbers[1][4] && SlotNumbers[1][4] === SlotNumbers[0][0]
            && SlotNumbers[1][4] === SlotNumbers[2][8] && SlotNumbers[2][8] === SlotNumbers[1][4]
            && SlotNumbers[2][8] === SlotNumbers[0][0] && SlotNumbers[0][0] === SlotNumbers[2][8])
            {
                UserCoinsWon[user.id] = parseInt(CookieMonsta.UserDatabaseData.cookies * 0.10);

                szSlotsMessageEdit += "\n" + user + ", you won. Cookies awarded: **" + UserCoinsWon[user.id] + "** :cookie:";
                await GetDatabaseData.CookiesUpdate(GuildGetID, user.id, UserCoinsWon[user.id]);
            }

            // |    X|
            // |  X  |
            // |X    |
            else if( SlotNumbers[2][2] === SlotNumbers[1][4] && SlotNumbers[1][4] === SlotNumbers[2][2]
            && SlotNumbers[1][4] === SlotNumbers[0][6] && SlotNumbers[0][6] === SlotNumbers[1][4]
            && SlotNumbers[0][6] === SlotNumbers[2][2] && SlotNumbers[2][2] === SlotNumbers[0][6])
            {
                UserCoinsWon[user.id] = parseInt(CookieMonsta.UserDatabaseData.cookies * 0.10);

                szSlotsMessageEdit += "\n" + user + ", you won. Cookies awarded: **" + UserCoinsWon[user.id] + "** :cookie:";
                await GetDatabaseData.CookiesUpdate(GuildGetID, user.id, UserCoinsWon[user.id]);
            }

            // |X  X  X|
            // |       |
            // |       |
            else if(SlotNumbers[0][0] === SlotNumbers[1][1] && SlotNumbers[1][1] === SlotNumbers[0][0]
            && SlotNumbers[1][1] === SlotNumbers[2][2] && SlotNumbers[2][2] === SlotNumbers[1][1]
            && SlotNumbers[2][2] === SlotNumbers[0][0] && SlotNumbers[0][0] === SlotNumbers[2][2])
            {
                UserCoinsWon[user.id] = parseInt(CookieMonsta.UserDatabaseData.cookies * 0.25);

                szSlotsMessageEdit += "\n" + user + ", you won. Cookies awarded: **" + UserCoinsWon[user.id] + "** :cookie:";
                await GetDatabaseData.CookiesUpdate(GuildGetID, user.id, UserCoinsWon[user.id]);
            }

            // |     |
            // |X X X|
            // |     |
            else if(SlotNumbers[0][3] === SlotNumbers[1][4] && SlotNumbers[1][4] === SlotNumbers[0][3]
            && SlotNumbers[1][4] === SlotNumbers[2][5] && SlotNumbers[2][5] === SlotNumbers[1][4]
            && SlotNumbers[2][5] === SlotNumbers[0][3] && SlotNumbers[0][3] === SlotNumbers[2][5])
            {
                UserCoinsWon[user.id] = parseInt(CookieMonsta.UserDatabaseData.cookies * 0.25);

                szSlotsMessageEdit += "\n" + user + ", you won. Cookies awarded: **" + UserCoinsWon[user.id] + "** :cookie:";
                await GetDatabaseData.CookiesUpdate(GuildGetID, user.id, UserCoinsWon[user.id]);
            }

            // |     |
            // |     |
            // |X X X|
            else if(SlotNumbers[0][6] === SlotNumbers[1][7] && SlotNumbers[1][7] === SlotNumbers[0][6]
            && SlotNumbers[1][7] === SlotNumbers[2][8] && SlotNumbers[2][8] === SlotNumbers[1][7]
            && SlotNumbers[2][8] === SlotNumbers[0][6] && SlotNumbers[0][6] === SlotNumbers[2][8])
            {
                UserCoinsWon[user.id] = parseInt(CookieMonsta.UserDatabaseData.cookies * 0.25);

                szSlotsMessageEdit += "\n" + user + ", you won. Cookies awarded: **" + UserCoinsWon[user.id] + "** :cookie:";
                await GetDatabaseData.CookiesUpdate(GuildGetID, user.id, UserCoinsWon[user.id]);
            }

            // |X  X |
            // |  X  |
            // |     |
            else if(SlotNumbers[0][0] === SlotNumbers[2][2] && SlotNumbers[2][2] === SlotNumbers[0][0]
            && SlotNumbers[0][0] === SlotNumbers[1][4] && SlotNumbers[1][4] === SlotNumbers[0][0]
            && SlotNumbers[1][4] === SlotNumbers[2][2] && SlotNumbers[2][2] === SlotNumbers[1][4])
            {
                UserCoinsWon[user.id] = parseInt(CookieMonsta.UserDatabaseData.cookies * 0.08);

                szSlotsMessageEdit += "\n" + user + ", you won. Cookies awarded: **" + UserCoinsWon[user.id] + "** :cookie:";
                await GetDatabaseData.CookiesUpdate(GuildGetID, user.id, UserCoinsWon[user.id]);
            }

            // |   |
            // | X |
            // |X X|
            else if(SlotNumbers[1][4] === SlotNumbers[0][6] && SlotNumbers[0][6] === SlotNumbers[1][4]
            && SlotNumbers[1][4] === SlotNumbers[2][8] && SlotNumbers[2][8] === SlotNumbers[1][4]
            && SlotNumbers[0][6] === SlotNumbers[2][8] && SlotNumbers[2][8] === SlotNumbers[0][6])
            {
                UserCoinsWon[user.id] = parseInt(CookieMonsta.UserDatabaseData.cookies * 0.08);

                szSlotsMessageEdit += "\n" + user + ", you won. Cookies awarded: **" + UserCoinsWon[user.id] + "** :cookie:";
                await GetDatabaseData.CookiesUpdate(GuildGetID, user.id, UserCoinsWon[user.id]);
            }

            // |   X  |
            // | X  X |
            // |      |
            else if(SlotNumbers[0][3] === SlotNumbers[1][1] && SlotNumbers[1][1] === SlotNumbers[0][3]
            && SlotNumbers[1][1] === SlotNumbers[2][5] && SlotNumbers[2][5] === SlotNumbers[1][1]
            && SlotNumbers[0][3] === SlotNumbers[2][5] && SlotNumbers[2][5] === SlotNumbers[0][3])
            {
                UserCoinsWon[user.id] = parseInt(CookieMonsta.UserDatabaseData.cookies * 0.08);

                szSlotsMessageEdit += "\n" + user + ", you won. Cookies awarded: **" + UserCoinsWon[user.id] + "** :cookie:";
                await GetDatabaseData.CookiesUpdate(GuildGetID, user.id, UserCoinsWon[user.id]);
            }

            // |     |
            // |X  X |
            // | X   |
            else if(SlotNumbers[0][3] === SlotNumbers[1][7] && SlotNumbers[1][7] === SlotNumbers[0][3]
            && SlotNumbers[1][7] === SlotNumbers[2][5] && SlotNumbers[2][5] === SlotNumbers[1][7]
            && SlotNumbers[0][3] === SlotNumbers[2][5] && SlotNumbers[2][5] === SlotNumbers[0][3])
            {
                UserCoinsWon[user.id] = parseInt(CookieMonsta.UserDatabaseData.cookies * 0.08);

                szSlotsMessageEdit += "\n" + user + ", you won. Cookies awarded: **" + UserCoinsWon[user.id] + "** :cookie:";
                await GetDatabaseData.CookiesUpdate(GuildGetID, user.id, UserCoinsWon[user.id]);
            }

            // |X X X|
            // |X X X|
            // |     |
            else if(SlotNumbers[0][0] === SlotNumbers[1][1] && SlotNumbers[1][1] === SlotNumbers[0][0]
            && SlotNumbers[1][1] === SlotNumbers[2][2] && SlotNumbers[2][2] === SlotNumbers[1][1]
            && SlotNumbers[0][3] === SlotNumbers[1][4] && SlotNumbers[1][4] === SlotNumbers[0][3]
            && SlotNumbers[1][4] === SlotNumbers[2][5] && SlotNumbers[2][5] === SlotNumbers[1][4]
            && SlotNumbers[0][0] === SlotNumbers[0][3] && SlotNumbers[0][3] === SlotNumbers[0][0]
            && SlotNumbers[1][1] === SlotNumbers[1][4] && SlotNumbers[1][4] === SlotNumbers[1][1]
            && SlotNumbers[2][2] === SlotNumbers[2][5] && SlotNumbers[2][5] === SlotNumbers[2][2]
            && SlotNumbers[0][0] === SlotNumbers[1][4] && SlotNumbers[1][4] === SlotNumbers[0][0]
            && SlotNumbers[0][3] === SlotNumbers[1][1] && SlotNumbers[1][1] === SlotNumbers[0][3]
            && SlotNumbers[1][4] === SlotNumbers[2][2] && SlotNumbers[2][2] === SlotNumbers[1][4]
            && SlotNumbers[1][1] === SlotNumbers[2][5] && SlotNumbers[2][5] === SlotNumbers[1][1])
            {
                UserCoinsWon[user.id] = parseInt(CookieMonsta.UserDatabaseData.cookies * 1.50);

                szSlotsMessageEdit += "\n" + user + ", you won. Cookies awarded: **" + UserCoinsWon[user.id] + "** :cookie:";
                await GetDatabaseData.CookiesUpdate(GuildGetID, user.id, UserCoinsWon[user.id]);
            }

            // |     |
            // |X X X|
            // |X X X|
            else if(SlotNumbers[0][3] === SlotNumbers[1][4] && SlotNumbers[1][4] === SlotNumbers[0][3]
            && SlotNumbers[1][4] === SlotNumbers[2][5] && SlotNumbers[2][5] === SlotNumbers[1][4]
            && SlotNumbers[0][6] === SlotNumbers[1][7] && SlotNumbers[1][7] === SlotNumbers[0][6]
            && SlotNumbers[1][7] === SlotNumbers[2][8] && SlotNumbers[2][8] === SlotNumbers[1][7]
            && SlotNumbers[0][3] === SlotNumbers[0][6] && SlotNumbers[0][6] === SlotNumbers[0][3]
            && SlotNumbers[1][4] === SlotNumbers[1][7] && SlotNumbers[1][7] === SlotNumbers[1][4]
            && SlotNumbers[2][5] === SlotNumbers[2][8] && SlotNumbers[2][8] === SlotNumbers[2][5]
            && SlotNumbers[0][3] === SlotNumbers[1][7] && SlotNumbers[1][7] === SlotNumbers[0][3]
            && SlotNumbers[1][4] === SlotNumbers[0][6] && SlotNumbers[0][6] === SlotNumbers[1][4]
            && SlotNumbers[2][5] === SlotNumbers[1][7] && SlotNumbers[1][7] === SlotNumbers[2][5]
            && SlotNumbers[1][4] === SlotNumbers[2][8] && SlotNumbers[2][8] === SlotNumbers[1][4])
            {
                UserCoinsWon[user.id] = parseInt(CookieMonsta.UserDatabaseData.cookies * 1.50);

                szSlotsMessageEdit += "\n" + user + ", you won. Cookies awarded: **" + UserCoinsWon[user.id] + "** :cookie:";
                await GetDatabaseData.CookiesUpdate(GuildGetID, user.id, UserCoinsWon[user.id]);
            }

            // |X X X|
            // |X X X|
            // |X X X|
            else if(SlotNumbers[0][0] === SlotNumbers[1][1] && SlotNumbers[1][1] === SlotNumbers[0][0]
            && SlotNumbers[1][1] === SlotNumbers[2][2] && SlotNumbers[2][2] === SlotNumbers[1][1]
            && SlotNumbers[0][0] === SlotNumbers[0][3] && SlotNumbers[0][3] === SlotNumbers[0][0]
            && SlotNumbers[1][1] === SlotNumbers[1][4] && SlotNumbers[1][4] === SlotNumbers[1][1]
            && SlotNumbers[2][2] === SlotNumbers[2][5] && SlotNumbers[2][5] === SlotNumbers[2][2]
            && SlotNumbers[0][3] === SlotNumbers[0][6] && SlotNumbers[0][6] === SlotNumbers[0][3]
            && SlotNumbers[1][4] === SlotNumbers[1][7] && SlotNumbers[1][7] === SlotNumbers[1][4]
            && SlotNumbers[2][5] === SlotNumbers[2][8] && SlotNumbers[2][8] === SlotNumbers[2][5]
            && SlotNumbers[0][3] === SlotNumbers[1][4] && SlotNumbers[1][4] === SlotNumbers[0][3]
            && SlotNumbers[1][4] === SlotNumbers[2][5] && SlotNumbers[2][5] === SlotNumbers[1][4]
            && SlotNumbers[0][6] === SlotNumbers[1][7] && SlotNumbers[1][7] === SlotNumbers[0][6]
            && SlotNumbers[1][7] === SlotNumbers[2][8] && SlotNumbers[2][8] === SlotNumbers[1][7]
            && SlotNumbers[0][0] === SlotNumbers[1][4] && SlotNumbers[1][4] === SlotNumbers[0][0]
            && SlotNumbers[0][3] === SlotNumbers[1][1] && SlotNumbers[1][1] === SlotNumbers[0][3]
            && SlotNumbers[1][4] === SlotNumbers[2][2] && SlotNumbers[2][2] === SlotNumbers[1][4]
            && SlotNumbers[1][1] === SlotNumbers[2][5] && SlotNumbers[2][5] === SlotNumbers[1][1]
            && SlotNumbers[0][6] === SlotNumbers[1][4] && SlotNumbers[1][4] === SlotNumbers[0][6]
            && SlotNumbers[0][3] === SlotNumbers[1][7] && SlotNumbers[1][7] === SlotNumbers[0][3]
            && SlotNumbers[1][7] === SlotNumbers[2][5] && SlotNumbers[2][5] === SlotNumbers[1][7]
            && SlotNumbers[1][4] === SlotNumbers[2][8] && SlotNumbers[2][8] === SlotNumbers[1][4])
            {
                UserCoinsWon[user.id] = parseInt(CookieMonsta.UserDatabaseData.cookies * 5.00);

                szSlotsMessageEdit += "\n" + user + ", you :money_with_wings: :money_with_wings: : **WON THE JACKPOT!** :money_with_wings: :money_with_wings:\n**CONGRATULATIONS !** Cookies awarded: **" + UserCoinsWon[user.id] + "** :cookie:";
                await GetDatabaseData.CookiesUpdate(GuildGetID, user.id, UserCoinsWon[user.id]);
            }

            else
            {
                await GetDatabaseData.CookiesRemove(GuildGetID, user.id, 10); // losing 10 every play
                szSlotsMessageEdit += "\n" + user + ", you lose. **0** cookies :cookie: awarded. Here's a :potato: for you!";
            }
        }

        await szSlotsMessage.edit(szSlotsMessageEdit);

    }, 1000);
};

module.exports.help =
{
    name: "slots"
};