import Config from "../config";
import { meowc } from "./utils/data";
import { registerWhen } from "./utils/renderutils";

const PREFIX = "&e[MeowAddons]";
const ACHIEVEMENTS = [10, 25, 50, 100, 250, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000];
const MEOW_RESPONSES = ["mroww", "purr", "meowwwwww", "meow :3", "mrow", "moew", "mrow :3", "purrr :3"];

function bump() {
    meowc.meowcount++;
    meowc.save();
    if (ACHIEVEMENTS.includes(meowc.meowcount)) {
        const color = meowc.meowcount < 250 ? "b" : "c";
        ChatLib.chat(`${PREFIX} &fPrrrr! &${color}${meowc.meowcount} &fmeows!`);
    }
}

register("messageSent", msg => { if (msg.includes("meow")) bump(); });

register("command", () => {
    ChatLib.chat(`${PREFIX} &fYou have meowed &b${meowc.meowcount} &ftimes :3`);
}).setName("meowcount");

registerWhen(register("chat", (user, event) => 
    if (user === Player.getName()) return;
    setTimeout(() => {
        let cmd = "ac";
        if (message.startsWith("Party >")) cmd = "pc";
        else if (message.startsWith("Guild >") && Config().guildchattoggleautomeow) cmd = "gc";
        else if (message.startsWith("Officer >") && Config().guildchattoggleautomeow) cmd = "oc";
        
        ChatLib.command(`${cmd} ` + MEOW_RESPONSES[Math.floor(Math.random() * MEOW_RESPONSES.length)]);
        bump();
    }, Config().randomdelayautomeow ? Math.floor(Math.random() * 2000 + 500) : 100)
}).setCriteria(/^(?:\w+(?:-\w+)?\s>\s)?(?:\[[^\]]+\]\s)?([A-Za-z0-9_.-])+(?:\s[^\s\[\]:]+)?(?:\s\[[^\]]+\])?:\s(?:[A-Za-z0-9_.-]+(?:\s[^\s\[\]:]+)?(?:\s\[[^\]]+\])?\s?(?:[»>]|:)\s)?meow$/i), () => Config().automeow)
