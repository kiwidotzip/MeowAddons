import { FeatManager } from "./helperfunction";
import { scheduleTask } from "../../tska/shared/ServerTick";

const noLightning = FeatManager.createFeature("noLightning")
const noDeathAni = FeatManager.createFeature("noDeathAni")
const noEnderTP = FeatManager.createFeature("noEnderTP")
const noEmptyTooltip = FeatManager.createFeature("noEmptyTooltip")
const hidenonstarmobs = FeatManager.createFeature("hidenonstarmobs", "catacombs")
const hidedmg = FeatManager.createFeature("hidedmg", "catacombs")
const livid = /^\w+ Livid$/
const blaze = /^\[Lv15\] Blaze [\d,]+\/([\d,]+)❤$/
const star = /^(?:\[Lv\d+\] )?[\w ]+ [\d,.]+\w(?:\/[\d,.]+\w)?❤$/
const dmg = /^.?\d[\d,.]+.*?$/

// Credit to Doc/BloomModule for all of this <3 - https://github.com/DocilElm/Doc 

noLightning.register("renderEntity", (ent, pos, pt, evn) => cancel(evn), net.minecraft.entity.effect.EntityLightningBolt)
noDeathAni.register("entityDeath", (ent) => livid.test(ent?.getName()?.removeFormatting()) && ent.getEntity().func_70106_y())
noEnderTP.register("ma:endermanTP", (evn) => cancel(evn))
noEmptyTooltip.register("itemTooltip", (lore, item, evn) => lore.length === 1 && lore[0]?.trim() === "§o §r" && cancel(evn))
hidenonstarmobs.register("ma:entityJoin", (ent, entID, evn) => {
    scheduleTask(() => {
        const name = ent.func_70005_c_()?.removeFormatting()
        if (name && !blaze.test(name) && star.test(name)) ent.func_70106_y()
    })
})
hidedmg.register("ma:entityJoin", (ent, entID, evn) => {
    scheduleTask(() => {
        const name = ent.func_70005_c_()?.removeFormatting()
        if (name && dmg.test(name)) ent.func_70106_y()
    })
})