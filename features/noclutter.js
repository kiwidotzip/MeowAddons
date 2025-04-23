import { FeatManager } from "./helperfunction";

const noLightning = FeatManager.createFeature("noLightning")
const noDeathAni = FeatManager.createFeature("noDeathAni")
const noEnderTP = FeatManager.createFeature("noEnderTP")
const livid = /^\w+ Livid$/

// Credit to Doc/BloomModule for all of this <3

noLightning.register("renderEntity", (ent, pos, pt, evn) => cancel(evn), net.minecraft.entity.effect.EntityLightningBolt)
noDeathAni.register("entityDeath", (ent) => livid.test(ent?.getName()?.removeFormatting()) && ent.getEntity().func_70106_y())
noEnderTP.register(net.minecraftforge.event.entity.living.EnderTeleportEvent, (evn) => cancel(evn))