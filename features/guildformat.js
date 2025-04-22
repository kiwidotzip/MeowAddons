import Config from "../config";
import { FeatManager } from "./helperfunction";
const guildformat = FeatManager.createFeature("guildformat");

guildformat.register("chat", (hypixelrank, username, guildrank, message, event) => {
    if (!Config().formatchatmessage) return;
    cancel(event);
    const rankColors = {
        "Admin": "&c",
        "Mod": "&2",
        "Helper": "&9",
        "GM": "&2",
        "MVP++": `&${Config().mvppluspluscolor || "6"}`,
        "MVP+": `&${Config().mvppluscolor || "b"}`,
        "MVP": `&${Config().mvpcolor || "b"}`,
        "VIP+": `&${Config().vippluscolor || "a"}`,
        "VIP": `&${Config().vipcolor || "a"}`,
    };
    //extract rank name from hypixelrank or return null if it doesnt exist
    const rankNameMatch = hypixelrank ? hypixelrank.match(/\[(.+?)\]/) : null;
    const rankName = rankNameMatch ? rankNameMatch[1] : null;
    //get the color of the rank from rankColors or default to gray
    const rankColor = rankName && rankColors[rankName] ? rankColors[rankName] : "&7";
    //format guild rank (if exists)
    const formattedGuildRank = guildrank ? `&8${guildrank}` : "";

    const sanitizedUsername = ChatLib.replaceFormatting(username || "").replace(/[^a-zA-Z0-9_]/g, "");
    const sanitizedMessage = ChatLib.replaceFormatting(message || "");

    ChatLib.chat(`&2G &8> ${formattedGuildRank} ${rankColor}${sanitizedUsername}&f: ${sanitizedMessage}`);
}, /Guild > ?(\[.+?\])? ?([a-zA-Z0-9_]+) ?(\[.+?\])?: (.+)/)
