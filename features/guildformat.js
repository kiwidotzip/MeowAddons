import Settings from "../config";

register("chat", (hypixelrank, username, guildrank, message, event) => {
    if (!Settings.guildformat) return;
    cancel(event);
    const formattedGuildRank = guildrank ? `&8${guildrank} ` : "";
    ChatLib.chat(`&2G &8> ${formattedGuildRank}&a${username}&f: ${message}`);
}).setCriteria(/Guild > (\[.+\])? ?(.+?) ?(\[.+?\])?: (.+)/);
