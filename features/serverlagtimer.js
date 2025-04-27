import { FeatManager } from "./helperfunction";
import { scheduleTask } from "../../tska/shared/ServerTick";

let clientticks = 0
let serverticks = 0
let count = false
let sent = false
const ServerLag = FeatManager.createFeature("serverlagtimer", "catacombs")

ServerLag
    .register("tick", () => count && clientticks++)
    .register("servertick", () => count && serverticks++)
    .register("chat", () => scheduleTask(() => count = true, 20), /Starting in 1 second\./)
    .register("chat", () => {
        if (sent) return
        sent = true
        Client.scheduleTask(1, () => 
            ChatLib.chat(`&e[MeowAddons] &fServer lagged for &c${((clientticks - serverticks) / 20).toFixed(2)}s &7| &c${clientticks - serverticks} ticks&f.`)
        )
    }, /^\s*☠ Defeated (?:.+) in 0?(?:[\dhms ]+?)\s*(?:\(NEW RECORD!\))?$/i)
    .onRegister(() => (clientticks = serverticks = 0, count = sent = false))
    .onUnregister(() => (clientticks = serverticks = 0, count = sent = false))