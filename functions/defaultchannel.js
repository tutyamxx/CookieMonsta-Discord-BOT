const Long = require("long");

function getDefaultChannel(guild)
{
    if(guild.channels.has(guild.id))
    {
        return guild.channels.get(guild.id)
    }

    const generalChannel = guild.channels.find(channel => channel.name === "general"
    || channel.name === "welcome"
    || channel.name === "bot-hell"
    || channel.name === "who_is_using_this");

    if(generalChannel)
    {
        return generalChannel;
    }

    let TextChannels = guild.channels.filter(c => c.type === "text" && c.permissionsFor(guild.client.user).has(['SEND_MESSAGES', 'VIEW_CHANNEL']));

    if(TextChannels.size < 1)
    {
        return undefined;
    }

    return TextChannels.sort((a, b) => a.position - b.position || Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber()).first();
};

module.exports.getDefaultChannel = getDefaultChannel;