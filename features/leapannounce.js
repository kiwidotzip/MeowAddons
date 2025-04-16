import Config from "../config";  
import { registerWhen } from "./utils/renderutils";

registerWhen(register("chat", (player, event) => {
        ChatLib.command(`pc Leaping to ${player}`);
        ChatLib.chat(`&d&lMeowAddons &8» &rLeaping to ${player}`);
        cancel(event);
}).setCriteria("You have teleported to ${player}"), () => Config().leapannounce)