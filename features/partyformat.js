import Config from "../config";
import { FeatManager } from "./helperfunction";
const partyformat = FeatManager.createFeature("partyformat");

partyformat.register("chat", (hrank, user, msg, evn) => {
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
    ChatLib.chat(`&9P &8> ${rankColor}${user}&f: ${msg}`)
}, /Party > (\[.+?\])? ?(.+?): (.+)/)
