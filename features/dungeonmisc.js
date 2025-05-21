import { FeatManager } from "./helperfunction"
import { Render3D } from "../../tska/rendering/Render3D"
import { Render2D } from "../../tska/rendering/Render2D"
import { scheduleTask } from "../../tska/shared/ServerTick"
import { Data } from "./utils/data"
import Config from "../config"
import Dungeon from "../../tska/skyblock/dungeon/Dungeon"

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

// i4 Stuff

const I4DG = FeatManager.createFeature("i4notif", "catacombs")
let i4start = 0
let devs = 0
let i4 = false

const i4msg = (message) => {
    ChatLib.chat(`&e[MeowAddons] ${message}`)
    Config().sendi4 && ChatLib.command(`p ${message.removeFormatting()}`)
} 

I4DG
    .register("chat", () => {
        i4start = Date.now()
        setTimeout(() => (!i4 && i4msg(`&fI4 incomplete.`)), 15000)
    }, "[BOSS] Goldor: Who dares trespass into my domain?")
    .register("chat", () => {
        Data.goldorsection === 1 && devs++
        devs === 2 && (i4 = true, i4msg(`&fI4 completed in &b${((Date.now() - i4start) / 1000).toFixed(1)}s&f.`))
    }, /(\w{1,16}) completed a device! \(\d\/7\)/)
    .onRegister(() => (i4start = 0, devs = 0, i4 = false))
    .onUnregister(() => (i4start = 0, devs = 0, i4 = false))

// Terminal callouts

const sendTermInChat = FeatManager.createFeature("sendTermInChat", "catacombs")

sendTermInChat
    .register("chat", () => {
        ChatLib.command(Config().sendTermInChat == 5 ? "pc I will do devices!" : `pc I will do ${(Config().sendTermInChat)}th term!`)
    }, "[BOSS] Storm: I should have known that I stood no chance.")

// Leap announce

const leapannounce = FeatManager.createFeature("leapannounce", "catacombs")

leapannounce
    .register("chat", (p) => ChatLib.command(`pc Leaping to ${player}`), "You have teleported to ${p}")

// Leap hide

const hide = FeatManager.createFeature("hideafterleap", "catacombs")
let hiding = false

hide
    .register("chat", (player) => {
        hiding = true
        hide.update()
        setTimeout(() => (hiding = false, hide.update()), Config().hideleaptime * 1000)
    }, "You have teleported to ${player}")
    .registersub("renderEntity", (ent, pos, pt, evn) => ent.getName() !== Player.getName() && cancel(evn), () => hiding, net.minecraft.entity.player.EntityPlayer)

// Bat dead

const BatDead = FeatManager.createFeature("batdeadtitle", "catacombs")
BatDead
    .register("soundPlay", () => !Dungeon.inBoss() && Render2D.showTitle(`&cBat Dead!`, null, 1000), "mob.bat.death")
    .register("soundPlay", () => !Dungeon.inBoss() && Render2D.showTitle(`&cBat Dead!`, null, 1000), "mob.bat.hurt")

