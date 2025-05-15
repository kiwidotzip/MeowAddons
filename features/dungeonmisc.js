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

// Custom PF messages

const PFmsg = FeatManager.createFeature("pfmsg")

PFmsg
    .register("chat", (evn) => (cancel(evn), ChatLib.chat(`&c&lPF &7> &fParty queued.`)), "Party Finder > Your party has been queued in the dungeon finder!")
    .register("chat", (evn) => (cancel(evn), ChatLib.chat(`&c&lPF &7> &fParty delisted.`)), "Party Finder > Your group has been de-listed!")
    .register("chat", (user, cls, lvl, evn) => {
        cancel(evn)
        const msg = new Message(`&c&lPF &7> &b${user} &8| &b${cls} &7- &b${lvl}`)
        user === Player.getName() 
            ?  ChatLib.chat(msg)
            :  (msg.addTextComponent(new TextComponent(`&8 | &a[✖]`).setClick(`run_command`, `/p kick ${user}`).setHover("show_text", "&cKick &b" + user)),
                msg.addTextComponent(new TextComponent(`&8 | &a[PV]`).setClick(`run_command`, `/pv ${user}`).setHover("show_text", "&cPV &b" + user)),
                ChatLib.chat(msg))
    }, /^Party Finder > (.+?) joined the dungeon group! \((\w+) Level (\d+)\)$/)
    .register("chat", (user, cls, lvl, evn) => {
        cancel(evn)
        ChatLib.chat(`&c&lPF &7> &b${user} &fchanged to &b${cls} &7- &b${lvl}`)
    }, /^Party Finder > (.+?) set their class to (\w+) Level (\d+)!$/)