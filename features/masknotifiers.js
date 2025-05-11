import Config from "../config"
import Dungeon from "../../tska/skyblock/dungeon/Dungeon"
import { createSkull } from "../../tska/utils/InventoryUtils"
import { FeatManager, hud } from "./helperfunction"
import { Render2D } from "../../tska/rendering/Render2D"
import { LocalStore } from "../../tska/storage/LocalStore"

const SpiritMask = createSkull("eyJ0aW1lc3RhbXAiOjE1MDUyMjI5OTg3MzQsInByb2ZpbGVJZCI6IjBiZTU2MmUxNzIyODQ3YmQ5MDY3MWYxNzNjNjA5NmNhIiwicHJvZmlsZU5hbWUiOiJ4Y29vbHgzIiwic2lnbmF0dXJlUmVxdWlyZWQiOnRydWUsInRleHR1cmVzIjp7IlNLSU4iOnsibWV0YWRhdGEiOnsibW9kZWwiOiJzbGltIn0sInVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvOWJiZTcyMWQ3YWQ4YWI5NjVmMDhjYmVjMGI4MzRmNzc5YjUxOTdmNzlkYTRhZWEzZDEzZDI1M2VjZTlkZWMyIn19fQ==")
const BonzoMask = createSkull("eyJ0aW1lc3RhbXAiOjE1ODc5MDgzMDU4MjYsInByb2ZpbGVJZCI6IjJkYzc3YWU3OTQ2MzQ4MDI5NDI4MGM4NDIyNzRiNTY3IiwicHJvZmlsZU5hbWUiOiJzYWR5MDYxMCIsInNpZ25hdHVyZVJlcXVpcmVkIjp0cnVlLCJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMTI3MTZlY2JmNWI4ZGEwMGIwNWYzMTZlYzZhZjYxZThiZDAyODA1YjIxZWI4ZTQ0MDE1MTQ2OGRjNjU2NTQ5YyJ9fX0=")
const Phoenix = createSkull("ewogICJ0aW1lc3RhbXAiIDogMTY0Mjg2NTc3MTM5MSwKICAicHJvZmlsZUlkIiA6ICJiYjdjY2E3MTA0MzQ0NDEyOGQzMDg5ZTEzYmRmYWI1OSIsCiAgInByb2ZpbGVOYW1lIiA6ICJsYXVyZW5jaW8zMDMiLAogICJzaWduYXR1cmVSZXF1aXJlZCIgOiB0cnVlLAogICJ0ZXh0dXJlcyIgOiB7CiAgICAiU0tJTiIgOiB7CiAgICAgICJ1cmwiIDogImh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNjZiMWI1OWJjODkwYzljOTc1Mjc3ODdkZGUyMDYwMGM4Yjg2ZjZiOTkxMmQ1MWE2YmZjZGIwZTRjMmFhM2M5NyIsCiAgICAgICJtZXRhZGF0YSIgOiB7CiAgICAgICAgIm1vZGVsIiA6ICJzbGltIgogICAgICB9CiAgICB9CiAgfQp9")

const maskrem = FeatManager.createFeature("maskrem", "catacombs")
const masknotifier = FeatManager.createFeature("masknotifier")
const maskcd = FeatManager.createFeature("maskcd", "catacombs")
const pheq = FeatManager.createFeature("maskcd")
const GUI = hud.createHud("Mask Display", 240, 240, 95, 43)

const helm = (helm) => Player.armor.getHelmet()?.getName()?.removeFormatting()?.includes(helm)
const data = new LocalStore("MeowAddons", { pequipped: false }, "./data/maskcd.json")

let bonzo = false
let spirit = false
let phoenix = false
let p3 = false
let bonzotick = 0
let spirittick = 0
let phoenixtick = 0

masknotifier.register("chat", (msg, event) => {
    const mask = [
        [/Your (?:. )?Bonzo's Mask saved your life!/, "Bonzo Mask activated (3s)"],
        [/^Second Wind Activated! Your Spirit Mask saved your life!$/, "Spirit Mask activated (3s)"],
        [/^Your Phoenix Pet saved you from certain death!$/, "Phoenix Pet activated (2-4s)"]
    ].find(([pattern]) => pattern.test(msg));
  
    if (!mask) return;
    ChatLib.command(`pc MeowAddons » ${mask[1]}`);
    cancel(event);
}, "${msg}")

maskrem
    .register("serverChat", () => {
        const helmet = Player.armor.getHelmet()?.getName()?.removeFormatting()
        if ((helmet?.includes("Bonzo's Mask")) || helmet?.includes("Spirit Mask")) return
        Render2D.showTitle("&cMask not equipped!",  null, 3000)
        World.playSound("mob.cat.hiss", 1, 1)
    }, "[BOSS] Storm: I should have known that I stood no chance.")

maskcd
    .register("serverChat", () => (bonzo = true, bonzotick = Dungeon.getMageReduction(360, true) * 20, maskcd.update()), /^Your (?:. )?Bonzo's Mask saved your life!$/)
    .register("serverChat", () => (spirit = true, spirittick = Dungeon.getMageReduction(30, true) * 20, maskcd.update()), /^Second Wind Activated! Your Spirit Mask saved your life!$/)
    .register("serverChat", () => (phoenix = true, phoenixtick = 1200, maskcd.update()), /^Your Phoenix Pet saved you from certain death!$/)
    .register("serverChat", () => p3 = true, "[BOSS] Storm: I should have known that I stood no chance.")
    .register("serverChat", () => p3 = false, "The Core entrance is opening!")
    .register("renderOverlay", () => {
        if (hud.isOpen() || (Config().onlyshowinp3 && !p3)) return
        Renderer.retainTransforms(true)
        Renderer.translate(GUI.getX(), GUI.getY())
        Renderer.scale(GUI.getScale())
        SpiritMask.draw(0, 0), Renderer.drawString(`&${helm("Spirit Mask") ? 'a' : 'c'}Spirit &7> &b${spirittick > 0 ? (spirittick / 20).toFixed(1) + 's' : '✔'}`, 16, 4)
        BonzoMask.draw(0, 12), Renderer.drawString(`&${helm("Bonzo's Mask") ? 'a' : 'c'}Bonzo &7> &b${bonzotick > 0 ? (bonzotick / 20).toFixed(1) + 's' : '✔'}`, 16, 5)
        Phoenix.draw(0, 12), Renderer.drawString(`&${data.pequipped ? 'a' : 'c'}Phoenix &7> &b${phoenixtick > 0 ? (phoenixtick / 20).toFixed(1) + 's' : '✔'}`, 16, 5)
        Renderer.retainTransforms(false)
    })
    .registersub("servertick", () => {
        bonzo && bonzotick > 0 && bonzotick--
        spirit && spirittick > 0 && spirittick--
        phoenix && phoenixtick > 0 && phoenixtick--
    }, () => bonzo || spirit || phoenix)
    .onRegister(() => (bonzo = spirit = p3 = false, bonzotick = spirittick = 0, maskcd.update()))
    .onUnregister(() => (bonzo = spirit = p3 = false, bonzotick = spirittick = 0, maskcd.update()))

pheq
    .register("chat", (pet) => pet === "Phoenix" ? (data.pequipped = true) : (data.pequipped = false), /Autopet equipped your \[Lvl \d+\] (.+)! VIEW RULE/)
    .register("chat", (pet) => pet === "Phoenix" ? (data.pequipped = true) : (data.pequipped = false), /You summoned your (.+)!/)
    .register("chat", () => data.pequipped = false, "You despawned your Phoenix!")

GUI.onDraw(() => {
    Renderer.retainTransforms(true)
    Renderer.translate(GUI.getX(), GUI.getY())
    Renderer.scale(GUI.getScale())
    SpiritMask.draw(0, 0), Renderer.drawString(`&cSpirit &7> &b23.4s`, 16, 4)
    BonzoMask.draw(0, 12), Renderer.drawString(`&aBonzo &7> &b124.3s`, 16, 5)
    Phoenix.draw(0, 12), Renderer.drawString(`&cPhoenix &7> &b✔`, 16, 5)
    Renderer.retainTransforms(false)
    Renderer.finishDraw()
})