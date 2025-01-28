import Config from "./config";  

register("chat", (player, event) => {
    if (!Config().leapannounce) return;
        ChatLib.command(`pc Leaping to ${player}`);
        ChatLib.chat(`&d&lMeowAddons &8» &rLeaping to ${player}`);
        cancel(event);
}).setCriteria("You have teleported to ${player}");