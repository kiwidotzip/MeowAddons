import Settings from "../config";

register("chat", (username,joinleftmsg,event) => {
    if (!Settings.cleanguildjoin) return
        cancel(event)
        if (joinleftmsg == "joined") ChatLib.chat(`&8G &2>> &a${username}`)
            if (joinleftmsg == "left") ChatLib.chat(`&8G &4<< &a${username}`)
}).setCriteria(/Guild > (.+) (.+)\./)
