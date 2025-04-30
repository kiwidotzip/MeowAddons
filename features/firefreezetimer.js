import { FeatManager, hud } from "./helperfunction"

const firefreeze = FeatManager.createFeature("firefreezenotif", "catacombs")
const GUI = hud.createTextHud("Fire Freeze timer", 400, 400, "&cFire Freeze: &b4.2s")
let timer = 0

firefreeze
    .register("serverChat", () => {
        timer = Date.now() + 5000
        firefreeze.update()
        setTimeout(() => World.playSound("random.burp", 2, 1), 1000)
        setTimeout(() => {
            World.playSound("random.anvil_land", 2, 1)
            timer = 0
            firefreeze.update()
        }, 5000)
    }, "[BOSS] The Professor: Oh? You found my Guardians' one weakness?")
    .register("ServerChat", () => {
        timer = 0
        firefreeze.update()
    }, "[BOSS] The Professor: What?! My Guardian power is unbeatable!")
    .registersub("renderOverlay", () => {
        if (hud.isOpen()) return
        Renderer.translate(GUI.getX(), GUI.getY())
        Renderer.scale(GUI.getScale())
        Renderer.drawString(`&cFire Freeze&f: &b${(Math.max(0, timer - Date.now()) / 1000).toFixed(2)}s`, 0, 0)
        Renderer.finishDraw()
    }, () => timer)
    .onRegister(() => (timer = 0, firefreeze.update()))
    .onUnregister(() => (timer = 0, firefreeze.update()))

GUI.onDraw(() => {
    Renderer.translate(GUI.getX(), GUI.getY())
    Renderer.scale(GUI.getScale())
    Renderer.drawString(`&cFire Freeze&f: &b4.2s`, 0, 0)
    Renderer.finishDraw()
})