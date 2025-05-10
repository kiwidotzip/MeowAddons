import { FeatManager } from "./helperfunction"

const GuildJoin = FeatManager.createFeature("cleanguildjoin")
const FriendJoin = FeatManager.createFeature("cleanfriendjoin")

GuildJoin
    .register("chat", (color, user, msg, evn) => {
        cancel(evn)
        ChatLib.chat(msg == "joined" ? `&8G &2>> ${color}${user}` : msg == "left" ? `&8G &4<< ${color}${user}` : '')
    }, /^&2Guild > &r(&a|&b|&6|&c|&d|&2|&9|&7)(.+) &r&e(.+)\.&r/)

FriendJoin
    .register("chat", (color, user, msg, evn) => {
        cancel(evn)
        ChatLib.chat(msg == "joined" ? `&8F &2>> ${color}${user}` : msg == "left" ? `&8F &4<< ${color}${user}` : '')
    }, /^&aFriend > &r(&a|&b|&6|&c|&d|&2|&9|&7)(.+) &r&e(.+)\.&r/)