import Config from "../config"
import { Render2D } from "../../tska/rendering/Render2D"
import { FeatManager } from "./helperfunction"
import { Data } from "./utils/data"

const Blood = FeatManager.createFeature("blood", "catacombs")
let bloodopen = false
let starttime = 0
let blooddone = false

Blood
    .registersub("serverChat", () => {
        bloodopen = true
        starttime = Date.now()
        blooddone = false
        Blood.update()
    }, () => !bloodopen, /\[BOSS\] The Watcher: .+/)

    .register("serverChat", () => {
        const diftime = ((Date.now() - starttime) / 1000).toFixed(1)
        Render2D.showTitle(`&c&l!`, `&cWatcher reached dialogue!`, 2500)
        ChatLib.chat(`&e[MeowAddons] &rWatcher took &b${diftime}s&r to reach dialogue!`)
        Config().sendbloodparty && ChatLib.command(`pc MeowAddons » Watcher took ${diftime}s to reach dialogue!`)
    }, "[BOSS] The Watcher: Let's see how you can handle this.")

    .register("serverChat", () => {
        const spawnalltime = ((Date.now() - starttime) / 1000).toFixed(1)
        Render2D.showTitle(`&c!`, `&cWatcher finished spawning mobs!`, 2500)
        ChatLib.chat(`&e[MeowAddons] &rWatcher took &b${spawnalltime}s&r to spawn all mobs!`)
        Config().sendbloodparty && ChatLib.command(`pc MeowAddons » Watcher took ${spawnalltime}s to spawn all mobs!`)
    }, "[BOSS] The Watcher: That will be enough for now.")

    .registersub("serverChat", () => {
        blooddone = true
        const camptime = ((Date.now() - starttime) / 1000)
        camptime < Data.bloodCampPB && (Data.bloodCampPB = camptime)
        ChatLib.chat(`&e[MeowAddons] &fBlood camp took &b${camptime.toFixed(1)}s &7| &fPB: &b${Data.bloodCampPB.toFixed(1)}s`)
        Config().sendbloodparty && ChatLib.command(`pc MeowAddons » Blood camp took ${camptime.toFixed(1)}s!`)
    }, () => starttime, "[BOSS] The Watcher: You have proven yourself. You may pass.")

    .onRegister(() => (bloodopen = blooddone = false, starttime = 0, Blood.update()))
    .onUnregister(() => (bloodopen = blooddone = false, starttime = 0, Blood.update()))