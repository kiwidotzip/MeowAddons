import Settings from "../config";

register("chat", (username,joinleftmsg,event) => {
    if (!Settings.cleanfriendjoin) return
        cancel(event)
        if (joinleftmsg == "joined") ChatLib.chat(`&8F &2>> &b${username}`)
            if (joinleftmsg == "left") ChatLib.chat(`&8F &4<< &b${username}`)
}).setCriteria(/Friend > (.+) (.+)\./)
