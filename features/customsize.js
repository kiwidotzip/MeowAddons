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
        if (y < 0) {
            Tessellator.translate(0, -2 * y, 0)
            Tessellator.rotate(180, 1, 0, 0)
            Tessellator.rotate(2 * entity.getYaw() + 180, 0, 1, 0)
        }
        Tessellator.scale(x, Math.abs(y), z)
    }, net.minecraft.client.entity.EntityPlayerSP)
    .register("postRenderEntity", () => Tessellator.popMatrix(), net.minecraft.client.entity.EntityPlayerSP)

Config().getConfig()
                    .registerListener("customX", (oldv, newv) => x = newv)
                    .registerListener("customY", (oldv, newv) => y = newv)
                    .registerListener("customZ", (oldv, newv) => z = newv)