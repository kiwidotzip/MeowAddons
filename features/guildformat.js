import Settings from "../config";

register("chat", (hypixelrank, username, guildrank, message, event) => {
    if (!Settings.guildformat) return;
    cancel(event);
    const rankColors = {
        "Admin": "&c",
        "Mod": "&2",
        "Helper": "&9",
        "GM": "&2",
        "MVP++": `&${Settings.mvppluspluscolor}`,
        "MVP+": `&${Settings.mvppluscolor}`,
        "MVP": `&${Settings.mvpcolor}`,
        "VIP+": `&${Settings.vippluscolor}`,
        "VIP": `&${Settings.vipcolor}`,
    };
    const rankNameMatch = hypixelrank ? hypixelrank.match(/\[(.+?)\]/) : null;
    const rankName = rankNameMatch ? rankNameMatch[1] : null;
    const rankColor = rankName && rankColors[rankName] ? rankColors[rankName] : "&7";
    const formattedGuildRank = guildrank ? `&8${guildrank}` : "";
    ChatLib.chat(`&2G &8> ${formattedGuildRank} ${rankColor}${username}&f: ${message}`);
}).setCriteria(/Guild > ?(\[.+?\])? ?(.+?) ?(\[.+?\])?: (.+)/);
