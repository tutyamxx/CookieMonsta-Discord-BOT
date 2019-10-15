
function SlotNumberToIcon(iNumber)
{
    let ReturnSlotIcon;

    switch(iNumber)
    {
        case 0:
            ReturnSlotIcon = ":cherries:";
            break;

        case 1:
            ReturnSlotIcon = ":peach:";
            break;

        case 2:
            ReturnSlotIcon = ":moneybag:";
            break;

        case 3:
            ReturnSlotIcon = ":sunflower:";
            break;

        case 4:
            ReturnSlotIcon = ":lemon:";
            break;

        case 5:
            ReturnSlotIcon = ":strawberry:";
            break;

        case 6:
            ReturnSlotIcon = ":rabbit:";
            break;

        case 7:
            ReturnSlotIcon = ":alien:";
            break;

        case 8:
            ReturnSlotIcon = ":grapes:";
            break;
    }

    return ReturnSlotIcon;
};

function NumberToDiscordEmoji(iNumber)
{
    let ReturnEmojiNumber;

    switch(iNumber)
    {
        case 1:
            ReturnEmojiNumber = ":one:";
            break;

        case 2:
            ReturnEmojiNumber = ":two:";
            break;

        case 3:
            ReturnEmojiNumber = ":three:";
            break;

        case 4:
            ReturnEmojiNumber = ":four:";
            break;

        case 5:
            ReturnEmojiNumber = ":five:";
            break;

        case 6:
            ReturnEmojiNumber = ":six:";
            break;
    }

    return ReturnEmojiNumber;
};

module.exports.SlotNumberToIcon = SlotNumberToIcon;
module.exports.NumberToDiscordEmoji = NumberToDiscordEmoji;
