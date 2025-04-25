import { FeatManager } from "./helperfunction";
const cleanfriend = FeatManager.createFeature("cleanfriendjoin")

cleanfriend.register("chat", (color, username, joinleftmsg, event) => {
    cancel(event);
    if (joinleftmsg === "joined") ChatLib.chat(`&8F &2>> ${color}${username}`);
    if (joinleftmsg === "left") ChatLib.chat(`&8F &4<< ${color}${username}`);
}, /^&aFriend > &r(&a|&b|&6|&c|&d|&2|&9|&7)(.+) &r&e(.+)\.&r/)
