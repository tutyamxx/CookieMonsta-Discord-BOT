const Long = require("long");

async function getDefaultChannel(guild)
{
    if(await guild.channels.has(guild.id))
    {
        return await guild.channels.get(guild.id);
    }

    const generalChannel = await guild.channels.find(channel => channel.name === "general"
    || channel.name === "welcome"
    || channel.name === "bot-hell"
    || channel.name === "who_is_using_this"
    || channel.name === "testing-1"
    || channel.name === "testing-2"
    || channel.name === "commands");

    if(generalChannel)
    {
        return generalChannel;
    }

    let TextChannels = await guild.channels.filter(c => c.type === "text" && c.permissionsFor(guild.client.user).has(['SEND_MESSAGES', 'VIEW_CHANNEL']));

    if(TextChannels.size < 1)
    {
        return undefined;
    }

    return await TextChannels.sort((a, b) => a.position - b.position || Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber()).first();
};

module.exports.getDefaultChannel = getDefaultChannel;