import { FeatManager } from "./helperfunction"
import Dungeon from "../../tska/skyblock/dungeon/Dungeon"
import Config from "../config"

const Crypt = FeatManager.createFeature("cryptnotif", "catacombs")
let sent = false

Crypt
    .register("stepDelay", () => {
        if (Dungeon.getCrypts() >= 5 || sent || Dungeon.inBoss()) return
        sent = true
        if (Config().cryptchatmsg) ChatLib.command(`pc ${getCrypts()}/5 crypts done yet.`)
        if (Config().crypttitle) Client.showTitle(`${getCrypts()}/5 crypts`, "", 1, 20, 1)
    }, 60 * Config().cryptremtime)
    .onRegister(() => sent = false)