import Config from "../config";
import { FeatManager } from "./helperfunction";

const hide = FeatManager.createFeature("hideafterleap");
const leapannounce = FeatManager.createFeature("leapannounce");
let hiding = false

leapannounce.register("chat", (player, event) => {
    ChatLib.command(`pc Leaping to ${player}`);
    ChatLib.chat(`&d&lMeowAddons &8» &rLeaping to ${player}`);
    cancel(event);
}, "You have teleported to ${player}")

hide
    .register("chat", (player) => {
        hiding = true
        hide.update()
        setTimeout(() => {
            hiding = false
            hide.update()
        }, Config().hideleaptime * 1000)
    }, "You have teleported to ${player}")

    .registersub("renderEntity", (ent, pos, pt, evn) => {
        ent.getEntity() !== Player.getEntity() && cancel(evn)
    }, () => hiding, net.minecraft.entity.player.EntityPlayer)