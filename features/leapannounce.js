import { FeatManager } from "./helperfunction";
const leapannounce = FeatManager.createFeature("leapannounce");

leapannounce.register("chat", (player, event) => {
        ChatLib.command(`pc Leaping to ${player}`);
        ChatLib.chat(`&d&lMeowAddons &8» &rLeaping to ${player}`);
        cancel(event);
}, "You have teleported to ${player}")