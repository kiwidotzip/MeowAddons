import Settings from "../config";

register("chat", (color,username,joinleftmsg,event) => {
    if (!Settings.cleanfriendjoin) return
        cancel(event)
        if (joinleftmsg == "joined") ChatLib.chat(`&8F &2>> &b${username}`)
        if (joinleftmsg == "left") ChatLib.chat(`&8F &4<< &b${username}`)
}).setCriteria(/&aFriend > &r(&a|&b|&6|&c|&d|&2|&9)(.+) &r&e(.+)\.&r/)
