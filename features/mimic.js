import { FeatManager } from "./helperfunction";

let sent = false;
const MimicChest = FeatManager.createFeature("colormimicchests", "catacombs")
const MimicDead = FeatManager.createFeature("mimicdeathmsg", "catacombs")

MimicChest
    .register("ma:renderTileEntity", (ent) => {
        if (ent.tileEntity.func_145980_j() !== 1) return; // check for trapped chest
        GL11.glPushMatrix();
        GL11.glColor3f(1.0, 0.0, 0.0);
    }, [net.minecraft.tileentity.TileEntityChest])
    .register("ma:postRenderTileEntity", (ent) => {
        if (ent.tileEntity.func_145980_j() !== 1) return; // check for trapped chest
        GL11.glPopMatrix();
    }, [net.minecraft.tileentity.TileEntityChest])

MimicDead
    .register("entityDeath", (ent) => {
        if (ent.entity.func_70631_g_() && ent.getClassName() == "EntityZombie" && !sent) ChatLib.command("pc Mimic Dead!"), sent = true;
    })
    .register("worldLoad", () => sent = false)