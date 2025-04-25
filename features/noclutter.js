import { FeatManager } from "./helperfunction";

const noLightning = FeatManager.createFeature("noLightning")
const noDeathAni = FeatManager.createFeature("noDeathAni")
const noEnderTP = FeatManager.createFeature("noEnderTP")
const noEmptyTooltip = FeatManager.createFeature("noEmptyTooltip")
const livid = /^\w+ Livid$/

// Credit to Doc/BloomModule for all of this <3 - https://github.com/DocilElm/Doc 

noLightning.register("renderEntity", (ent, pos, pt, evn) => cancel(evn), net.minecraft.entity.effect.EntityLightningBolt)
noDeathAni.register("entityDeath", (ent) => livid.test(ent?.getName()?.removeFormatting()) && ent.getEntity().func_70106_y())
noEnderTP.register("ma:endermanTP", (evn) => cancel(evn))
noEmptyTooltip.register("itemTooltip", (lore, item, evn) => lore.length === 1 && lore[0]?.trim() === "§o §r" && cancel(evn))