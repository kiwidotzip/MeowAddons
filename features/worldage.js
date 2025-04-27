import { FeatManager, hud } from "./helperfunction";

const WorldAgeDisplay = FeatManager.createFeature("worldagedisplay")
const WorldAgeMsg = FeatManager.createFeature("worldagemsg")
const GUI = hud.createTextHud("World age display", 200, 400, "&cDay: &b26.2")
let sent = false

WorldAgeDisplay
    .register("renderOverlay", () => {
        if (hud.isOpen) return;
        Renderer.translate(GUI.getX(), GUI.getY())
        Renderer.scale(GUI.getScale())
        Renderer.drawString(`&cDay&f: &b${(World.getTime() / 24000).toFixed(1)}`, 0, 0)
        Renderer.finishDraw()
    })
WorldAgeMsg
    .register("worldLoad", () => {
        Client.scheduleTask(1, () => {
            ChatLib.chat(`&e[MeowAddons] &fThe world is &b${(World.getTime() / 24000).toFixed(1)}&f days old.`)
            sent = true
        })
    })
    .register("worldUnload", () => sent = false)
GUI.onDraw(() => {
    Renderer.translate(GUI.getX(), GUI.getY())
    Renderer.scale(GUI.getScale())
    Renderer.drawString(`&cDay&f: &b26.2`, 0, 0)
    Renderer.finishDraw()
})