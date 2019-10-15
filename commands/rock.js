
let UserAlreadyRps = {};
let iRockPaperScissorsTimer = {};

module.exports.run = async (bot, message, args) =>
{
    const user = message.author;

    if(UserAlreadyRps[user.id] === true)
    {
        return await message.reply(":no_entry: You are already playing **Rock, Paper, Scissors**, wait until is finished! :no_entry:");
    }

    UserAlreadyRps[user.id] = true;

    let szRPSMessage = await message.channel.send("***Rock, Paper, Scissors!***");
    let szRPSEdit = "***Rock, Paper, Scissors!***\n\n";

    iRockPaperScissorsTimer[user.id] = setInterval (async function ()
    {
        switch(Math.floor(( Math.random() * 3 ) + 1))
        {
            case 1:
                szRPSEdit += "\nRock! :fist:";
                break;

            case 2:
                szRPSEdit += "\nPaper! :pencil:";
                break;

            case 3:
                szRPSEdit += "\nScissors! :scissors:";
                break;
        }

        UserAlreadyRps[user.id] = false;
        bot.clearInterval(iRockPaperScissorsTimer[user.id]);

        await szRPSMessage.edit(szRPSEdit);

    }, 900);
};

module.exports.help =
{
    name: "rock"
};
