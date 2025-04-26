import { FeatManager, hud } from "./helperfunction";

const GUI = hud.createTextHud("Livid Vuln. Timer", 120, 10, "Livid: 19.5s");
const LividVuln = FeatManager.createFeature("lividvuln", "catacombs")
let lividstart = 0
let bossticks = 390

LividVuln
    .register("servertick", () => lividstart !== 0 && bossticks--)
    .register("chat", () => { lividstart = Date.now(); LividVuln.update(); }, /^\[BOSS\] Livid: Welcome, you've arrived right on time\. I am Livid, the Master of Shadows\.$/)
    .registersub("renderOverlay", () => {
        Renderer.retainTransforms(true);
        Renderer.translate(GUI.getX(), GUI.getY());
        Renderer.scale(GUI.getScale());
        const secs = bossticks / 20;
        const label = secs > 0 ? `${secs.toFixed(1)}s` : "Kill!!!";
        Renderer.drawString(`&cLivid&f: &b${label}`, 0, 0);
        Renderer.retainTransforms(false);
        Renderer.finishDraw();
    }, () => lividstart !== 0)
register("worldLoad", () => { lividstart = 0; bossticks = 390; LividVuln.update(); }) 
GUI.onDraw(() => {
    Renderer.translate(GUI.getX(), GUI.getY());
    Renderer.scale(GUI.getScale());
    Renderer.drawStringWithShadow("&cLivid&f: &b19.5s" , 0, 0);
    Renderer.finishDraw();
})