import Settings from "../config";
import { FeatManager } from "./helperfunction";
const customsize = FeatManager.createFeature("customsize");

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