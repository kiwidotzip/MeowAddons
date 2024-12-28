import Settings from "../config";

register("chat", (hypixelrank, username, message, event) => {
    if (!Settings.partyformat) return;
    cancel(event);
    ChatLib.chat(`&9P &8> &b${username}&f: ${message}`);
}).setCriteria(/Party > (\[.+?\])? ?(.+?): (.+)/);
