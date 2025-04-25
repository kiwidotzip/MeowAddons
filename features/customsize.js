import Settings from "../config";
import { FeatManager } from "./helperfunction";
const customsize = FeatManager.createFeature("customsize");
const Float = Java.type("java.lang.Float");
const setPlayerHeight = height => Player.getPlayer().eyeHeight = new Float(height) // Thanks noamm <3

customsize
    .register("renderEntity", entity => {
        Tessellator.pushMatrix();
        const { customX: x, customY: y, customZ: z } = Settings();
        if (y < 0) {
          Tessellator.translate(0, -2 * y, 0);
          Tessellator.rotate(180, 1, 0, 0);
          Tessellator.rotate(2 * entity.getYaw() + 180, 0, 1, 0);
        }
        Tessellator.scale(x, Math.abs(y), z);
    }, net.minecraft.client.entity.EntityPlayerSP)
    .register("postRenderEntity", () => Tessellator.popMatrix(), net.minecraft.client.entity.EntityPlayerSP)
    .register("gameLoad", () => Settings().customY ? setPlayerHeight(Settings().customY * 1.62) : setPlayerHeight(1.62))
    .onUnregister(() => setPlayerHeight(1.62))

Settings().getConfig().registerListener("customY", (oldv, newv) => newv ? setPlayerHeight(newv * 1.62) : setPlayerHeight(1.62))