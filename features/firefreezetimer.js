import { FeatManager, hud } from "./helperfunction"

const firefreeze = FeatManager.createFeature("firefreezenotif", "catacombs")
const GUI = hud.createTextHud("Fire Freeze timer", 400, 400, "&cFire Freeze: &b4.2s")
let timer = 0
let serverticks = 0

firefreeze
    .register("serverChat", () => {
        timer = 100
        firefreeze.update()
        setTimeout(() => World.playSound("random.burp", 2, 1), 1000)
        setTimeout(() => {
            World.playSound("random.anvil_land", 2, 1)
            timer = serverticks = 0
            firefreeze.update()
        }, 6500)
    }, "[BOSS] The Professor: Oh? You found my Guardians' one weakness?")
    .registersub("renderOverlay", () => {
        if (hud.isOpen()) return
        Renderer.translate(GUI.getX(), GUI.getY())
        Renderer.scale(GUI.getScale())
        Renderer.drawString(`&cFire Freeze&f: &b${(Math.max(0, timer - serverticks) / 20).toFixed(2)}s`, 0, 0)
    }, () => timer)
    .registersub("servertick", () => serverticks++, () => timer)
    .onRegister(() => (timer = serverticks = 0, firefreeze.update()))
    .onUnregister(() => (timer = serverticks = 0, firefreeze.update()))

GUI.onDraw(() => {
    Renderer.translate(GUI.getX(), GUI.getY())
    Renderer.scale(GUI.getScale())
    Renderer.drawString(`&cFire Freeze&f: &b4.2s`, 0, 0)
    Renderer.finishDraw()
})