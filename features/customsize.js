import Config from "../config"
import { FeatManager } from "./helperfunction"
const customsize = FeatManager.createFeature("customsize")

// Credit to Cubed module - /ct import cubed

let x = Config().customX
let y = Config().customY
let z = Config().customZ

customsize
    .register("renderEntity", entity => {
        Tessellator.pushMatrix()
        Tessellator.scale(x, Math.abs(y), z)
    }, net.minecraft.client.entity.EntityPlayerSP)
    .register("postRenderEntity", () => Tessellator.popMatrix(), net.minecraft.client.entity.EntityPlayerSP)

Config().getConfig()
    .registerListener("customX", (oldv, newv) => x = newv)
    .registerListener("customY", (oldv, newv) => y = newv)
    .registerListener("customZ", (oldv, newv) => z = newv)
    .onCloseGui(() => {
       Config().customY < 0 && (Config().customY = 1, ChatLib.chat(`&e[MeowAddons] &fYou can't put in negative values!`))
    })