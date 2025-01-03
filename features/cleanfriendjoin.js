import Config from "../config";

register("chat", (color, username, joinleftmsg, event) => {
    if (!Config().cleanfriendjoin && !Config().cleantoggle) return;
    cancel(event);
    if (joinleftmsg === "joined") ChatLib.chat(`&8F &2>> ${color}${username}`);
    if (joinleftmsg === "left") ChatLib.chat(`&8F &4<< ${color}${username}`);
}).setCriteria(/&aFriend > &r(&a|&b|&6|&c|&d|&2|&9|&7)(.+) &r&e(.+)\.&r/);
