import Config from "../config";
import { meowc } from "./utils/data";
import { FeatManager } from "./helperfunction";

const AutoMeow = FeatManager.createFeature("automeow");
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

register("messageSent", msg => { if (msg.toLowerCase().includes("meow")) bump(); });

register("command", () => {
    ChatLib.chat(`${PREFIX} &fYou have meowed &b${meowc.meowcount} &ftimes :3`);
}).setName("meowcount");

AutoMeow.register("chat", (user, event) => {
    if (user === Player.getName()) return;
    const message = ChatLib.getChatMessage(event).removeFormatting();

    setTimeout(() => {
        let cmd = "ac";
        if (message.startsWith("Party >")) cmd = "pc";
        else if (message.startsWith("Guild >")) cmd = "gc";
        else if (message.startsWith("Officer >")) cmd = "oc";
        else if (message.startsWith("Co-op >")) cmd = "cc";
        ChatLib.command(`${cmd} ` + MEOW_RESPONSES[Math.floor(Math.random() * MEOW_RESPONSES.length)]);
        bump();
    }, Config().randomdelayautomeow ? Math.floor(Math.random() * 2000 + 500) : 100);
}, /^(?:\w+(?:-\w+)?\s>\s)?(?:\[[^\]]+\]\s)?(?:\S+\s)?(?:\[[^\]]+\]\s)?([A-Za-z0-9_.-]+)(?:\s[^\s\[\]:]+)?(?:\s\[[^\]]+\])?:\s(?:[A-Za-z0-9_.-]+(?:\s[^\s\[\]:]+)?(?:\s\[[^\]]+\])?\s?(?:[»>]|:)\s)?meow$/i);