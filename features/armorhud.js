import { FeatManager, hud } from "./helperfunction"
import Config from "../config"

let armor = []
const ArmorHUD = FeatManager.createFeature("armorhud")
const GUI = hud.createHud("Armor HUD ", 400, 40, 17.5, 72)
const slotborder = Renderer.color(100, 100, 100, 150)
const defaultArmor = [
    "minecraft:leather_helmet",
    "minecraft:leather_chestplate",
    "minecraft:leather_leggings",
    "minecraft:leather_boots"
].map(id => new Item(id))

const drawBG = (x, y) => {
    Renderer.drawLine(slotborder, x, y, x + 16, y, 1)
    Renderer.drawLine(slotborder, x, y, x, y + 16, 1)
    Renderer.drawLine(slotborder, x + 16, y, x + 16, y + 16, 1)
    Renderer.drawLine(slotborder, x, y + 16, x + 16, y + 16, 1)
}

const renderItems = (items, vert = true) => {
    items.forEach((item, index) => {
        Renderer.retainTransforms(true)
        Renderer.translate(GUI.getX(), GUI.getY())
        Renderer.scale(GUI.getScale())
        if (Config().drawarmorhudbox) drawBG(vert ? 0 : index * 18, vert ? index * 18 : 0)
        item?.draw(vert ? 0 : index * 18, vert ? index * 18 : 0)
        Renderer.retainTransforms(false)
        Renderer.finishDraw()
    })
}

ArmorHUD
    .register("tick", () => armor = Player.getInventory().getItems()?.filter((item, index) => index > 35).reverse() || [])
    .register("renderOverlay", () => !hud.isOpen() && renderItems(armor, Config().armorhudvert))

GUI.onDraw(() => renderItems(defaultArmor, Config().armorhudvert))