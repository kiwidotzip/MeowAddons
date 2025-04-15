import Settings from "../config";
import { registerWhen } from "./utils/renderutils";

registerWhen(
  register("renderEntity", entity => {
    if (entity.getName() !== Player.getName()) return;
    Tessellator.pushMatrix();
    const { customX: x, customY: y, customZ: z } = Settings();
    if (y < 0) {
      Tessellator.translate(0, -2 * y, 0);
      Tessellator.rotate(180, 1, 0, 0);
      Tessellator.rotate(2 * entity.getYaw() + 180, 0, 1, 0);
    }
    Tessellator.scale(x, Math.abs(y), z);
  }), () => Settings().customsize
);

registerWhen(
  register("postRenderEntity", entity => {
    if (entity.getName() !== Player.getName()) return;
    Tessellator.popMatrix();
  }), () => Settings().customsize
);