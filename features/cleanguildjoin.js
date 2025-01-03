import Settings from "../config";

register("chat", (color,username,joinleftmsg,event) => {
    if (!Settings.cleanguildjoin) return
        cancel(event)
        if (joinleftmsg == "joined") ChatLib.chat(`&8G &2>> &a${username}`)
            if (joinleftmsg == "left") ChatLib.chat(`&8G &4<< &a${username}`)
}).setCriteria(/&2Guild > &r&(a|b|6|c|d|2|9|7)(.+) &r&e(.+)\.&r/)
