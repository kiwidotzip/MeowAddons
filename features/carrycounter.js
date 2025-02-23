import settings from "../config";
import { pogData } from "./utils/pogdata";

let prefix = `&e[MeowAddons]`;

class Carryee {
    constructor(name, total) {
        this.name = name;
        this.total = total;
        this.count = 0;
        this.lastBossTime = null;
        this.startTime = null;
        this.isFighting = false;
        this.bossID = null;
    }

    incrementTotal() {
        if (++this.count >= this.total) {
            this.complete();
            carryees = carryees.filter(carryee => carryee !== this);
        }
        ChatLib.command(`pc ${this.name}: ${this.count}/${this.total}`);
    }

    recordBossStartTime(bossID) {
        if (!this.startTime && !this.isFighting) {
            this.startTime = Date.now();
            this.isFighting = true;
            this.bossID = bossID;
        }
    }

    recordBossTime() {
        this.lastBossTime = Date.now();
    }

    getTimeSinceLastBoss() {
        if (!this.lastBossTime) return "N/A";
        return ((Date.now() - this.lastBossTime) / 1000).toFixed(1) + "s";
    }

    getTimeTakenToKillBoss() {
        if (!this.startTime) return "N/A";
        return ((Date.now() - this.startTime) / 1000).toFixed(1) + "s";
    }

    complete() {
        ChatLib.chat(`${prefix} &aCarries completed for &6${this.name}`);
        World.playSound("note.pling", 5, 2);
        Client.showTitle(
            `&aCarries Completed: &6${this.name}`,
            `&b${this.count}&f/&b${this.total}`,
            10, 100, 10
        );
    }

    toString() {
        return `&b${this.name}&f: ${this.count}&8/&f${this.total} &7(${this.getTimeSinceLastBoss()})`;
    }
}

let carryees = [];
const hudEditor = new Gui();

register(Java.type("net.minecraftforge.event.entity.EntityJoinWorldEvent"), (entity) => {
    Client.scheduleTask(1, () => {
        const name = ChatLib.removeFormatting(entity.entity.func_70005_c_());
        if (name.includes("Spawned by")) {
            const playerName = name.split("by: ")[1];
            const carryee = findCarryee(playerName);
            if (carryee) {
                const armorStandID = entity.entity.func_145782_y(); // Get Armor Stand ID
                const bossID = armorStandID - 3; // Get Boss ID
                carryee.recordBossStartTime(bossID);
            }
        }
    });
});

register("entityDeath", (entity) => {
    const bossID = entity.entity.func_145782_y();
    carryees.forEach((carryee) => {
        if (carryee.bossID === bossID) { 
            carryee.incrementTotal();
            carryee.recordBossTime();
            const timeTaken = carryee.getTimeTakenToKillBoss();
            ChatLib.chat(`${prefix} &fYou killed &6${carryee.name}&f's boss in &b${timeTaken}&f.`);
            carryee.isFighting = false;
            carryee.startTime = null;
            carryee.bossID = null; 
        }
    });
});

register("renderOverlay", () => {
    if (carryees.length === 0) return;

    const longestWidth = Math.max(...carryees.map(carryee => 
        Renderer.getStringWidth(carryee.toString())
    )) + 8;
    const totalHeight = carryees.length * 10 + 20;

    if (settings().drawCarryBox) {
        Renderer.drawRect(
            Renderer.color(...settings().carryBoxColor),
            pogData.CarryX,
            pogData.CarryY,
            longestWidth,
            totalHeight
        );
    }

    Renderer.drawString("&e[MA] &d&lCarries&f:", pogData.CarryX + 4, pogData.CarryY + 4);
    carryees.forEach((carryee, index) => {
        Renderer.drawString(
            carryee.toString(),
            pogData.CarryX + 4,
            pogData.CarryY + 16 + (index * 10)
        );
    });

    if (hudEditor.isOpen()) {
        Renderer.drawString(
            "&a&lDrag to move HUD",
            Renderer.screen.getWidth() / 2 - 45,
            Renderer.screen.getHeight() / 2 - 30,
            true
        );
    }
});

register("dragged", (dx, dy, x, y, button) => {
    if (hudEditor.isOpen() && button === 0) {
        pogData.CarryX = x;
        pogData.CarryY = y;
        pogData.save();
    }
});

register("command", (...args = []) => {
    const [subcommand, name, count] = args;
    switch (subcommand?.toLowerCase()) {
        case "add":
            if (!name || !count) return syntaxError("add <name> <count>");
            if (findCarryee(name)) return ChatLib.chat(`${prefix} &c${name} already exists!`);
            carryees.push(new Carryee(name, parseInt(count)));
            ChatLib.chat(`${prefix} &aAdded &6${name} &afor &6${count} &acarries`);
            break;
        case "set":
            if (!name || !count) return syntaxError("set <name> <count>");
            const carryee = findCarryee(name);
            if (!carryee) return ChatLib.chat(`${prefix} &c${name} not found!`);
            carryee.count = Math.max(0, parseInt(count));
            ChatLib.chat(`${prefix} &aSet &6${name}&a's count to &6${count}`);
            break;
        case "remove":
            if (!name) return syntaxError("remove <name>");
            carryees = carryees.filter(carryee => carryee.name !== name);
            ChatLib.chat(`${prefix} &aRemoved &6${name}`);
            break;
        case "list":
            if (carryees.length === 0) return ChatLib.chat(`${prefix} &cNo active carries!`);
            ChatLib.chat(`${prefix} &aActive carries (&6${carryees.length}&a):`);
            carryees.forEach((carryee, index) => 
                ChatLib.chat(` &7${index + 1}) &e${carryee.toString()}`)
            );
            break;
        case "gui":
            hudEditor.open();
            break;
        default:
            showHelp();
    }
}).setTabCompletions((args) => {
    const subcommand = args[0]?.toLowerCase();
    const currentArg = args[args.length - 1]?.toLowerCase();
    const playerNames = World.getAllPlayers()
    .filter(player => player.getUUID().version() === 4)
    .map(player => ChatLib.removeFormatting(player.getName()));
    
    if (subcommand === "add" || subcommand === "remove" || subcommand === "set") {
        if (args.length === 2) {
            return playerNames.filter(name => name.toLowerCase().startsWith(currentArg));
        }
    }
    if (args.length === 1) {
        return ["add", "remove", "set", "list", "gui"].filter(cmd => cmd.startsWith(currentArg));
    }
    return [];
}).setName("carry").setAliases(["macarry"]);

function findCarryee(name) {
    return carryees.find(carryee => carryee.name.toLowerCase() === name.toLowerCase());
}

function syntaxError(usage) {
    ChatLib.chat(`${prefix} &cUsage: /carry ${usage}`);
}

function showHelp() {
    ChatLib.chat(`${prefix} &aCarry Commands:`);
    ChatLib.chat("> &e/carry add &c<name> <count> &7- Add new carry");
    ChatLib.chat("> &e/carry set &c<name> <count> &7- Update carry count");
    ChatLib.chat("> &e/carry remove &c<name> &7- Remove carry");
    ChatLib.chat("> &e/carry list &7- Show active carries");
    ChatLib.chat("> &e/carry gui &7- Open HUD editor");
}

register("gameUnload", () => {
    if (carryees.length === 0) return;
    hudConfig.save();
    ChatLib.chat(`${prefix} &aPrinting &6${carryees.length} &aactive carries:`);
    carryees.forEach(carryee => {
        const progress = `&b${carryee.count}&f/&b${carryee.total}`;
        ChatLib.chat(`&e> &f${carryee.name}: ${progress}`);
    });
});