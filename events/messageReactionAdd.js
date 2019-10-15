
const GetDatabaseData = require("../functions/getuserdata.js");
const ShellGame = require("../commands/shellgame.js");

module.exports = async (bot, reaction, user) =>
{
	if(ShellGame.ShellGameID[user.id] === user.id)
	{
		if(ShellGame.bPlayingShell[user.id] === false)
		{
			return;
		}

		let GetGuildID = reaction.message.guild.id.toString();
		let RandomShellPrize = Math.floor(( Math.random() * 10 ) + 1);

		if(reaction.emoji.name === "\u0031\u20E3")
		{
			if(1 === ShellGame.UserShuffleShells[user.id])
			{
				reaction.remove(user);

				await GetDatabaseData.CookiesUpdate(GetGuildID, user.id, RandomShellPrize);
				ShellGame.szShellGameDescription[user.id] = "**Shell Game**\n\n\n\n:confetti_ball:  Congratulations " + user + ", you won **" + RandomShellPrize + "** cookies :cookie: this time!\n\n\n:egg:	  :chestnut:     :chestnut:";
			}

			else
			{
				reaction.remove(user);
				ShellGame.szShellGameDescription[user.id] = "**Shell Game**\n\n\n\nSorry " + user + ", you lost! Good luck next time!\n\n\n:x:	  :chestnut:     :chestnut:";
			}
		}

		else if(reaction.emoji.name === "\u0032\u20E3")
		{
			if(2 === ShellGame.UserShuffleShells[user.id])
			{
				reaction.remove(user);

				await GetDatabaseData.CookiesUpdate(GetGuildID, user.id, RandomShellPrize);
				ShellGame.szShellGameDescription[user.id] = "**Shell Game**\n\n\n\n:confetti_ball:  Congratulations " + user + ", you won **" + RandomShellPrize + "** cookies :cookie: this time!\n\n\n:chestnut:	  :egg:     :chestnut:";
			}

			else
			{
				reaction.remove(user);
				ShellGame.szShellGameDescription[user.id] = "**Shell Game**\n\n\n\nSorry " + user + ", you lost! Good luck next time!\n\n\n:chestnut:	  :x:     :chestnut:";
			}
		}

		else if(reaction.emoji.name === "\u0033\u20E3")
		{
			if(3 === ShellGame.UserShuffleShells[user.id])
			{
				reaction.remove(user);

				await GetDatabaseData.CookiesUpdate(GetGuildID, user.id, RandomShellPrize);
				ShellGame.szShellGameDescription[user.id] = "**Shell Game**\n\n\n\n:confetti_ball:  Congratulations " + user + ", you won **" + RandomShellPrize + "** cookies :cookie: this time!\n\n\n:chestnut:	  :chestnut:     :egg:";
			}

			else
			{
				reaction.remove(user);
				ShellGame.szShellGameDescription[user.id] = "**Shell Game**\n\n\n\nSorry " + user + ", you lost! Good luck next time!\n\n\n:chestnut:	  :chestnut:     :x:";
			}
		}

		else if(reaction.emoji.name === "❎")
		{
			reaction.remove(user);
			ShellGame.szShellGameDescription[user.id] = "**Shell Game**\n\n\n\n\n:x:   ***GAME OVER***    :x:";
		}

		ShellGame.bPlayingShell[user.id] = false;
	}
};
