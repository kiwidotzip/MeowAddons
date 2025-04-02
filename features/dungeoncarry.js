import settings from "../config";
let carryees = [];
let nextAvailableTime = 0;
const prefix = "&e[MeowAddons]";

// Carry Class

class Carryee {
    constructor(name, total) {
        this.name = name;
        this.total = total;
        this.count = 0;
        this.indungeon = false;
    }
    incrementTotal() {
        if (++this.count >= this.total) {
            this.complete();
            carryees = carryees.filter(carryee => carryee !== this);
        }
        if (settings().debug) { ChatLib.chat(`${prefix} &fLogged 1 carry for &6${this.name} &7(${this.count}/${this.total})`); }
        if (settings().senddgcarrycount) { sendPartyChatMessage(`pc ${this.name}: ${this.count}/${this.total}`); }
    }
    complete() {
        ChatLib.chat(`${prefix} &fCarries completed for &b${this.name}`);
        World.playSound("note.pling", 5, 2);
        Client.showTitle(
            `&aCarries Completed: &6${this.name}`,
            `&b${this.count}&f/&b${this.total}`,
            10, 100, 10
        );
    }
    toString() {
        return `&b${this.name}&f: ${this.count}&8/&f${this.total}`;
    }
}

// Start detection

register("chat", () => {
    Client.scheduleTask(20, () => {
        const tabList = TabList.getNames();
        carryees.forEach((carryee) => {
            for (const line of tabList) {
                line = ChatLib.removeFormatting(line);
                if (line.includes(carryee.name)) {
                    carryee.indungeon = true
                }
            }
        })
    })
}).setCriteria(/Starting in 1 second\./)

// End detection

register("chat", () => {
    carryees.forEach((carryee) => {
        if (!carryee.indungeon) return;
        carryee.indungeon = false;
        carryee.incrementTotal();
    })
}).setCriteria(/       ☠ Defeated (?:.+) in (?:.+) ?(?:\(NEW RECORD!\))?/)

// WorldLoad detection

register("worldLoad", () => {
    carryees.forEach((carryee) => {
        if (carryee.indungeon) carryee.indungeon = false;
    })
})

// Commands

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
            carryee.reset();
            ChatLib.chat(`${prefix} &aSet &6${name}&a's count to &6${count}`);
            break;
        case "settotal": 
            if (!name || !count) return syntaxError("settotal <name> <total>");
            const carryeeSetTotal = findCarryee(name);
            if (!carryeeSetTotal) return ChatLib.chat(`${prefix} &c${name} not found!`);
            const newSetTotal = parseInt(count);
            if (newSetTotal < carryeeSetTotal.count) {
                ChatLib.chat(`${prefix} &cNew total cannot be less than current count (${carryeeSetTotal.count})!`);
                return;
            }
            carryeeSetTotal.total = newSetTotal;
            ChatLib.chat(`${prefix} &fSet &6${name}&f's total to &6${newSetTotal}`);
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
            carryeeInc.reset()
            ChatLib.chat(`${prefix} &aIncreased &6${name}&a's count to &6${carryeeInc.count}`);
            break;
        case "decrease":
            if (!name) return syntaxError("decrease <name>");
            const carryeeDec = findCarryee(name);
            if (!carryeeDec) return ChatLib.chat(`${prefix} &c${name} not found!`);
            carryeeDec.count = Math.max(0, carryeeDec.count - 1);
            carryeeDec.reset()
            ChatLib.chat(`${prefix} &aDecreased &6${name}&a's count to &6${carryeeDec.count}`);
            break;
  
        case "clear":
            const message = carryees.length ? `${prefix} &aCleared all active carries.` : `${prefix} &cNo active carries to clear.`;
            carryees = [];
            ChatLib.chat(message);
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
        return ["add", "remove", "set", "list", "increase", "decrease"].filter(cmd => cmd.startsWith(currentArg));
    }

    return [];
}).setName("dgcarry").setAliases(["madgcarry"]);

// Functions

const sendPartyChatMessage = msg => {
    const now = Date.now();
    nextAvailableTime = Math.max(now, nextAvailableTime);
    const delay = nextAvailableTime - now;
    Client.scheduleTask(Math.ceil(delay / 50), () => ChatLib.command(msg));
    nextAvailableTime += 1000;
};

function findCarryee(name) {
    return carryees.find(carryee => carryee.name.toLowerCase() === name.toLowerCase());
}

function syntaxError(usage) {
    ChatLib.chat(`${prefix} &cUsage: /carry ${usage}`);
}

function showHelp() {
    ChatLib.chat(`${prefix} &aCarry Commands:`);
    ChatLib.chat("> &e/dgcarry add &c<name> <count> &7- Add new carry");
    ChatLib.chat("> &e/dgcarry set &c<name> <count> &7- Update carry count");
    ChatLib.chat("> &e/dgcarry settotal &c<name> <total> &7- Update carry total")
    ChatLib.chat("> &e/dgcarry remove &c<name> &7- Remove carry");
    ChatLib.chat("> &e/dgcarry list &7- Show active carries");
    ChatLib.chat("> &e/dgcarry clear &7- Clears all active carries")
    ChatLib.chat("> &e/carry gui &7- Open HUD editor");
}