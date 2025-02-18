import settings from "../config";
import { registerWhen } from "../../BloomCore/utils/Utils";
let prefix = `&e[MeowAddons]`;

let startTime = null; 
let isFighting = false;

registerWhen(
    register("step", () => {
        const armorStands = World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityArmorStand"));
        const currentBossStands = new Set();
    
        armorStands.forEach(stand => {
            const name = ChatLib.removeFormatting(stand.getName());
            if (name.includes("Spawned by")) {
                currentBossStands.add(name);
                const playerName = name.split("by: ")[1];
    
                if (playerName.toLowerCase() === Player.getName().toLowerCase() && !isFighting) {
                    startTime = Date.now();
                    isFighting = true;
                }
            }
        });
    
        if (isFighting && currentBossStands.size === 0) {
            const timeTaken = (Date.now() - startTime) / 1000;
            ChatLib.chat(`${prefix} &fYou killed your boss in &b${timeTaken.toFixed(1)}s&f.`);
            isFighting = false; 
            startTime = null; 
        }
    }).setFps(30),
() => settings().slayerkilltimer
);