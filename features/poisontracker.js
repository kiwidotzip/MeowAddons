import { FeatManager, hud } from "./helperfunction";

const Tracker = FeatManager.createFeature("arrowpoistracker")
const GUI = hud.createHud("Arrow poison tracker", 200, 20, 60, 40)
const twilightICON = new Item("dye").setDamage(5)
const toxicICON = new Item("dye").setDamage(10)

let twilight = 0
let toxic = 0

Tracker
    .register("tick", () => {
        twilight = 0;
        toxic = 0;
        Player.getInventory().getItems().forEach(item => {
            if (item?.getName()?.removeFormatting()?.includes("Twilight Arrow Poison")) twilight += item.getStackSize();
            if (item?.getName()?.removeFormatting()?.includes("Toxic Arrow Poison")) toxic += item.getStackSize();
        })
    })
    .register("renderOverlay", () => {
        if (hud.isOpen()) return;
        Renderer.retainTransforms(true)
        Renderer.translate(GUI.getX(), GUI.getY())
        Renderer.scale(GUI.getScale())
        twilightICON.draw(0, 0)
        toxicICON.draw(0, 12)
        Renderer.drawString(`&c${twilight}`, 18, -6.5, false)
        Renderer.drawString(`&c${toxic}`, 18, 5.5, false)
        Renderer.retainTransforms(false)
        Renderer.finishDraw()
    })

GUI.onDraw(() => {
    Renderer.retainTransforms(true)
    Renderer.translate(GUI.getX(), GUI.getY())
    Renderer.scale(GUI.getScale())
    twilightICON.draw(0, 0)
    toxicICON.draw(0, 12)
    Renderer.drawString(`&c1356`, 18, -6.5, false)
    Renderer.drawString(`&c134`, 18, 5.5, false)
    Renderer.retainTransforms(false)
    Renderer.finishDraw()
})