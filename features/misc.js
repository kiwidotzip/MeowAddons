import { FeatManager, hud } from "./helperfunction"
import Config from "../config"

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
let inBoss = false

Fireball
    .register("serverScoreboard", () => (inBoss = true, Fireball.update()), /Slay the boss!/)
    .register("serverScoreboard", () => (inBoss = false, Fireball.update()), /Boss slain!/)
    .registersub("ma:renderEntity", (ent, pos, pt, evn) => cancel(evn), () => Config().duringblaze && inBoss, [net.minecraft.entity.projectile.EntityFireball, net.minecraft.entity.projectile.EntitySmallFireball, net.minecraft.entity.projectile.EntityLargeFireball])
    .registersub("ma:renderEntity", (ent, pos, pt, evn) => cancel(evn), () => !Config().duringblaze, [net.minecraft.entity.projectile.EntityFireball, net.minecraft.entity.projectile.EntitySmallFireball, net.minecraft.entity.projectile.EntityLargeFireball])

Config().getConfig().registerListener("duringblaze", () => Fireball.update())

// Burning veng timer

const Veng = FeatManager.createFeature("vengtimer")
const VengGUI = hud.createTextHud("Vengeance timer", 400, 400, "&cVengeance: &b3.4s")
let starttime = null
let Fhit = true

Veng
    .register("entityDamage", (ent, player) => {
        if (player.getName() !== Player.getName() || !Player.getHeldItem()?.getName()?.removeFormatting()?.includes("Pyrochaos Dagger") || !Fhit || !ent.getEntity() instanceof net.minecraft.entity.monster.EntityBlaze) return
        const name = World.getWorld()?.func_73045_a(ent.entity.func_145782_y() + 3)?.func_70005_c_()?.removeFormatting()
        if (name?.includes("Spawned by") && name?.split("by: ")[1] == Player.getName()) {
            starttime = Date.now() + 6000
            Fhit = false
            Veng.update()
            setTimeout(() => (starttime = null, Fhit = true, Veng.update()), 5900)
        }
    })
    .registersub("renderOverlay", () => {
        if (hud.isOpen()) return
        const time = ((starttime - Date.now()) / 1000).toFixed(1)
        Renderer.scale(VengGUI.getScale())
        Renderer.drawString(`&cVengeance: &b${time}s`, VengGUI.getX(), VengGUI.getY())
    }, () => starttime)

VengGUI
    .onDraw(() => {
        Renderer.scale(VengGUI.getScale())
        Renderer.drawString(`&cVengeance: &b3.4s`, VengGUI.getX(), VengGUI.getY())
    })