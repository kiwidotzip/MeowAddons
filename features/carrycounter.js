import settings from "../config";
import { pogData } from "./utils/pogdata";
import { registerWhen } from "../../BloomCore/utils/Utils";
import drawEntityBox from "./utils/renderhelper";

let prefix = `&e[MeowAddons]`;

class Carryee {
    constructor(name, total) {
        this.name = name;
        this.total = total;
        this.count = 0;
        this.lastBossTime = null;
        this.firstBossTime = null;
        this.startTime = null;
        this.isFighting = false;
        this.bossID = null;
    }

    incrementTotal() {
        if (++this.count >= this.total) {
            this.complete();
            carryees = carryees.filter(carryee => carryee !== this);
        }
        if (settings().debug) { ChatLib.chat(`${prefix} &fLogged 1 carry for &6${this.name} &7(${this.count}/${this.total})`); }
        if (settings().sendcarrycount) { sendPartyChatMessage(`pc ${this.name}: ${this.count}/${this.total}`); }
    }

    recordBossStartTime(bossID) {
        if (!this.startTime && !this.isFighting) {
            this.startTime = Date.now();
            this.isFighting = true;
            this.bossID = bossID;
        }
    }

    recordBossTime() {
        if (this.firstBossTime === null) {
            this.firstBossTime = Date.now();
        }
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

    getBossPerHour() {
        if (this.firstBossTime === null || this.count <= 2) {
            return "N/A";
        }
        const endTime = this.count >= this.total ? this.lastBossTime : Date.now();
        const durationMs = endTime - this.firstBossTime;
        if (durationMs <= 0) {
            return "N/A";
        }
        const hours = durationMs / 3600000;
        const bph = this.count / hours;
        return `${bph.toFixed(0)}/hr`;
    }

    getMoneyPerHour() {
        if (this.firstBossTime === null || this.count <= 2 || this.getBossPerHour() === "N/A") {
            return "N/A";
        }
        const bphx = parseFloat(this.getBossPerHour().replace("/hr", ""));
        const mph = bphx * 1.3
        return `${mph.toFixed(1)}M/hr`

    }

    complete() {
        ChatLib.chat(`${prefix} &fCarries completed for &b${this.name}`);
        if (settings().sendtrademsg) {
            Client.scheduleTask(20, () => {
                ChatLib.chat(
                    new Message(`${prefix} &fTrade with &b${this.name}&f? `)
                    .addTextComponent(
                        new TextComponent(`&a[Yes]`)
                        .setClick("run_command", `/trade ${this.name}`)
                        .setHoverValue(`&fClick to trade with &b${this.name}`)
                    )
                )
            })
        }
        World.playSound("note.pling", 5, 2);
        Client.showTitle(
            `&aCarries Completed: &6${this.name}`,
            `&b${this.count}&f/&b${this.total}`,
            10, 100, 10
        );
    }

    toString() {
        if (settings().bossph == 1) {
            return `&b${this.name}&f: ${this.count}&8/&f${this.total} &7(${this.getTimeSinceLastBoss()} | ${this.getBossPerHour()})`;
        } else if (settings().bossph == 2) {
            return `&b${this.name}&f: ${this.count}&8/&f${this.total} &7(${this.getTimeSinceLastBoss()} | ${this.getMoneyPerHour()})`
        } else {
            return `&b${this.name}&f: ${this.count}&8/&f${this.total} &7(${this.getTimeSinceLastBoss()})`;
        }
    }
}

let carryees = [];
const hudEditor = new Gui();
const processedEntities = new Set();

register("step", () => {
    const allEntities = World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityArmorStand"));
    allEntities.forEach(entity => {
        const id = entity.entity.func_145782_y();
        const name = ChatLib.removeFormatting(entity.entity.func_70005_c_());
        if (!processedEntities.has(id) && name.includes("Spawned by")) {
            processedEntities.add(id);
            const playerName = name.split("by: ")[1];
            const carryee = findCarryee(playerName);
            if (carryee) {
                const armorStandID = id;
                const bossID = armorStandID - 3;
                carryee.recordBossStartTime(bossID);
                if (settings().notifybossspawn) {
                     Client.showTitle(`&b${playerName}&f spawned their boss!`, "", 1, 20, 1);
                     World.playSound("mob.cat.meow", 5, 2)}
            }
        }
    });
}).setFps(10);

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

registerWhen(
    register("postRenderEntity", (entity, pos) => { 
        const entityName = entity.getName(); 
        const entityID = entity.entity.func_145782_y(); 
        const bossEntityNames = ["Wolf", "Spider", "Zombie", "Enderman"] 
        if (!bossEntityNames.includes(entityName)) return; 
        carryees.forEach((carryee) => { 
            if (carryee.bossID === entityID) { 
                drawEntityBox( 
                    pos.getX(), 
                    pos.getY(), 
                    pos.getZ(), 
                    entity.getWidth(), 
                    entity.getHeight(), 
                    0, 255, 255, 255, 2, false
                    ); 
            } 
        }); 
    }), () => settings().renderbossoutline
)

registerWhen(
    register("postRenderEntity", (entity, pos) => { 
        const entityName = entity.getName(); 
        const isPlayer = entity.entity instanceof net.minecraft.entity.player. EntityPlayer; 
        if (!isPlayer) return; 
        carryees.forEach((carryee) => { 
            if (carryee.name === entityName) { 
                drawEntityBox( 
                    pos.getX(), 
                    pos.getY(), 
                    pos.getZ(), 
                    entity.getWidth(), 
                    entity.getHeight(), 
                    0, 255, 255, 255, 2, false
                    ); 
            } 
        }); 
    }), () => settings().renderplayeroutline
)

register("chat", (deadPlayer) => {
    carryees.forEach((carryee) => {
        if (carryee.name === deadPlayer) {
            carryee.isFighting = false;
            carryee.startTime = null;
//            carryee.bossID = null;
            if (settings().debug) { ChatLib.chat(`${prefix} &c${carryee.name} died! Resetting their carry tracking.`); }
            ChatLib.chat(                
                new Message(
                `${prefix} &c${carryee.name} died! Count the carry? `,
                new TextComponent("&a[Yes]")
                    .setClick("run_command", `/carry confirmdeath ${carryee.name}`)
                    .setHoverValue("Click to count the carry"),
                ` &7| `,
                new TextComponent("&c[No]")
                    .setClick("run_command", `/carry canceldeath ${carryee.name}`)
                    .setHoverValue("Click to ignore")))
        }
    });
}).setCriteria(/^ ☠ (\w+) was killed by (?:.+)$/);

let lastTradePlayer = null;
let lastTradeTime = 0;

register("chat", (lastplayer) => {
        lastTradePlayer = lastplayer;
        lastTradeTime = Date.now();
        if (settings().debug) ChatLib.chat(`${prefix} &fDetected trade with &6${lastTradePlayer}`);
}).setCriteria(/^Trade completed with (?:\[.*?\] )?(\w+)!$/);

register("chat", (totalCoins) => {
    Client.scheduleTask(1, () => {
        if (lastTradePlayer && Date.now() - lastTradeTime < 1000) {
            const carryValue = settings().carryvalue;
            const adjustedcarries = totalCoins / carryValue;
            if (Math.abs(adjustedcarries - Math.round(adjustedcarries)) > 1e-6) {
                lastTradePlayer = null;
                lastTradeTime = 0;
                return;
            }
            
            const integerCarries = Math.round(adjustedcarries);
            const carryee = findCarryee(lastTradePlayer);
            
            if (!carryee) {                
                ChatLib.chat(                    
                new Message(`${prefix}&f Add &b${lastTradePlayer}&f for &b${integerCarries}&f carries? `)
                .addTextComponent(
                    new TextComponent("&a[Yes]")
                        .setClick("run_command", `/carry add ${lastTradePlayer} ${integerCarries}`)
                        .setHoverValue("Click to add player")
                )
                .addTextComponent(" &7| ")
                .addTextComponent(
                    new TextComponent("&c[No]")
                        .setHoverValue("Click to ignore")
                )
            );
            }
            lastTradePlayer = null;
            lastTradeTime = 0;
        }
    });
}).setCriteria(/^ \+ (\d+\.?\d*)M coins$/);

const GuiInventory = Java.type("net.minecraft.client.gui.inventory.GuiInventory");
let isInInventory = false;

register("guiOpened", (event) => {
    if (event.gui instanceof GuiInventory) { isInInventory = true; }
});

register("guiClosed", (gui) => {
    if (gui instanceof GuiInventory) { isInInventory = false; }
});

register("renderOverlay", () => {
    if (isInInventory) return;

    const longestWidth = Math.max(...carryees.map(carryee => 
        Renderer.getStringWidth(carryee.toString())
    )) + 8;
    const totalHeight = carryees.length * 10 + 20;

    if (settings().drawcarrybox && carryees.length > 0) {
        Renderer.drawRect(
            Renderer.color(...settings().carryboxcolor),
            pogData.CarryX,
            pogData.CarryY,
            longestWidth,
            totalHeight
        );
    }
    if (!hudEditor.isOpen() && carryees.length > 0) {
        Renderer.drawString("&e[MA] &d&lCarries&f:", pogData.CarryX + 4, pogData.CarryY + 4);
        carryees.forEach((carryee, index) => {
            Renderer.drawString(
                carryee.toString(),
                pogData.CarryX + 4,
                pogData.CarryY + 16 + (index * 10)
            );
        });
    }

    if (hudEditor.isOpen()) {
        Renderer.drawString(
            "&a&lDrag to move HUD",
            Renderer.screen.getWidth() / 2 - 45,
            Renderer.screen.getHeight() / 2 - 30,
            true
        );
        Renderer.drawString(
            "&e[MA] &d&lCarries&f:",
            pogData.CarryX + 4,
            pogData.CarryY + 4
        );
        Renderer.drawString("&blyfrieren&f: 23&8/&f1984 &7(N/A)",
            pogData.CarryX + 4,
            pogData.CarryY + 16
        );
        Renderer.drawString("&bsascha&f: 23&8/&f1984 &7(N/A)",
            pogData.CarryX + 4,
            pogData.CarryY + 26
        );
    };
});

register("guiRender", () => {
    if (isInInventory && carryees.length > 0) {
        Renderer.drawString("&e[MA] &d&lCarries&f:", pogData.CarryX + 4, pogData.CarryY + 4);
        carryees.forEach((carryee, index) => {
            Renderer.drawString(
                carryee.toString(),
                pogData.CarryX + 4,
                pogData.CarryY + 16 + (index * 10)
            );
        });
        carryees.forEach((carryee, index) => {
            const pixelwidth = Renderer.getStringWidth(carryee.toString());
            Renderer.drawString(
                "&7|&a [+] &7|&c [-] &7|&4 [×]",
                pogData.CarryX + pixelwidth + 6,
                pogData.CarryY + 16 + (index * 10)
            );
        });
    }
});

register("guiMouseclick", (mouseX, mouseY, mouseButton) => {
    if (mouseButton !== 0 || !isInInventory) return;
    
    const hudX = pogData.CarryX;
    const hudY = pogData.CarryY;
    
    carryees.forEach((carryee, index) => {
        const entryY = hudY + 16 + (index * 10);
        const mainTextWidth = Renderer.getStringWidth(carryee.toString());
        const buttonBaseX = hudX + 4 + mainTextWidth + 6;
        
        // [+] Button
        const plusButtonText = " [+] ";
        const plusWidth = Renderer.getStringWidth(plusButtonText);
        const plusArea = {
            x1: buttonBaseX,
            y1: entryY,
            x2: buttonBaseX + plusWidth,
            y2: entryY + 8
        };
        
        // [-] Button
        const minusButtonText = " [-] ";
        const minusWidth = Renderer.getStringWidth(minusButtonText);
        const minusArea = {
            x1: plusArea.x2,
            y1: entryY,
            x2: plusArea.x2 + minusWidth,
            y2: entryY + 8
        };
        
        // [×] Button
        const removeButtonText = "[×]";
        const removeWidth = Renderer.getStringWidth(removeButtonText);
        const removeArea = {
            x1: minusArea.x2,
            y1: entryY,
            x2: minusArea.x2 + removeWidth,
            y2: entryY + 8
        };
        
        // Check clicks
        if (isInArea(mouseX, mouseY, plusArea)) {
            carryee.count = Math.min(carryee.total, carryee.count + 1);
            ChatLib.chat(`${prefix} &aIncreased &6${carryee.name}&a's count to &6${carryee.count}`);
        } else if (isInArea(mouseX, mouseY, minusArea)) {
            carryee.count = Math.max(0, carryee.count - 1);
            ChatLib.chat(`${prefix} &aDecreased &6${carryee.name}&a's count to &6${carryee.count}`);
        } else if (isInArea(mouseX, mouseY, removeArea)) {
            carryees = carryees.filter(c => c !== carryee);
            ChatLib.chat(`${prefix} &aRemoved &6${carryee.name}`);
        }
    });
});

function isInArea(x, y, area) {
    return x >= area.x1 && x <= area.x2 && y >= area.y1 && y <= area.y2;
}

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
            carryees.forEach((carryee, index) => {
                const message = new Message()
                    .addTextComponent(
                        new TextComponent(`&7> &e${carryee.name}: &b${carryee.count}/${carryee.total} &7| `)
                    )
                    .addTextComponent(
                        new TextComponent("&a[+]")
                            .setClick("run_command", `/carry increase ${carryee.name}`)
                            .setHoverValue("&7Click to increase count")
                    )
                    .addTextComponent(" &7| ")
                    .addTextComponent(
                        new TextComponent("&c[-]")
                            .setClick("run_command", `/carry decrease ${carryee.name}`)
                            .setHoverValue("&7Click to decrease count")
                       )
                    .addTextComponent(" &7| ")
                    .addTextComponent(
                        new TextComponent("&4[×]")
                            .setClick("run_command", `/carry remove ${carryee.name}`)
                            .setHoverValue("&7Click to remove player")
                    );
                ChatLib.chat(message);
            });
            break;
        case "increase":
            if (!name) return syntaxError("increase <name>");
            const carryeeInc = findCarryee(name);
            if (!carryeeInc) return ChatLib.chat(`${prefix} &c${name} not found!`);
            carryeeInc.count = Math.min(carryeeInc.total, carryeeInc.count + 1);
            ChatLib.chat(`${prefix} &aIncreased &6${name}&a's count to &6${carryeeInc.count}`);
            break;
        case "decrease":
            if (!name) return syntaxError("decrease <name>");
            const carryeeDec = findCarryee(name);
            if (!carryeeDec) return ChatLib.chat(`${prefix} &c${name} not found!`);
            carryeeDec.count = Math.max(0, carryeeDec.count - 1);
            ChatLib.chat(`${prefix} &aDecreased &6${name}&a's count to &6${carryeeDec.count}`);
            break;
        case "gui":
            hudEditor.open();
            break;
        case "confirmdeath":
            if (!name) return syntaxError("confirmdeath <name>");
            const carryeeConfirm = findCarryee(name);
            if (!carryeeConfirm) return ChatLib.chat(`${prefix} &c${name} not found!`);
            carryeeConfirm.incrementTotal();
            carryeeConfirm.recordBossTime();
            ChatLib.chat(`${prefix} &aCount incremented for &6${name}`);
            break;
        case "canceldeath":
            if (!name) return syntaxError("canceldeath <name>");
            const carryeeCancel = findCarryee(name);
            if (!carryeeCancel) return ChatLib.chat(`${prefix} &c${name} not found!`);
            ChatLib.chat(`${prefix} &7Ignored death for &6${name}`);
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
        return ["add", "remove", "set", "list", "gui", "increase", "decrease"].filter(cmd => cmd.startsWith(currentArg));
    }

    return [];
}).setName("carry").setAliases(["macarry"]);

let lastPartyChatMessageTime = 0;

function sendPartyChatMessage(msg) {
    const delay = 1000 - (Date.now() - lastPartyChatMessageTime);
    if (delay <= 0) {
      ChatLib.command(msg);
      lastPartyChatMessageTime = Date.now();
    } else {
      Client.scheduleTask(Math.ceil(delay / 50), () => {
        ChatLib.command(msg);
        lastPartyChatMessageTime = Date.now();
      });
    }
}  

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
    ChatLib.chat("> &e/carry increase &c<name> &7- Increase carry count");
    ChatLib.chat("> &e/carry decrease &c<name> &7- Decrease carry count");
    ChatLib.chat("> &e/carry list &7- Show active carries");
    ChatLib.chat("> &e/carry gui &7- Open HUD editor");
}

register("gameUnload", () => {
    if (carryees.length === 0) return;
    ChatLib.chat(`${prefix} &aPrinting &6${carryees.length} &aactive carries:`);
    carryees.forEach(carryee => {
        const progress = `&b${carryee.count}&f/&b${carryee.total}`;
        ChatLib.chat(`&e> &f${carryee.name}: ${progress}`);
    });
});