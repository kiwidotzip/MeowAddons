import { FeatManager } from "./helperfunction"
import { Render2D } from "../../tska/rendering/Render2D"
import Dungeon from "../../tska/skyblock/dungeon/Dungeon"
import Config from "../config"

const Crypt = FeatManager.createFeature("cryptnotif", "catacombs")
let sent = false

Crypt
    .register("stepDelay", () => {
        if (Dungeon.getCrypts() >= 5 || sent || Dungeon.inBoss()) return
        sent = true
        if (Config().cryptchatmsg) ChatLib.command(`pc ${getCrypts()}/5 crypts done yet.`)
        if (Config().crypttitle) Render2D.showTitle(`${getCrypts()}/5 crypts`, null, 2500)
    }, 60 * Config().cryptremtime)
    .onRegister(() => sent = false)