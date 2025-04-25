import { FeatManager } from "./helperfunction";
const cleanguild = FeatManager.createFeature("cleanguildjoin")

cleanguild.register("chat", (color, username, joinleftmsg, event) => {
        cancel(event)
        if (joinleftmsg == "joined") ChatLib.chat(`&8G &2>> ${color}${username}`)
        if (joinleftmsg == "left") ChatLib.chat(`&8G &4<< ${color}${username}`)
}, /^&2Guild > &r(&a|&b|&6|&c|&d|&2|&9|&7)(.+) &r&e(.+)\.&r/)
