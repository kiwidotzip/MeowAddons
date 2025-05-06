import Config from "../config";
import { meowc } from "./utils/data";
import { FeatManager } from "./helperfunction";

const AutoMeow = FeatManager.createFeature("automeow");
const achi = [10, 25, 50, 100, 250, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000];
const meows = ["mroww", "purr", "meowwwwww", "meow :3", "mrow", "moew", "mrow :3", "purrr :3"];
const meowmap = {
    "Party >": "pc",
    "Guild >": "gc",
    "Officer >": "oc",
    "Co-op >": "cc"
}

function bump() {
    meowc.meowcount++
    achi.includes(meowc.meowcount) && ChatLib.chat(`&e[MeowAddons] &${meowc.meowcount < 250 ? "b" : "c"}${meowc.meowcount} &fmeows!`)
}

register("messageSent", msg => msg.toLowerCase().includes("meow") && bump())

register("command", () => ChatLib.chat(`&e[MeowAddons] &fYou have meowed &b${meowc.meowcount} &ftimes :3`)).setName("meowcount")

AutoMeow.register("chat", (user, event) => {
    const message = ChatLib.getChatMessage(event).removeFormatting()
    if (user === Player.getName() || message.startsWith("To ")) return

    setTimeout(() => {
        const cmd = message.startsWith("From ") ? `msg ${user}` : (m = message.match(/^(Party >|Guild >|Officer >|Co-op >)/)) ? meowmap[m[1]] : "ac"
        ChatLib.command(`${cmd} ${meows[Math.floor(Math.random() * meows.length)]}`)    
        bump()
    }, Config().randomdelayautomeow ? Math.floor(Math.random() * 2000 + 500) : 100)
}, /^(?:\w+(?:-\w+)?\s>\s)?(?:\[[^\]]+\]\s)?(?:\S+\s)?(?:\[[^\]]+\]\s)?([A-Za-z0-9_.-]+)(?:\s[^\s\[\]:]+)?(?:\s\[[^\]]+\])?:\s(?:[A-Za-z0-9_.-]+(?:\s[^\s\[\]:]+)?(?:\s\[[^\]]+\])?\s?(?:[»>]|:)\s)?meow$/i);