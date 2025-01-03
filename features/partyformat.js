import Config from "../config";


register("chat", (hypixelrank, username, message, event) => {
    if (!Config().partyformat && !Config().togglecustomchatrankcolor) return;
    cancel(event);
    const rankColors = {
        "Admin": "&c",
        "Mod": "&2",
        "Helper": "&9",
        "GM": "&2",
        "MVP++": `&${Config().mvppluspluscolor}`,
        "MVP+": `&${Config().mvppluscolor}`,
        "MVP": `&${Config().mvpcolor}`,
        "VIP+": `&${Config().vippluscolor}`,
        "VIP": `&${Config().vipcolor}`,
    };
    const rankNameMatch = hypixelrank ? hypixelrank.match(/\[(.+?)\]/) : null;
    const rankName = rankNameMatch ? rankNameMatch[1] : null;
    const rankColor = rankName && rankColors[rankName] ? rankColors[rankName] : "&7";
    ChatLib.chat(`&9P &8> ${rankColor}${username}&f: ${message}`);
}).setCriteria(/Party > (\[.+?\])? ?(.+?): (.+)/);
