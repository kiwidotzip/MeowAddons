import Config from "../config";
import { FeatManager } from "./helperfunction";
import { Data } from "./utils/data";

const Blood = FeatManager.createFeature("blood", "catacombs");
let bloodopen = false;
let starttime = 0;
let blooddone = false;

function getWatcherRating(diftime) {
    if (diftime < 22) return { title: "Fast Watcher", extra: "[FAST]" };
    if (diftime < 25) return { title: "Average Watcher", extra: "[AVERAGE]" };
    return { title: "Slow Watcher", extra: "[SLOW]" };
}

Blood.register("chat", (message) => {
    const now = Date.now();
    if (message.startsWith("[BOSS] The Watcher:")) {
        if (!bloodopen) {
            bloodopen = true;
            starttime = now;
        }
        
        if (message === "[BOSS] The Watcher: Let's see how you can handle this.") {
            const diftime = (now - starttime) / 1000;
            const rating = getWatcherRating(diftime);
            World.playSound("mob.cat.meow", 10, 1);
            Client.showTitle(`&c&l${rating.title}`, `&cWatcher reached dialogue!`, 2, 45, 10);
            ChatLib.chat(`&e[MeowAddons] &rWatcher took &b${diftime.toFixed(1)}s&r to reach dialogue! &c&l${rating.extra}`);
            Config().sendbloodparty && ChatLib.command(`pc MeowAddons » Watcher took ${diftime.toFixed(1)}s to reach dialogue! ${rating.extra}`);
        }
        
        else if (message === "[BOSS] The Watcher: That will be enough for now.") {
            const spawnalltime = ((now - starttime) / 1000).toFixed(1);
            Client.showTitle(`&c!`, `&cWatcher finished spawning mobs!`, 2, 45, 10);
            ChatLib.chat(`&e[MeowAddons] &rWatcher took &b${spawnalltime}s&r to spawn all mobs!`);
            Config().sendbloodparty && ChatLib.command(`pc MeowAddons » Watcher took ${spawnalltime}s to spawn all mobs!`);
        }

        else if (message === "[BOSS] The Watcher: You have proven yourself. You may pass." && starttime !== 0) {
            blooddone = true;
            const currentCampTime = (now - starttime) / 1000;
            const camptime = currentCampTime.toFixed(1);
            ChatLib.chat(`&e[MeowAddons] &fBlood camp took &b${camptime}s&r!`);
            
            if (currentCampTime < Data.bloodCampPB) {
                Data.bloodCampPB = currentCampTime;
                Data.save();
                ChatLib.chat(`&e[MeowAddons] &fNew PB: &b${Data.bloodCampPB.toFixed(1)}s&r!`);
            }
            
            Config().sendbloodparty && ChatLib.command(`pc MeowAddons » Blood camp took ${camptime}s!`);
        }
    }
}, "${message}");