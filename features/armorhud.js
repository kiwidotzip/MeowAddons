import { FeatManager, hud } from "./helperfunction"

let armor = []
const ArmorHUD = FeatManager.createFeature("armorhud")
const GUI = hud.createHud("Armor HUD ", 400, 40, 17.5, 72)
const slotColor = Renderer.color(100, 100, 100, 150)
const slotborder = Renderer.color(100, 100, 100, 150)
const defaultArmor = [
    "minecraft:skull",
    "minecraft:leather_chestplate",
    "minecraft:leather_leggings",
    "minecraft:leather_boots"
].map(id => new Item(id))

const drawBG = (x, y) => {
    Renderer.drawRect(slotColor, x, y, 16, 16)
    Renderer.drawLine(slotborder, x, y, x + 16, y, 1)
    Renderer.drawLine(slotborder, x, y, x, y + 16, 1)
    Renderer.drawLine(slotborder, x + 16, y, x + 16, y + 16, 1)
    Renderer.drawLine(slotborder, x, y + 16, x + 16, y + 16, 1)
}

const renderItems = (items) => {
    items.forEach((item, index) => {
        Renderer.retainTransforms(true)
        Renderer.translate(GUI.getX(), GUI.getY())
        Renderer.scale(GUI.getScale())
        drawBG(0, index * 18)
        item?.draw(0, index * 18)
        Renderer.retainTransforms(false)
        Renderer.finishDraw()
    })
}

ArmorHUD
    .register("tick", () => armor = Player.getInventory().getItems()?.filter((item, index) => index > 35).reverse() || [])
    .register("renderOverlay", () => !hud.isOpen() && renderItems(armor))

GUI.onDraw(() => renderItems(defaultArmor))