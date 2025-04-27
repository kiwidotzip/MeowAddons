import { scheduleTask } from "../../tska/shared/ServerTick";
import { FeatManager, hud } from "./helperfunction";

const WorldAgeDisplay = FeatManager.createFeature("worldagedisplay")
const WorldAgeMsg = FeatManager.createFeature("worldagemsg")
const GUI = hud.createTextHud("World age display", 200, 400, "&cDay: &b26.2")

WorldAgeDisplay
    .register("renderOverlay", () => {
        Renderer.translate(GUI.getX(), GUI.getY())
        Renderer.scale(GUI.getScale())
        Renderer.drawString(`&bDay&f: &b${(World.getTime() / 24000).toFixed(1)}`, 0, 0)
        Renderer.finishDraw()
    })
WorldAgeMsg
    .register("worldLoad", () => {
        scheduleTask(() => ChatLib.chat(`&e[MeowAddons] &fThe world is &b${(World.getTime() / 24000).toFixed(1)}&f days old.`), 20)
    })
GUI.onDraw(() => {
    Renderer.translate(GUI.getX(), GUI.getY())
    Renderer.scale(GUI.getScale())
    Renderer.drawString(`&bDay&f: &b26.2`, 0, 0)
    Renderer.finishDraw()
})