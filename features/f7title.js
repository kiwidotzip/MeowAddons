import { FeatManager, hud } from "./helperfunction";

const F7Crush = FeatManager.createFeature("f7title-crush", "catacombs")
const F7Necron = FeatManager.createFeature("f7title-necron", "catacombs")
const F7DeadTitles = FeatManager.createFeature("f7title-dead", "catacombs")
const F7P3Timer = FeatManager.createFeature("f7p3timer", "catacombs")

const GUI = hud.createTextHud("Time until P3 starts (F7)", 240, 20, "&cP3 timer: &b4.8s")
const BossBar = Java.type("net.minecraft.entity.boss.BossStatus")

let [NecronDead, GoldorDead, MaxorDead] = [false, false, false]
let [StormDeath, GoldorDeath] = [0, 0]
let P3timer = false
let P3time = 104

F7Crush
    .register("chat", (msg) => {
        if (msg == "[BOSS] Maxor: YOU TRICKED ME!" || msg == "[BOSS] Maxor: THAT BEAM! IT HURTS! IT HURTS!!") 
            Client.showTitle(`&5Maxor Crushed`, "", 1, 40, 1)
        if (msg == "[BOSS] Storm: Oof" || msg == "[BOSS] Storm: Ouch, that hurt!") 
            Client.showTitle(`&5Storm Crushed`, "", 1, 40, 1)
    }, "${msg}")
F7Necron
    .register("chat", () => Client.showTitle(`&cNecron damageable`, "", 1, 40, 1), "[BOSS] Necron: ARGH!")
F7DeadTitles
    .register("servertick", () => {
        if (BossBar.field_82827_c?.removeFormatting()?.includes("Necron") && BossBar.field_82828_a * 100 == 0.33333334140479565 
            && !NecronDead && Date.now - GoldorDeath > 10000)
            NecronDead = true, 
            Client.showTitle(`&cNecron Dead`, "", 1, 40, 1)
        if (BossBar.field_82827_c?.removeFormatting()?.includes("Goldor") && BossBar.field_82828_a * 100 == 0.33333334140479565 
            && !GoldorDead && Date.now - StormDeath > 10000) 
            GoldorDead = true,
            GoldorDeath = Date.now(),
            Client.showTitle(`&cGoldor Dead`, "", 1, 40, 1)
        if (BossBar.field_82827_c?.removeFormatting()?.includes("Maxor") && BossBar.field_82828_a * 100 == 0.33333334140479565 && !MaxorDead) 
            MaxorDead = true,
            Client.showTitle(`&cMaxor Dead`, "", 1, 40, 1)
    })
    .register("chat", () => {
        Client.showTitle(`&cStorm Dead`, "", 1, 40, 1)
        StormDeath = Date.now()
    }, "[BOSS] Storm: I should have known that I stood no chance.")
    .register("worldLoad", () => {
        NecronDead = GoldorDead = MaxorDead = false
        StormDeath = GoldorDeath = 0
    })
F7P3Timer
    .register("chat", () => {
        P3timer = true
        F7P3Timer.update()
    }, "[BOSS] Storm: I should have known that I stood no chance.")
    .register("servertick", () => {
        if (P3time && P3timer) P3time--
        if (P3time <= 1) P3timer = false, F7P3Timer.update(), P3time = 104
    })
    .registersub("renderOverlay", () => {
        Renderer.translate(GUI.getX(), GUI.getY())
        Renderer.scale(GUI.getScale())
        Renderer.drawString(`&cP3 Timer: &b${P3time / 20}s`, 0, 0, false)
        Renderer.finishDraw()
    }, () => P3timer)

GUI.onDraw(() => {
    Renderer.translate(GUI.getX(), GUI.getY())
    Renderer.scale(GUI.getScale())
    Renderer.drawString(`&cP3 Timer: &b4.8s`, 0, 0, false)
    Renderer.finishDraw()
})