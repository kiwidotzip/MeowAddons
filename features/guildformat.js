import Config from "../config";
import { registerWhen } from "./utils/renderutils";

registerWhen(register("chat", (hypixelrank, username, guildrank, message, event) => {
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
}).setCriteria(/Guild > ?(\[.+?\])? ?([a-zA-Z0-9_]+) ?(\[.+?\])?: (.+)/), () => Config().guildformat && Config().formatchatmessage)
