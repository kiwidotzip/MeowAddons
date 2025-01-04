import Config from "../config";

register("chat", (color,username,joinleftmsg,event) => {
    if (!Config().cleanguildjoin) return;
    if (!Config().cleantoggle) return;
        cancel(event)
        if (joinleftmsg == "joined") ChatLib.chat(`&8G &2>> ${color}${username}`)
            if (joinleftmsg == "left") ChatLib.chat(`&8G &4<< ${color}${username}`)
}).setCriteria(/&2Guild > &r(&a|&b|&6|&c|&d|&2|&9|&7)(.+) &r&e(.+)\.&r/)
