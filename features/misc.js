import { FeatManager, hud } from "./helperfunction"
import Config from "../config"
import { scheduleTask } from "../../tska/shared/ServerTick"

// Overlay thing

const ShowCMD = FeatManager.createFeature("showcmd")

ShowCMD
    .register("chatComponentHovered", (comp) => {
        if (!comp.getClickValue()) return
        const newValue = new TextComponent(comp.getHoverValue() 
                        ? comp.getHoverValue() + "\n&e[MA] &7| &fRuns &c\"&n" + comp.getClickValue() + "&c\"" 
                        : "&e[MA] &7| &fRuns &c\"&n" + comp.getClickValue() + "&c\"")
        comp.setHoverValue(newValue.getText())
    })

// Reaper highlight

const ReaperHG = FeatManager.createFeature("reaperhighlight")
let ReaperColor = Renderer.color(...Config().reaperhgcolor)

ReaperHG
    .register("renderSlot", (slot) => {
        const [x, y] = [slot.getDisplayX(), slot.getDisplayY()]
        if (slot?.getItem()?.getName()?.removeFormatting()?.includes("Reaper")) Renderer.drawCircle(ReaperColor, x + 8, y + 8, 8, 20)
    })

Config().getConfig().registerListener("reaperhgcolor", (oldv, newv) => ReaperColor = Renderer.color(...newv))

// Hide fireballs

const Fireball = FeatManager.createFeature("hidefireball")
let inBossFB = false

Fireball
    .register("serverScoreboard", () => (inBossFB = true, Fireball.update()), /Slay the boss!/)
    .register("serverScoreboard", () => (inBossFB = false, Fireball.update()), /Boss slain!/)
    .register("serverChat", () => (inBossFB = false, Fireball.update()), /  SLAYER QUEST FAILED!/)
    .registersub("ma:renderEntity", (ent, pos, pt, evn) => cancel(evn), () => Config().duringblaze && inBossFB, [net.minecraft.entity.projectile.EntityFireball, net.minecraft.entity.projectile.EntitySmallFireball, net.minecraft.entity.projectile.EntityLargeFireball])
    .registersub("ma:renderEntity", (ent, pos, pt, evn) => cancel(evn), () => !Config().duringblaze, [net.minecraft.entity.projectile.EntityFireball, net.minecraft.entity.projectile.EntitySmallFireball, net.minecraft.entity.projectile.EntityLargeFireball])

Config().getConfig().registerListener("duringblaze", () => Fireball.update())

// Burning veng timer

const VengT = FeatManager.createFeature("vengtimer", "crimson isle")
const VengGUI = hud.createTextHud("Vengeance timer", 400, 400, "&cVengeance: &b3.4s")
let starttime = null
let Fhit = true
let inBossVT = false

VengT
    .register("serverScoreboard", () => (inBossVT = true, VengT.update()), /Slay the boss!/)
    .register("serverScoreboard", () => (inBossVT = false, VengT.update()), /Boss slain!/)
    .register("serverChat", () => (inBossVT = false, VengT.update()), /  SLAYER QUEST FAILED!/)
    .registersub("entityDamage", (ent, player) => {
        if (player.getName() !== Player.getName() || !Player.getHeldItem()?.getName()?.removeFormatting()?.includes("Pyrochaos Dagger") || !Fhit || !ent.getEntity() instanceof net.minecraft.entity.monster.EntityBlaze) return
        const name = World.getWorld()?.func_73045_a(ent.entity.func_145782_y() + 3)?.func_70005_c_()?.removeFormatting()
        if (name?.includes("Spawned by") && name?.split("by: ")[1] == Player.getName()) {
            starttime = Date.now() + 6000
            Fhit = false
            VengT.update()
            setTimeout(() => (starttime = null, Fhit = true, VengT.update()), 5900)
        }
    }, () => inBossVT)
    .registersub("renderOverlay", () => {
        if (hud.isOpen()) return
        const time = ((starttime - Date.now()) / 1000).toFixed(1)
        Renderer.scale(VengGUI.getScale())
        Renderer.drawString(`&cVengeance: &b${time}s`, VengGUI.getX(), VengGUI.getY())
    }, () => starttime && inBossVT)

VengGUI
    .onDraw(() => {
        Renderer.scale(VengGUI.getScale())
        Renderer.drawString(`&cVengeance: &b3.4s`, VengGUI.getX(), VengGUI.getY())
    })

// Veng damage

const VengD = FeatManager.createFeature("vengdamage", "crimson isle")
let inBossVE = false
let nametagID = 0

VengD
    .register("serverScoreboard", () => (inBossVE = true, nametagID = 0, VengD.update()), /Slay the boss!/)
    .register("serverScoreboard", () => (inBossVE = false, nametagID = 0, VengD.update()), /Boss slain!/)
    .register("serverChat", () => (inBossVE = false, nametagID = 0, VengD.update()), /  SLAYER QUEST FAILED!/)
    .registersub("ma:entityJoin", (ent, id) => {
        scheduleTask(() => {
            const name = ent.func_70005_c_()?.removeFormatting()
            if (name?.includes("Spawned by") && name?.split("by: ")[1] === Player.getName()) (nametagID = id, VengD.update())
        }, 2)
    }, () => inBossVE && !nametagID)
    .registersub("ma:entityJoin", (ent) => {
        if (!(ent instanceof net.minecraft.entity.item.EntityArmorStand) || (nametagID && ent.func_70032_d(World.getWorld().func_73045_a(nametagID)) > 5)) return
        scheduleTask(() => {
            const string = ent.func_70005_c_()?.removeFormatting()
            const numstring = Number(string.replace(/,/g, "").replace("ﬗ", ""))
            new RegExp(/^\d+(?:,\d+)*ﬗ$/).test(string) && numstring > 500000 && ChatLib.chat(`&e[MA] &fVeng DMG: &c${string}`)
        }, 2)
    }, () => inBossVE && nametagID)