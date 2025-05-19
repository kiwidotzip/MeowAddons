import { Render3D } from "../../tska/rendering/Render3D";
import { FeatManager, hud } from "./helperfunction";
import { scheduleTask } from "../../tska/shared/ServerTick";

const slayerbossdisplay = FeatManager.createFeature("slayerbossdisplay")
const slayerkilltimer = FeatManager.createFeature("slayerkilltimer")
const slayerbosshighlight = FeatManager.createFeature("slayerbosshighlight")

const GUI = hud.createTextHud("Slayer Display", 120, 10, "a\n☠ &bVoidgloom Seraph IV")
const BOSS_HP_REGEX = /☠ (.+?)\s*(?:ᛤ)?(?:\s*✯\s*)?([\d\.]+[MK]?\s*(?:Hits|❤))(?:\s*✯)?/i

let bossID = null 
let hpEntity = null 
let timerEntity = null
let bossName = null
let hp = null
let timestarted = 0
let serverticks = 0
let isFighting = false
let spawnticks = 0
let startspawntime = 0

const resetBossTracker = () => [timestarted, serverticks, bossID, hpEntity, timerEntity, isFighting] = [0, 0, null, null, null, false]

slayerbossdisplay
    .register("stepFps", () => {
        World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityArmorStand")).forEach(entity => {
            if (entity.entity.func_145782_y() !== bossID + 1) return
            const name = entity.entity.func_70005_c_()?.removeFormatting()
            const match = name.match(BOSS_HP_REGEX)
            if (match) ([bossName, hp] = [match[1], match[2]], slayerbossdisplay.update())
        })
    }, 10)
    .register("ma:entityJoin", (ent, id, evn) => {
        scheduleTask(() => {
            const name = ent.func_70005_c_()?.removeFormatting()
            if (name.includes("Spawned by") && name.split("by: ")[1] === Player.getName()) {
                hpEntity = World.getWorld().func_73045_a(bossID + 1)
                timerEntity = World.getWorld().func_73045_a(bossID + 2)
            }
        }, 2)
    })
    .registersub("renderOverlay", () => {
        const hpOffset = Renderer.getStringWidth(`&c☠ &b${bossName}`) - Renderer.getStringWidth(hp);
        const timerText = timerEntity?.func_70005_c_()?.removeFormatting();
        Renderer.translate(GUI.getX(), GUI.getY());
        Renderer.scale(GUI.getScale());
        Renderer.retainTransforms(true);
        timerText && Renderer.drawStringWithShadow(`&c${timerText}`, 0, 0);
        Renderer.drawStringWithShadow(`&c${hp}`, hpOffset, 0);
        Renderer.drawStringWithShadow(`&c☠ &b${bossName}`, 0, 10);
        Renderer.retainTransforms(false);
    }, () => hpEntity)

slayerkilltimer
    .register("ma:entityJoin", (ent, id, evn) => {
        scheduleTask(() => {
            const name = ent.func_70005_c_()?.removeFormatting()
            if (name?.includes("Spawned by") && name?.split("by: ")[1] === Player.getName() && !isFighting) {
                bossID = id - 3
                timestarted = Date.now()
                isFighting = true
                slayerkilltimer.update()
            }
        }, 2)
    })
    .register("entityDeath", (ent) => {
        if (ent.entity.func_145782_y() !== bossID) return
        const timeTaken = Date.now() - timestarted
        const msg = new Message(new TextComponent(`&e[MeowAddons] &fYou killed your boss in &b${(timeTaken / 1000).toFixed(2)}s&7 | &b${serverticks / 20}s.`)
                                .setHoverValue(`&c${serverticks} ticks &f| &c${timeTaken} ms &7- May not be 100% accurate`))
        ChatLib.chat(msg)
        resetBossTracker()
        slayerbossdisplay.update()
        slayerkilltimer.update()
    })
    .register("chat", () => {
        const timeTaken = Date.now() - timestarted
        const msg = new Message(new TextComponent(`&e[MeowAddons] &fYour boss killed you in &b${(timeTaken / 1000).toFixed(2)}s&7 | &b${serverticks / 20}s.`)
                                .setHoverValue(`&c${serverticks} ticks &f| &c${timeTaken} ms &7- May not be 100% accurate`))
        ChatLib.chat(msg)
        resetBossTracker()
        slayerbossdisplay.update()
        slayerkilltimer.update()
    },/^  SLAYER QUEST FAILED!/)
    .registersub("servertick", () => serverticks++, () => isFighting)
    
// Slayer boss spawn timer

    .register("serverChat", () => {
        startspawntime = Date.now()
        spawnticks = 0
        slayerkilltimer.update()
    }, /^  SLAYER QUEST STARTED!$/)
    .registersub("serverScoreboard", () => {
        ChatLib.chat(new TextComponent(`&e[MeowAddons] &fSlayer boss spawned in &b${((Date.now() - startspawntime) / 1000).toFixed(2)}s&7 | &b${spawnticks / 20}s.`)
                        .setHoverValue(`&c${spawnticks} tick &f| &c${(Date.now() - startspawntime)} ms &7- May not be 100% accurate`))
        startspawntime = 0
        spawnticks = 0
        slayerkilltimer.update()
    }, () => startspawntime, /^Slay the boss!$/)
    .registersub("servertick", () => spawnticks++, () => startspawntime)

slayerbosshighlight
    .register("ma:postRenderEntity", (ent, pos) => {
        if (ent.entity.func_145782_y() !== bossID) return
        Render3D.renderEntityBox(
            pos.getX(),
            pos.getY(),
            pos.getZ(),
            ent.getWidth(),
            ent.getHeight(),
            0, 255, 255, 255, 2, false, false
        )
    }, [net.minecraft.entity.monster.EntityEnderman, net.minecraft.entity.passive.EntityWolf, net.minecraft.entity.monster.EntitySpider, net.minecraft.entity.monster.EntityZombie, net.minecraft.entity.monster.EntityBlaze])


GUI.onDraw(() => {
    Renderer.translate(GUI.getX(), GUI.getY());
    Renderer.scale(GUI.getScale());
    Renderer.drawStringWithShadow("&c03:59               &e64.2M &c❤\n&c☠ &bVoidgloom Seraph IV" , 0, 0);
    Renderer.finishDraw();
})