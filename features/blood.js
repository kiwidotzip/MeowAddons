import Config from "../config";
import { FeatManager } from "./helperfunction";
import { Data } from "./utils/data";

const Blood = FeatManager.createFeature("blood", "catacombs");
let bloodopen = false
let starttime = 0
var blooddone = false

register("worldLoad", () => {
    bloodopen = false;
    starttime = 0;
    blooddone = false;
});

function getWatcherRating(diftime) {
  if (diftime < 22) return { title: "Fast Watcher", extra: "[FAST]" };
  if (diftime < 25) return { title: "Average Watcher", extra: "[AVERAGE]" };
  return { title: "Slow Watcher", extra: "[SLOW]" };
}

Blood.register("chat", (message, event) => {
  const now = Date.now();

  const handlers = [
    {
      key: "[BOSS] The Watcher: Let's see how you can handle this.",
      action: () => {
        const diftime = (now - starttime) / 1000;
        const rating = getWatcherRating(diftime);
        World.playSound("mob.cat.meow", 10, 1);
        Client.showTitle(`&c&l${rating.title}`, `&cWatcher reached dialogue!`, 2, 45, 10);
        ChatLib.chat(`&dMeowAddons &8» &rWatcher took &e${diftime.toFixed(1)}s&r to reach dialogue! &c&l${rating.extra}`);
        if (Config().sendbloodparty) {
          ChatLib.command(`pc MeowAddons » Watcher took ${diftime.toFixed(1)}s to reach dialogue! ${rating.extra}`);
        }
      }
    },
    {
      key: "[BOSS] The Watcher: That will be enough for now.",
      action: () => {
        const spawnalltime = ((now - starttime) / 1000).toFixed(1);
        Client.showTitle(`&c!`, `&cWatcher finished spawning mobs!`, 2, 45, 10);
        ChatLib.chat(`&dMeowAddons &8» &rWatcher took &e${spawnalltime}s&r to spawn all mobs!`);
        if (Config().sendbloodparty) {
          ChatLib.command(`pc MeowAddons » Watcher took ${spawnalltime}s to spawn all mobs!`);
        }
      }
    },
    {
      key: "[BOSS] The Watcher: You have proven yourself. You may pass.",
      condition: () => starttime !== 0,
      action: () => {
        blooddone = true;
        const currentCampTime = (now - starttime) / 1000;
        const camptime = currentCampTime.toFixed(1);
        ChatLib.chat(`&dMeowAddons &8» &rBlood camp took &e${camptime}s&r!`);

        if (currentCampTime < Data.bloodCampPB) {
          Data.bloodCampPB = currentCampTime;
          Data.save();
          ChatLib.chat(`&dMeowAddons &8» &rNew PB: &e${Data.bloodCampPB.toFixed(1)}s&r!`);
        }

        if (Config().sendbloodparty) {
          ChatLib.command(`pc MeowAddons » Blood camp took ${camptime}s!`);
        }
      }
    },
    {
      key: "[BOSS] The Watcher:",
      condition: () => !bloodopen,
      action: () => {
        bloodopen = true;
        starttime = now;
      }
    }
  ];

  for (const handler of handlers) {
    if (message.startsWith(handler.key)) {
      if (handler.condition && !handler.condition()) continue;
      Client.scheduleTask(1, () => handler.action());
      break;
    }
  }
}, "${message}")