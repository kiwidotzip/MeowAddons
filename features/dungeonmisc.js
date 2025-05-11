import { FeatManager } from "./helperfunction"
import { Render3D } from "../../tska/rendering/Render3D"
import { Render2D } from "../../tska/rendering/Render2D"
import { scheduleTask } from "../../tska/shared/ServerTick"
import Config from "../config"

// Key stuff

let bloodopen = false
const KeyH = FeatManager.createFeature("keyhighlight", "catacombs")
const KeyA = FeatManager.createFeature("keyalert", "catacombs")
const KeyPA = FeatManager.createFeature("keypickalert", "catacombs")

KeyH
    .register("ma:renderEntity", (ent, pos) => {
        if (!["Wither Key", "Blood Key"].includes(ent.getName()?.removeFormatting())) return
        Config().renderfilledkey
        ? Render3D.renderEntityBoxFilled(
            pos.getX(), pos.getY() + 1.15, pos.getZ(), 
            1, 1, Config().keycolor[0], Config().keycolor[1], Config().keycolor[2], Config().keycolor[3], false, false)
        : Render3D.renderEntityBox(
            pos.getX(), pos.getY() + 1.15, pos.getZ(), 
            1, 1, Config().keycolor[0], Config().keycolor[1], Config().keycolor[2], 255, Config().linewidthkey, false, false)
    }, [net.minecraft.entity.item.EntityArmorStand])
KeyA
    .register("serverChat", () => !bloodopen && (bloodopen = true, KeyA.update()), /\[BOSS\] The Watcher: .+/)
    .registersub("ma:entityJoin", (ent) => {
        scheduleTask(() => {
            if (ent.func_70005_c_()?.removeFormatting()?.includes("Wither Key")) Render2D.showTitle("&8Wither &fkey spawned!", null, 2000)
            if (ent.func_70005_c_()?.removeFormatting()?.includes("Blood Key")) Render2D.showTitle("&cBlood &fkey spawned!", null, 2000)
        })
    }, () => !bloodopen)
    .onRegister(() => (bloodopen = false, KeyA.update()))
KeyPA
    .register("serverChat", (ent, key) => {
        !bloodopen && Render2D.showTitle(`&b${key} &fpicked up!`, `&7by ${ent}`, 2000)
    }, /^\[.+\] (.+) has obtained (Wither Key|Blood Key)!$/)
    .register("serverChat", (key) => {
        !bloodopen && Render2D.showTitle(`&b${key} &fpicked up!`)
    }, /^A (Wither Key|Blood Key) was picked up!$/)

// Term tracker

const Terms = FeatManager.createFeature("termtrack", "catacombs")
const Completed = new Map()

Terms
    .register("chat", (user, type) => {
        if (!["terminal", "lever", "device"].includes(type)) return
        const currentData = Completed.get(user) || {}
        const newData = { ...currentData }
        newData[type] = (currentData[type] || 0) + 1
        Completed.set(user, newData)
    }, /^(\w{1,16}) (?:activated|completed) a (\w+)! \(\d\/\d\)$/)
    .register("chat", () => {
        Completed.forEach((data, user) => {
            ChatLib.chat(`&e[MA] &b${user}&7 - &b${data.lever || 0} &flevers &7| &b${data.terminal || 0} &fterminals &7| &b${data.device || 0} &fdevices`)
        })
    }, "The Core entrance is opening!")
    .onRegister(() => Completed.clear())
    .onUnregister(() => Completed.clear())