import { FeatManager, hud } from "./helperfunction";

const GUI = hud.createTextHud("Livid Vuln. Timer", 120, 10, "Livid: 19.5s");
const LividVuln = FeatManager.createFeature("lividvul", "catacombs")
let lividstart = 0
let bossticks = 390

LividVuln
    .register("servertick", () => lividstart !== 0 && bossticks--)
    .register("worldLoad", () => lividstart = 0, bossticks = 390) 
    .register("chat", () => lividstart = Date.now(), /^\[BOSS\] Livid: Welcome, you arrive right on time\. I am Livid, the Master of Shadows\.$/)
    .register("renderOverlay", () => {
        Renderer.retainTransforms(true);
        Renderer.translate(GUI.getX(), GUI.getY());
        Renderer.scale(GUI.getScale());
        if (lividstart !== 0) {
            const lividvuln = (bossticks / 20).toFixed(1);
            if (parseFloat(lividvuln) > 0.0) {
                Renderer.drawStringWithShadow(`&cLivid&f: &b${lividvuln}&fs`, 0, 0);
            } else {
                Renderer.drawStringWithShadow(`&c&lKILL`, 0, 0);
            }
        }
    })
register("command", () => hud.open()).setName(`meowdevlivid`);
GUI.onDraw(() => {
    Renderer.translate(GUI.getX(), GUI.getY());
    Renderer.scale(GUI.getScale());
    Renderer.drawStringWithShadow("&cLivid&f: &b19.5s" , 0, 0);
    Renderer.finishDraw();
})