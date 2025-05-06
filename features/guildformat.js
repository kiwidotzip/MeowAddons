import Config from "../config";
import { FeatManager } from "./helperfunction";
const guildformat = FeatManager.createFeature("guildformat");

guildformat.register("chat", (hrank, user, grank, msg, evn) => {
    const rankColors = {
        "Admin": "&c",
        "Mod": "&2",
        "Helper": "&9",
        "GM": "&2",
        "MVP++": `&${Config().mvppluspluscolor || "6"}`,
        "MVP+": `&${Config().mvppluscolor || "b"}`,
        "MVP": `&${Config().mvpcolor || "b"}`,
        "VIP+": `&${Config().vippluscolor || "a"}`,
        "VIP": `&${Config().vipcolor || "a"}`
    }
    const rankColor = rankColors[hrank?.match(/\[(.+?)\]/)?.[1]] || "&7"
    cancel(evn)
    ChatLib.chat(`&2G &8> ${grank && "&8" + grank + " "}${rankColor}${user}&f: ${msg}`)
}, /Guild > ?(\[.+?\])? ?([a-zA-Z0-9_]+) ?(\[.+?\])?: (.+)/)