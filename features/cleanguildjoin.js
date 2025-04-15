import Config from "../config";

registerWhen(register("chat", (color,username,joinleftmsg,event) => {
        cancel(event)
        if (joinleftmsg == "joined") ChatLib.chat(`&8G &2>> ${color}${username}`)
            if (joinleftmsg == "left") ChatLib.chat(`&8G &4<< ${color}${username}`)
}).setCriteria(/^&2Guild > &r(&a|&b|&6|&c|&d|&2|&9|&7)(.+) &r&e(.+)\.&r/), () => Config().cleanguildjoin && Config().cleantoggle)
