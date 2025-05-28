import { FeatManager } from "./helperfunction"
import { Render2D } from "../../tska/rendering/Render2D"
import Dungeon from "../../tska/skyblock/dungeon/Dungeon"
import Config from "../config"

const Crypt = FeatManager.createFeature("cryptnotif", "catacombs")
let sent = false
let started = false
let delay = Config().cryptremtime

Crypt
    .register("serverChat", () => (started = true, Crypt.update()), /\[NPC\] Mort: Good luck\./)
    .registersub("stepDelay", () => {
        if (Dungeon.getCrypts() >= 5 || sent || Dungeon.inBoss()) return
        sent = true
        Config().cryptchatmsg && ChatLib.command(`pc ${Dungeon.getCrypts()}/5 crypts done yet.`)
        Config().crypttitle && Render2D.showTitle(`&b${Dungeon.getCrypts()}&7/&b5 &ccrypts`, null, 2500)
    }, () => started, 60 * delay)
    .onRegister(() => (sent = started = false, Crypt.update()))

Config().getConfig().registerListener("cryptremtime", (oldv, newv) => delay = newv)