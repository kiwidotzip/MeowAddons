import settings from "../config";
import { registerWhen } from "../../BloomCore/utils/Utils";
let prefix = `&e[MeowAddons]`;

let timestarted = 0;
let bossID = null;

registerWhen(
    register(Java.type("net.minecraftforge.event.entity.EntityJoinWorldEvent"), (entity) => {
        Client.scheduleTask(1, () => {
            const name = ChatLib.removeFormatting(entity.entity.func_70005_c_());
            if (name.includes("Spawned by") && name.split("by: ")[1] === Player.getName()) {
                const armorStandID = entity.entity.func_145782_y(); // Get Armor Stand ID
                bossID = armorStandID - 3;
                timestarted = Date.now();
            }
        });
}), () => settings().slayerkilltimer);

registerWhen(
    register("entityDeath", (entity) => {
        const bossIDdeath = entity.entity.func_145782_y();
        if (bossIDdeath === bossID) { 
            const timeTaken = Date.now() - timestarted;
            ChatLib.chat(`${prefix} &fYou killed your boss in &b${(timeTaken / 1000).toFixed(2)}s&f.`);
            timestarted = 0;
            bossID = null;
        }
}), () => settings().slayerkilltimer);

register("chat", () => {
    if (timestarted !== 0) {
        if (settings().debug) { ChatLib.chat(`${prefix} &fDeath detected, resetting...`); }
        timestarted = 0;
        bossID = null;
    }
}).setCriteria(/SLAYER QUEST FAILED!/);