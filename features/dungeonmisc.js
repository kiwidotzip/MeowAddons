import { FeatManager } from "./helperfunction"
import { Render3D } from "../../tska/rendering/Render3D"
import { Render2D } from "../../tska/rendering/Render2D"
import { scheduleTask } from "../../tska/shared/ServerTick"
import Config from "../config"

// Key stuff

let bloodopen = false
const KeyH = FeatManager.createFeature("keyhighlight", "catacombs")
const KeyA = FeatManager.createFeature("keyalert", "catacombs")

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