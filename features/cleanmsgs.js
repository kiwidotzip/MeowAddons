import { FeatManager } from "./helperfunction"
import Config from "../config"

const GuildMsg = FeatManager.createFeature("guildformat")
const PartyMsg = FeatManager.createFeature("partyformat")
const getRankColor = (rank) => {
    const colors = {
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
    return colors[rank?.match(/\[(.+?)\]/)?.[1]] || "&7"
}

GuildMsg
    .register("chat", (hrank, user, grank, msg, evn) => {
        cancel(evn)
        ChatLib.chat(`&2G &8> ${grank && "&8" + grank + " "}${getRankColor(hrank)}${user}&f: ${msg}`)
    }, /Guild > ?(\[.+?\])? ?([a-zA-Z0-9_]+) ?(\[.+?\])?: (.+)/)

PartyMsg
    .register("chat", (hrank, user, msg, evn) => {
        cancel(evn)
        ChatLib.chat(`&9P &8> ${getRankColor(hrank)}${user}&f: ${msg}`)
    }, /Party > (\[.+?\])? ?(.+?): (.+)/)