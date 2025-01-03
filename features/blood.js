import Config from "../config";
import { InDungeon } from "./helperfunction";

let bloodopen = false
let starttime = 0
let speaktime = 0
let diftime = 0
let spawnalltime = 0
let camptime = 0
var blooddone = false

register ("worldLoad", () => {
    bloodopen = false
    starttime = 0
    speaktime = 0
    diftime = 0
    spawnalltime = 0
    camptime = 0
    blooddone = false
})

register("chat", (event) => {
    if (!Config().blood) return;
    if (!InDungeon) return;
//BLOOD OPEN
        if (ChatLib.getChatMessage(event).startsWith("[BOSS] The Watcher:") && !bloodopen) {
            bloodopen = true;
            starttime = Date.now();
        }
//WATCHER DIALOGUE
        if (ChatLib.getChatMessage(event).startsWith("[BOSS] The Watcher: Let's see how you can handle this.")) {
            speaktime = Date.now();
            diftime = (speaktime - starttime) / 1000;
//FAST WATCHER
            if (diftime < 22) {
                World.playSound("mob.cat.meow", 10, 1);
                Client.showTitle(`&c&lFast Watcher`, `&cWatcher reached dialogue!`, 2, 45, 10);
                ChatLib.chat(`&dMeowAddons &8» &rWatcher took &e${diftime.toFixed(1)}s&r to reach dialogue! &c&l[FAST]`);
                if (Config().sendbloodparty) {
                    ChatLib.command(`pc MeowAddons » Watcher took ${diftime.toFixed(1)}s to reach dialogue! [FAST]`);
                }
//AVERAGE WATCHER
            } else if (diftime >= 22 && diftime < 25) {
                World.playSound("mob.cat.meow", 10, 1);
                Client.showTitle(`&c&lAverage Watcher`, `&cWatcher reached dialogue!`, 2, 45, 10);
                ChatLib.chat(`&dMeowAddons &8» &rWatcher took &e${diftime.toFixed(1)}s&r to reach dialogue! &c&l[AVERAGE]`);
                if (Config().sendbloodparty) {
                    ChatLib.command(`pc MeowAddons » Watcher took ${diftime.toFixed(1)}s to reach dialogue! [AVERAGE]`);
                }
//SLOW WATCHER
            } else if (diftime >= 25) {
                World.playSound("mob.cat.meow", 10, 1);
                Client.showTitle(`&c&lSlow Watcher`, `&cWatcher reached dialogue!`, 2, 45, 10);
                ChatLib.chat(`&dMeowAddons &8» &rWatcher took &e${diftime.toFixed(1)}s&r to reach dialogue! &c&l[SLOW]`);
                if (Config().sendbloodparty) {
                    ChatLib.command(`pc MeowAddons » Watcher took ${diftime.toFixed(1)}s to reach dialogue! [SLOW]`);
                }
            }
        }
//SPAWNED ALL MOBS
        if (ChatLib.getChatMessage(event).startsWith("[BOSS] The Watcher: That will be enough for now.")) {
            spawnalltime = ((Date.now() - starttime) / 1000).toFixed(1);
            Client.showTitle(`&c!`, `&cWatcher finished spawning mobs!`, 2, 45, 10);
            ChatLib.chat(`&dMeowAddons &8» &rWatcher took &e${spawnalltime}s&r to spawn all mobs!`);
            if (Config().sendbloodparty) {
                ChatLib.command(`pc MeowAddons » Watcher took ${spawnalltime}s to spawn all mobs!`);
            }
        }
//CAMP TIME
        if (ChatLib.getChatMessage(event).startsWith("[BOSS] The Watcher: You have proven yourself. You may pass.") && starttime != 0) {
            blooddone = true;
            camptime = ((Date.now() - starttime) / 1000).toFixed(1);
            ChatLib.chat(`&dMeowAddons &8» &rBlood camp took &e${camptime}s&r!`);
            if (Config().sendbloodparty) {
                ChatLib.command(`pc MeowAddons » Blood camp took ${camptime}s!`);
            }
        }
    });
//DEBUG
register("worldLoad", () => {
    Client.scheduleTask(150, () => {
        if (Config().debug) {
            const indungeondebug = InDungeon();
            ChatLib.chat(`&c&lMeowAddons-DEBUG &8» &rInDungeon: &c${indungeondebug}`);
        }
    });
});
