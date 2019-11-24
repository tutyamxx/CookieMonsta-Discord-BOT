const DatabaseImport = require("../database/database.js");
const ShellGame = require("../commands/games/shellgame.js");

module.exports = async (bot, reaction, user) =>
{
    if(ShellGame.ShellGameID[user.id] === user.id)
    {
        if(ShellGame.bPlayingShell[user.id] === false)
        {
            return;
        }

        let GetGuildID = await reaction.message.guild.id.toString();
        let RandomShellPrize = Math.floor(( Math.random() * 10 ) + 1);

        await DatabaseImport.CookieMonsta_CheckCreateUser(GetGuildID, user.id);

        const iUserCookies = await DatabaseImport.CookieMonsta_GetUserCookies(GetGuildID, user.id);

        if(await reaction.emoji.name === "\u0031\u20E3")
        {
            if(1 === ShellGame.UserShuffleShells[user.id])
            {
                await reaction.remove(user);

                await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, user.id, iUserCookies + RandomShellPrize);
                ShellGame.szShellGameDescription[user.id] = "**Shell Game**\n\n\n\n:confetti_ball:  Congratulations " + user + ", you won **" + RandomShellPrize + "** cookies :cookie: this time!\n\n\n:egg:	  :chestnut:     :chestnut:";
            }

            else
            {
                await reaction.remove(user);
                ShellGame.szShellGameDescription[user.id] = "**Shell Game**\n\n\n\nSorry " + user + ", you lost! Good luck next time!\n\n\n:x:	  :chestnut:     :chestnut:";
            }
        }

        else if(await reaction.emoji.name === "\u0032\u20E3")
        {
            if(2 === ShellGame.UserShuffleShells[user.id])
            {
                await reaction.remove(user);

                await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, user.id, iUserCookies + RandomShellPrize);
                ShellGame.szShellGameDescription[user.id] = "**Shell Game**\n\n\n\n:confetti_ball:  Congratulations " + user + ", you won **" + RandomShellPrize + "** cookies :cookie: this time!\n\n\n:chestnut:	  :egg:     :chestnut:";
            }

            else
            {
                await reaction.remove(user);
                ShellGame.szShellGameDescription[user.id] = "**Shell Game**\n\n\n\nSorry " + user + ", you lost! Good luck next time!\n\n\n:chestnut:	  :x:     :chestnut:";
            }
        }

        else if(await reaction.emoji.name === "\u0033\u20E3")
        {
            if(3 === ShellGame.UserShuffleShells[user.id])
            {
                await reaction.remove(user);

                await DatabaseImport.CookieMonsta_SetUserCookies(GetGuildID, user.id, iUserCookies + RandomShellPrize);
                ShellGame.szShellGameDescription[user.id] = "**Shell Game**\n\n\n\n:confetti_ball:  Congratulations " + user + ", you won **" + RandomShellPrize + "** cookies :cookie: this time!\n\n\n:chestnut:	  :chestnut:     :egg:";
            }

            else
            {
                await reaction.remove(user);
                ShellGame.szShellGameDescription[user.id] = "**Shell Game**\n\n\n\nSorry " + user + ", you lost! Good luck next time!\n\n\n:chestnut:	  :chestnut:     :x:";
            }
        }

        else if(await reaction.emoji.name === "❎")
        {
            await reaction.remove(user);
            ShellGame.szShellGameDescription[user.id] = "**Shell Game**\n\n\n\n\n:x:   ***GAME OVER***    :x:";
        }

        ShellGame.bPlayingShell[user.id] = false;
    }
};
