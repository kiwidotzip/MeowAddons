import settings from "../config";
import { Render2D } from "../../tska/rendering/Render2D";
import { Render3D } from "../../tska/rendering/Render3D";
import { SendMsg } from "./helperfunction";
import { LocalStore } from "../../tska/storage/LocalStore";
import { FeatManager, hud } from "./helperfunction";
import { scheduleTask } from "../../tska/shared/ServerTick";

let prefix = `&e[MeowAddons]`;
let carryees = [];
let dungeonCarryees = [];
let lastTradePlayer = null;
let lastTradeTime = 0;
let isInInventory = true;
let nextAvailableTime = 0;

const BossChecker = FeatManager.createFeatureNo();
const renderGuiNOTINV = FeatManager.createFeatureNo();
const renderGuiINV = FeatManager.createFeatureNo();
const TickTimer = FeatManager.createFeatureNo();
const BossOutline = FeatManager.createFeature("renderbossoutline");
const PlayerOutline = FeatManager.createFeature("renderplayeroutline");

const Dungeon = FeatManager.createFeatureNo("catacombs")

const GUI = hud.createTextHud("Carry counter", 120, 10, "a\nlyfrieren: 23/1984 (N/A | N/A)\nsascha: 23/1984 (N/A | N/A)");

const GuiInventory = Java.type("net.minecraft.client.gui.inventory.GuiInventory");
const webhookUrl = settings().webhookurlcarry
const carryCache = new Map()
const ProccessedSp = new Set()
const DateMEOW = new Date()
const bossnames = ["Voidgloom Seraph", "Revenant Horror", "Tarantula Broodfather", "Sven Packmaster"]
const modcmd = ["add","remove","set","settotal"]
const allcmd = ["add","remove","set","settotal","list","gui","increase","decrease","clear","confirmdeath","canceldeath","logs","clearlogs"]
const CarryLog = new LocalStore("MeowAddons",{
    data: []
}, "./data/carrylog.json")
const CarryProfit = new LocalStore("MeowAddons", {
    date: 0,
    profit: 0
}, "./data/carryprofit.json")
const colors = {
    sep: [128, 128, 128, 255],
    plus: [[0, 255, 0, 255], [0, 128, 0, 255]],
    minus: [[255, 0, 0, 255], [128, 0, 0, 255]],
    remove: [[255, 69, 0, 255], [139, 0, 0, 255]]
}
const tooltips = {
    plusArea: ["&bIncrease", "&cLeft click: Count | Right click: Total"],
    minusArea: ["&bDecrease", "&cLeft click: Count | Right click: Total"],
    removeArea: ["&bRemove Player", "&cClick to remove from carry list"]
}
const UpdateCarryee = () => {
    BossChecker.update()
    BossOutline.update()
    PlayerOutline.update()

}

//////////////////
///// SLAYER /////
//////////////////

class Carryee {
    constructor(name, total, initial = 0) {
        this.name = name;
        this.total = total;
        this.count = initial;
        this.lastBossTime = null;
        this.firstBossTime = null;
        this.startTime = null;
        this.isFighting = false;
        this.bossID = null;
        this.timerID = null;
        this.bossTicks = 0;
        this.sessionStartTime = Date.now();
        this.totalCarryTime = 0; 
    }

    incrementTotal() {
        if (++this.count >= this.total) {
            this.complete();
            carryees = carryees.filter(carryee => carryee !== this);
        }
        if (settings().sendcarrycount) sendP(`pc ${this.name}: ${this.count}/${this.total}`);
        sendcarrymsg(`${this.name}: ${this.count}/${this.total}`);
        UpdateCarryee();
    }

    recordBossStartTime(bossID) {
        if (!this.startTime && !this.isFighting) {
            this.startTime = Date.now();
            this.isFighting = true;
            this.bossTicks = 0;
            this.bossID = bossID;
            this.timerID = bossID + 2;
            TickTimer.update();
        }
    }
    endSession() {
        if (this.firstBossTime) {
            const sessionTime = (this.lastBossTime || Date.now()) - this.firstBossTime;
            this.totalCarryTime += sessionTime;
        }
        this.firstBossTime = null;
        this.sessionStartTime = null;
    }
    recordBossTime() {
        if (this.firstBossTime === null) this.firstBossTime = Date.now();
        this.lastBossTime = Date.now();
    }

    getTimeSinceLastBoss() {
        return this.lastBossTime ? `${((Date.now() - this.lastBossTime) / 1000).toFixed(1)}s` : "N/A";
    }

    getTimeTakenToKillBoss() {
        return this.startTime ? `${((Date.now() - this.startTime) / 1000).toFixed(1)}s` : "N/A";
    }

    getBossPerHour() {
        if (this.count <= 2) return "N/A"
        let totalTime = this.totalCarryTime + (this.firstBossTime ? Date.now() - this.firstBossTime : 0)
        return totalTime > 0 ? `${(this.count/(totalTime/36e5)).toFixed(0)}/hr` : "N/A"
    }
    
    getMoneyPerHour() {
        const bph = this.getBossPerHour()
        return bph === "N/A" ? "N/A" : `${(parseFloat(bph)*(parseFloat(settings().carryvalue.split(",")[0])||1.3)).toFixed(1)}M/hr`
    }

    reset() {
        this.isFighting = false;
        this.startTime = null;
        this.bossID = null;
        this.timerID = null;
        this.bossTicks = 0;
    }

    complete() {
        ChatLib.chat(`${prefix} &fCarries completed for &b${this.name}`);
        if (settings().sendtrademsg) 
            Client.scheduleTask(20, () => ChatLib.chat(new TextComponent(`${prefix} &fClick to trade with &b${this.name}&f.`).setClick("run_command", `/trade ${this.name}`)))
        World.playSound("note.pling", 5, 2);
        Render2D.showTitle(`&aCarries Completed: &6${this.name}`, `&b${this.count}&f/&b${this.total}`, 3000)
        cacheCarryee(this)
        this.endSession()
    }

    toString() {
        let stat = this.getTimeSinceLastBoss()
        settings().bossph === 1 ? stat += ` | ${this.getBossPerHour()}` : settings().bossph === 2 ? stat += ` | ${this.getMoneyPerHour()}` : ``
        return `&b${this.name}&f: ${this.count}&8/&f${this.total} &7(${stat})`
    }
}

////////////////////
///// DUNGEON //////
////////////////////

class DungeonCarryee {
    constructor(name, total) {
        this.name = name;
        this.total = total;
        this.count = 0;
        this.indungeon = false;
    }

    incrementTotal() {
        if (++this.count >= this.total) {
            this.complete();
            dungeonCarryees = dungeonCarryees.filter(c => c !== this);
        }
        if (settings().senddgcarrycount) sendP(`pc ${this.name}: ${this.count}/${this.total}`);
    }

    complete() {
        ChatLib.chat(`${prefix} &fDungeon carries completed for &b${this.name}`);
        World.playSound("note.pling", 5, 2);
        Render2D.showTitle(`&aCarries Completed: &6${this.name}`, `&b${this.count}&f/&b${this.total}`, 3000);
    }

    toString() {
        return `&b${this.name}&f: ${this.count}&8/&f${this.total}`;
    }
}

// Dungeon start detection

Dungeon
    .registersub("chat", () => {
        Client.scheduleTask(20, () => {
            const tabList = TabList.getNames()
            dungeonCarryees.forEach(c => c.indungeon = tabList.some(l=> l.removeFormatting().includes(c.name)))
        })
    }, () => dungeonCarryees.length > 0, /Starting in 1 second\./)
    .registersub("chat", () => {
        dungeonCarryees.forEach(c => {
            if (!c.indungeon) return
            c.indungeon = false
            Client.scheduleTask(20, () => c.incrementTotal())
        })
    }, /^\s*☠ Defeated (?:.+) in 0?(?:[\dhms ]+?)\s*(?:\(NEW RECORD!\))?$/i)
    .onRegister(() => dungeonCarryees.forEach(c => c.indungeon = false))
    .onUnregister(() => dungeonCarryees.forEach(c => c.indungeon = false))

// Nametag detection

BossChecker
    .registersub("ma:entityJoin", (ent, entID, evn) => {
        scheduleTask(() => {
            const name = ent.func_70005_c_()?.removeFormatting()
            if (!(ent instanceof net.minecraft.entity.item.EntityArmorStand) || !name?.includes("Spawned by") || ProccessedSp.has(entID)) return
            ProccessedSp.add(entID)
            const carryee = findCarryee(name.split("by: ")[1])
            if (!carryee) return
            carryee.recordBossStartTime(entID - 3)
            World.playSound("mob.cat.meow", 5, 2)
            settings().notifybossspawn && Render2D.showTitle(`&b${name.split("by: ")[1]}&f spawned their boss!`, null, 1000)
        }, 2)
    }, () => carryees.length > 0)
    .registersub("entityDeath", (entity) => {
        const bossID = entity.entity.func_145782_y()
        carryees.forEach((carryee) => {
            if (carryee.bossID === bossID) { 
                carryee.recordBossTime()
                carryee.incrementTotal()
                const time = carryee.getTimeTakenToKillBoss()
                ChatLib.chat(new Message(`${prefix} &fYou killed &6${carryee.name}&f's boss in &b${time}&7 | `)
                                .addTextComponent(new TextComponent(`&b${carryee.bossTicks / 20}s.`)
                                .setHoverValue(`&c${carryee.bossTicks} ticks - May not be 100% accurate`)))
                carryee.reset()
                TickTimer.update()
            }
        })
    }, () => carryees.length > 0)
    .registersub("chat", (deadPlayer, entityName) => {
        if (!bossnames.includes(entityName)) return
        carryees.forEach((carryee) => {
            if (carryee.name === deadPlayer) {
                carryee.reset()
                ChatLib.chat(new Message(`${prefix} &c${carryee.name} died! Count the carry? `,
                    new TextComponent("&a[Yes]")
                        .setClick("run_command", `/carry confirmdeath ${carryee.name}`)
                        .setHoverValue("Click to count the carry"),
                    ` &7| `,
                    new TextComponent("&c[No]")
                        .setClick("run_command", `/carry canceldeath ${carryee.name}`)
                        .setHoverValue("Click to ignore"))
                )
            }
        })
    }, () => carryees.length > 0, /^ ☠ (\w+) was killed by (.+).$/)


// Tick timer

TickTimer
    .registersub("servertick", () => {
        carryees.forEach(carryee => carryee.isFighting && carryee.bossTicks++)
    }, () => carryees.some(carryee => carryee.isFighting))

// Boss check

register("step", () => {
    carryees.forEach(carryee => {
        if (!carryee.bossID) return
        const entity = World.getWorld()?.func_73045_a(carryee.bossID)
        if (!entity || entity?.field_70128_L) carryee.reset()
    })
}).setDelay(20)

BossOutline
    .registersub("ma:postRenderEntity", (entity, pos) => { 
        const entityID = entity.entity.func_145782_y()
        carryees.forEach((carryee) => {
            if (carryee.bossID !== entityID) return
            let color = [0, 255, 255]
            const timer = World.getWorld()?.func_73045_a(carryee.timerID)?.func_70005_c_()?.removeFormatting()
            const timeMatch = timer?.match(/^(\d+):([0-5]\d)$/)
            if (timeMatch && (parseInt(timeMatch[1], 10) * 60 + parseInt(timeMatch[2], 10)) < 205) color = [255, 127, 127]
            Render3D.renderEntityBox(
                pos.getX(),
                pos.getY(),
                pos.getZ(),
                entity.getWidth(),
                entity.getHeight(),
                color[0], color[1], color[2], 255, 2, false, false
            )
        })
    }, () => carryees.length > 0, [net.minecraft.entity.monster.EntityEnderman, net.minecraft.entity.passive.EntityWolf, net.minecraft.entity.monster.EntitySpider, net.minecraft.entity.monster.EntityZombie, net.minecraft.entity.monster.EntityBlaze]);

// Player highlight

PlayerOutline
    .registersub("postRenderEntity", (entity, pos) => { 
        carryees.forEach((carryee) => { 
            if (carryee.name === entity.getName()) { 
                Render3D.renderEntityBox(
                    pos.getX(),
                    pos.getY(),
                    pos.getZ(),
                    entity.getWidth(),
                    entity.getHeight(),
                    0, 255, 255, 255, 2, false, false
                );
            } 
        }); 
    }, () => carryees.length > 0, net.minecraft.entity.player.EntityPlayer)

// Cache management

function cacheCarryee(carryee) {
    carryee.endSession()
    carryCache.set(carryee.name.toLowerCase(), {
        total: carryee.total,
        count: carryee.count,
        totalCarryTime: carryee.totalCarryTime,
        timestamp: Date.now()
    })
    
    const date = new Date()
    const logEntry = {
        "Total carries done": carryee.count,
        "Date": `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
        "Time": `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`,
        "lastKnownCount": carryee.count,
        "totalCarryTime": carryee.totalCarryTime
    }
    
    for (let i = 0; i < CarryLog.data.length; i += 2)
        if (CarryLog.data[i] === carryee.name) {
            const existing = CarryLog.data[i + 1]
            logEntry["Total carries done"] = existing["Total carries done"] + (carryee.count - existing.lastKnownCount)
            CarryLog.data[i + 1] = logEntry
            return
        }
    
    CarryLog.data.push(carryee.name, logEntry)
}

// Clear cache

register("step", () => {
    for (const [name, record] of carryCache.entries()) carryCache.delete(name)
}).setDelay(300)

// Trade detection

register("chat", (lastplayer) => {
    lastTradePlayer = lastplayer;
    lastTradeTime = Date.now();
}).setCriteria(/^Trade completed with (?:\[.*?\] )?(\w+)!$/);

function resetTrade() {
    lastTradePlayer = null;
    lastTradeTime = 0;
}

const handleTradeCoins = (totalCoins, isAdding) => Client.scheduleTask(1, () => {
    if (!lastTradePlayer || Date.now() - lastTradeTime >= 1000) return
    const coins = parseFloat(totalCoins)
    CarryProfit.profit += isAdding ? coins : -coins
    
    const values = settings().carryvalue.split(',').map(parseFloat).filter(v => !isNaN(v))
    if (!values.length) return resetTrade()
    
    const carry = values.find(v => Math.abs(coins/v - Math.round(coins/v)) < 1e-6)
    if (!carry) return resetTrade()
    const carries = Math.round(coins/carry)
    
    const carryee = findCarryee(lastTradePlayer)
    if ((isAdding && !carryee) || (!isAdding && carryee)) {
        const action = isAdding ? `/carry add ${lastTradePlayer} ${carries}` : `/carry remove ${lastTradePlayer}`;
        const text = isAdding ? `Add &b${lastTradePlayer}&f for &b${carries}&f carries?` : `Remove &b${lastTradePlayer}&f?`;
        ChatLib.chat(new Message(`${prefix}&f ${text} `)
        .addTextComponent(new TextComponent("&a[Yes]").setClick("run_command", action).setHoverValue(`Click to ${isAdding ? 'add' : 'remove'} player`))
        .addTextComponent(" &7| ")
        .addTextComponent(new TextComponent("&c[No]").setHoverValue("Click to ignore")))
    }
    resetTrade()
})

register("chat", (totalCoins) => {
    handleTradeCoins(totalCoins, true);
}).setCriteria(/^ \+ (\d+\.?\d*)M coins$/);

register("chat", (totalCoins) => {
    handleTradeCoins(totalCoins, false);
}).setCriteria(/^ \- (\d+\.?\d*)M coins$/);

// Carry profit

register("gameLoad", () => {
    if (!CarryProfit.date || CarryProfit.date !== DateMEOW.getDate()) {
        CarryProfit.date = DateMEOW.getDate()
        CarryProfit.profit = 0
    }
})

// GUI stuff

register("guiOpened", e => e.gui instanceof GuiInventory && (isInInventory = true, renderGuiNOTINV.update(), renderGuiINV.update()));
register("guiClosed", () => (isInInventory = false, renderGuiNOTINV.update(), renderGuiINV.update()));

const getInventoryState = () => isInInventory
const getAllCarryees = () => [...carryees, ...dungeonCarryees]

renderGuiNOTINV
    .registersub("renderOverlay", () => {
        const allCarryees = getAllCarryees()
        if (allCarryees.length === 0) return
        
        const longestWidth = Math.max(...allCarryees.map(c => Renderer.getStringWidth(c.toString()))) + 8
        const x = GUI.getX()
        const y = GUI.getY()
        
        if (settings().drawcarrybox) 
            Renderer.drawRect(Renderer.color(...settings().carryboxcolor), x, y, longestWidth, allCarryees.length * 10 + 20)
        
        if (!hud.isOpen()) {
            Renderer.drawString("&e[MA] &d&lCarries&f:", x, y)
            allCarryees.forEach((c, i) => Renderer.drawString(c.toString(), x, y + 12 + i * 10))
        }
    }, () => !getInventoryState())

GUI.onDraw(() => {
    Renderer.translate(GUI.getX(), GUI.getY());
    Renderer.scale(GUI.getScale());
    Renderer.drawString("&e[MA] &d&lCarries: \n&blyfrieren&f: 23&7/&f1984 &7(N/A | N/A)\n&bsascha&f: 23&7/&f1984 &7(N/A | N/A)\n&4&lTHIS WILL IGNORE THE SCALE", 0, 0);
})

renderGuiINV
    .registersub("guiRender", () => {
        const allCarryees = getAllCarryees()
        if (allCarryees.length === 0) return
        
        const [hudX, hudY] = [GUI.getX(), GUI.getY()]
        const [mouseX, mouseY] = [Client.getMouseX(), Client.getMouseY()]
        Renderer.drawString("&e[MA] &d&lCarries&f:", hudX, hudY)
        
        allCarryees.forEach((carryee, i) => {
            const yPos = hudY + 12 + i * 10
            const textWidth = Renderer.getStringWidth(carryee.toString())
            const areas = getButtonAreas(hudX, hudY, carryee, i)
            Renderer.drawString(carryee.toString(), hudX, yPos)
            
            let x = hudX + textWidth + 6
            const buttons = [
                { text: "|", color: colors.sep },
                { text: " [+] ", color: colors.plus[isInArea(mouseX, mouseY, areas.plusArea) ? 1 : 0] },
                { text: "|", color: colors.sep },
                { text: " [-] ", color: colors.minus[isInArea(mouseX, mouseY, areas.minusArea) ? 1 : 0] },
                { text: "|", color: colors.sep },
                { text: " [×]", color: colors.remove[isInArea(mouseX, mouseY, areas.removeArea) ? 1 : 0] }
            ]
            
            buttons.forEach(btn => {
                Renderer.colorize(...btn.color)
                Renderer.drawString(btn.text, x, yPos)
                x += Renderer.getStringWidth(btn.text)
            })
        })
    }, () => getInventoryState())

register("guiMouseClick", (mouseX, mouseY, mouseButton) => {
    if (!isInInventory) return;
    const allCarryees = getAllCarryees();
    const hudX = GUI.getX();
    const hudY = GUI.getY();
    
    allCarryees.forEach((carryee, index) => {
        const { plusArea, minusArea, removeArea } = getButtonAreas(hudX, hudY, carryee, index);
        
        if (isInArea(mouseX, mouseY, plusArea)) {
            if (mouseButton === 0) {
                carryee.count = Math.min(carryee.total, carryee.count + 1);
                ChatLib.chat(`${prefix} &fIncreased &6${carryee.name}&f's count to &6${carryee.count}&f.`);
            } else if (mouseButton === 1) {
                carryee.total = Math.min(9999, carryee.total + 1);
                ChatLib.chat(`${prefix} &fIncreased &6${carryee.name}&f's total to &6${carryee.total}&f.`);
            }
        } else if (isInArea(mouseX, mouseY, minusArea)) {
            if (mouseButton === 0) {
                carryee.count = Math.max(0, carryee.count - 1);
                ChatLib.chat(`${prefix} &fDecreased &6${carryee.name}&f's count to &6${carryee.count}&f.`);
            } else if (mouseButton === 1) {
                carryee.total = Math.max(carryee.count + 1, carryee.total - 1);
                ChatLib.chat(`${prefix} &fDecreased &6${carryee.name}&f's total to &6${carryee.total}&f.`);
            }
        } else if (isInArea(mouseX, mouseY, removeArea) && mouseButton === 0) {
            if (carryees.includes(carryee)) carryees = carryees.filter(c => c !== carryee)
            else if (dungeonCarryees.includes(carryee)) dungeonCarryees = dungeonCarryees.filter(c => c !== carryee)
            UpdateCarryee()
            ChatLib.chat(`${prefix} &fRemoved &6${carryee.name}&f.`)
        }
    });
});

renderGuiINV
    .registersub("postGuiRender", () => {
        if (hud.isOpen()) return
        const allCarryees = getAllCarryees()
        const [hudX, hudY] = [GUI.getX(), GUI.getY()]
        const [mouseX, mouseY] = [Client.getMouseX(), Client.getMouseY()]
        
        allCarryees.forEach((carryee, i) => {
            const areas = getButtonAreas(hudX, hudY, carryee, i)
            const hoveredArea = Object.keys(areas).find(key => isInArea(mouseX, mouseY, areas[key]))
            if (hoveredArea) Render2D.drawHoveringText(tooltips[hoveredArea])
        })
    }, () => getInventoryState())

function getButtonAreas(hudX, hudY, carryee, index) {
    const entryY = hudY + 12 + (index * 10);
    const textWidth = Renderer.getStringWidth(carryee.toString());
    const buttonBaseX = hudX + textWidth + 10;
    
    const plusWidth = Renderer.getStringWidth(" [+] ");
    const minusWidth = Renderer.getStringWidth(" [-] ");
    const removeWidth = Renderer.getStringWidth("[×] ");

    return {
        plusArea: {
            x1: buttonBaseX,
            y1: entryY,
            x2: buttonBaseX + plusWidth,
            y2: entryY + 8
        },
        minusArea: {
            x1: buttonBaseX + plusWidth,
            y1: entryY,
            x2: buttonBaseX + plusWidth + minusWidth,
            y2: entryY + 8
        },
        removeArea: {
            x1: buttonBaseX + plusWidth + minusWidth,
            y1: entryY,
            x2: buttonBaseX + plusWidth + minusWidth + removeWidth,
            y2: entryY + 8
        }
    };
}

function isInArea(x, y, area) {
    return x >= area.x1 && x <= area.x2 && y >= area.y1 && y <= area.y2;
}

register("command", (...args) => {
    if (!args) return showHelp()
    const [subcommand, name, count] = args
    
    switch (subcommand?.toLowerCase()) {
        case "add":
            if (!name || !count) return syntaxError("add <name> <count>")
            if (findCarryee(name)) return ChatLib.chat(`${prefix} &c${name} already exists!`)
            
            const existingEntry = CarryLog.data.find((entry, i) => i % 2 === 0 && entry === name)
            const existingTotal = existingEntry ? CarryLog.data[CarryLog.data.indexOf(existingEntry) + 1]["Total carries done"] || 0 : 0
            const lastKnownCount = existingEntry ? CarryLog.data[CarryLog.data.indexOf(existingEntry) + 1]["lastKnownCount"] || 0 : 0
            const cachedRecord = carryCache.get(name.toLowerCase())
            const isCacheValid = cachedRecord && Date.now() - cachedRecord.timestamp < 5 * 60 * 1000
            let newCarryee, newTotal, messageADD
        
            if (isCacheValid) {
                newTotal = Math.max(cachedRecord.total, existingTotal + parseInt(count))
                newCarryee = new Carryee(name, newTotal, cachedRecord.count)
                newCarryee.totalCarryTime = cachedRecord.totalCarryTime || 0
                carryCache.delete(name.toLowerCase())
                messageADD = `${prefix} &fAdded &6${name} &ffor &6${newTotal} &fcarries &7- &7&oMerged cache.`
            } else if (existingEntry) {
                newTotal = existingTotal + parseInt(count)
                newCarryee = new Carryee(name, newTotal, lastKnownCount)
                newCarryee.totalCarryTime = CarryLog.data[CarryLog.data.indexOf(existingEntry) + 1]["totalCarryTime"] || 0
                messageADD = `${prefix} &fAdded &6${name} &ffor &6${newTotal} &fcarries &7- &7&oMerged logs.`
            } else {
                newTotal = parseInt(count)
                newCarryee = new Carryee(name, newTotal, 0)
                messageADD = `${prefix} &fAdded &6${name} &ffor &6${newTotal} &fcarries&f.`
            }
        
            carryees.push(newCarryee)
            UpdateCarryee()
            ChatLib.chat(messageADD)
            break
            
        case "set":
            if (!name || !count) return syntaxError("set <name> <count>")
            const carryee = findCarryee(name)
            if (!carryee) return ChatLib.chat(`${prefix} &c${name} not found!`)
            carryee.count = Math.max(0, parseInt(count))
            carryee.reset()
            ChatLib.chat(`${prefix} &fSet &6${name}&f's count to &6${count}&f.`)
            break
            
        case "settotal": 
            if (!name || !count) return syntaxError("settotal <name> <total>")
            const carryeeSetTotal = findCarryee(name)
            if (!carryeeSetTotal) return ChatLib.chat(`${prefix} &c${name} not found!`)
            const newSetTotal = parseInt(count)
            if (newSetTotal < carryeeSetTotal.count) 
                return ChatLib.chat(`${prefix} &cNew total cannot be less than current count (${carryeeSetTotal.count})!`)
            carryeeSetTotal.total = newSetTotal
            ChatLib.chat(`${prefix} &fSet &6${name}&f's total to &6${newSetTotal}&f.`)
            break
            
        case "remove":
            if (!name) return syntaxError("remove <name>")
            carryees = carryees.filter(carryee => carryee.name !== name)
            UpdateCarryee()
            ChatLib.chat(`${prefix} &fRemoved &6${name}&f.`)
            break
            
        case "list":
            if (carryees.length === 0) return ChatLib.chat(`${prefix} &cNo active carries!`)
            ChatLib.chat(`${prefix} &fActive carries:`)
            carryees.forEach((carryee) => {
                const message = new Message()
                    .addTextComponent(new TextComponent(`&7> &f${carryee.name}: &b${carryee.count}/${carryee.total} &7| `))
                    .addTextComponent(new TextComponent("&a[+]")
                        .setClick("run_command", `/carry increase ${carryee.name}`)
                        .setHoverValue("&7Click to increase count"))
                    .addTextComponent(" &7| ")
                    .addTextComponent(new TextComponent("&c[-]")
                        .setClick("run_command", `/carry decrease ${carryee.name}`)
                        .setHoverValue("&7Click to decrease count"))
                    .addTextComponent(" &7| ")
                    .addTextComponent(new TextComponent("&4[×]")
                        .setClick("run_command", `/carry remove ${carryee.name}`)
                        .setHoverValue("&7Click to remove player"))
                ChatLib.chat(message)
            })
            break
            
        case "increase":
            if (!name) return syntaxError("increase <name>")
            const carryeeInc = findCarryee(name)
            if (!carryeeInc) return ChatLib.chat(`${prefix} &c${name} not found!`)
            carryeeInc.count = Math.min(carryeeInc.total, carryeeInc.count + 1)
            carryeeInc.reset()
            ChatLib.chat(`${prefix} &fIncreased &6${name}&f's count to &6${carryeeInc.count}&f.`)
            break
            
        case "decrease":
            if (!name) return syntaxError("decrease <name>")
            const carryeeDec = findCarryee(name)
            if (!carryeeDec) return ChatLib.chat(`${prefix} &c${name} not found!`)
            carryeeDec.count = Math.max(0, carryeeDec.count - 1)
            carryeeDec.reset()
            ChatLib.chat(`${prefix} &fDecreased &6${name}&f's count to &6${carryeeDec.count}&f.`)
            break
            
        case "gui":
            hud.open()
            break
            
        case "confirmdeath":
            if (!name) return syntaxError("confirmdeath <name>")
            const carryeeConfirm = findCarryee(name)
            if (!carryeeConfirm) return ChatLib.chat(`${prefix} &c${name} not found!`)
            carryeeConfirm.incrementTotal()
            carryeeConfirm.recordBossTime()
            ChatLib.chat(`${prefix} &fCount incremented for &6${name}&f.`)
            break
            
        case "logs": 
            const entriesPerPage = 10
            const page = Math.min(Math.max(1, parseInt(args[1]) || 1), 
                Math.ceil(CarryLog.data.length / 2 / entriesPerPage) || 1)
        
            const sortedEntries = CarryLog.data.reduce((sorted, entry, i) => {
                if (i % 2 === 0 && CarryLog.data[i + 1]?.Date) {
                    const [day, month, year] = CarryLog.data[i + 1].Date.split('/').map(Number)
                    const [hours, minutes] = CarryLog.data[i + 1].Time.split(':').map(Number)
                    sorted.push({
                        name: entry,
                        details: CarryLog.data[i + 1],
                        timestamp: new Date(year, month - 1, day, hours, minutes).getTime()
                    })
                }
                return sorted
            }, []).sort((a, b) => b.timestamp - a.timestamp)
        
            const totalCarries = sortedEntries.reduce((sum, entry) => 
                sum + (entry.details["Total carries done"] || 0), 0)
            
            const divider = "&8&m⏤&r".repeat(40)
            const carryValue = parseFloat(settings().carryvalue?.split(',')[0]) || 1.3
            const formattedProfit = totalCarries * carryValue >= 1000
                ? `${((totalCarries * carryValue)/1000).toFixed(1)}B`
                : `${(totalCarries * carryValue).toFixed(1)}M`
            
            const logMsg = new Message().addTextComponent(new TextComponent(`${divider}\n`))
            
            logMsg.addTextComponent(new TextComponent(`&e[MeowAddons] &fCarry Logs &7- `))
            logMsg.addTextComponent(new TextComponent(`&ePage &a${page}&e/&a${Math.ceil(sortedEntries.length / entriesPerPage)}`))
            
            if (sortedEntries.length > entriesPerPage) {
                logMsg.addTextComponent(page > 1
                    ? new TextComponent("&c [<] ").setClick("run_command", `/carry logs ${page - 1}`).setHoverValue("&6Previous Page")
                    : new TextComponent("&7 [<] ").setHoverValue("&cNo Previous page!"))
                
                logMsg.addTextComponent(page < Math.ceil(sortedEntries.length / entriesPerPage)
                    ? new TextComponent("&a[>]").setClick("run_command", `/carry logs ${page + 1}`).setHoverValue("&6Next Page")
                    : new TextComponent("&7[>]").setHoverValue("&cNo next page!"))
            }
            
            logMsg.addTextComponent(new TextComponent("\n"))
            
            if (totalCarries === 0) {
                logMsg.addTextComponent(new TextComponent("&cNo carry logs found.\n"))
            } else {
                const startIdx = (page - 1) * entriesPerPage
                const pageEntries = sortedEntries.slice(startIdx, startIdx + entriesPerPage)
                
                pageEntries.forEach(entry => 
                    logMsg.addTextComponent(new TextComponent(`&7> &b${entry.name} &7- &e${entry.details.Date} ` + `&7at &b${entry.details.Time} &7- &a${entry.details["Total carries done"]} carries\n`)))
            }
            
            logMsg.addTextComponent(new TextComponent(`&b| &fTotal carries: &a${totalCarries}\n`))
            logMsg.addTextComponent(new TextComponent(`&b| &fProfit total: &a${formattedProfit}\n`))
            logMsg.addTextComponent(new TextComponent(`&b| &fProfit today: &b${parseInt(CarryProfit.profit)}M\n`))
            logMsg.addTextComponent(new TextComponent(divider))
            
            ChatLib.chat(logMsg.setChatLineId(9999999))
            break
            
        case "clearlog": 
            const confirmMsg = new Message(
                `${prefix} &cClear ALL carry logs? `,
                new TextComponent("&a[✔]")
                    .setClick("run_command", "/carry clearlog_confirm")
                    .setHoverValue("&eClick to confirm log deletion"),
                " ",
                new TextComponent("&c[✕]")
                    .setHoverValue("&eCancel log deletion")
            )
            ChatLib.chat(confirmMsg)
            break
            
        case "clearlog_confirm": 
            CarryLog.data = []
            if (carryCache) carryCache.clear()
            ChatLib.chat(`${prefix} &aAll carry logs have been cleared.`)
            break
            
        case "canceldeath":
            if (!name) return syntaxError("canceldeath <name>")
            const carryeeCancel = findCarryee(name)
            if (!carryeeCancel) return ChatLib.chat(`${prefix} &c${name} not found!`)
            ChatLib.chat(`${prefix} &7Ignored death for &6${name}&f.`)
            break
            
        case "clear":
            const message = carryees.length ? `${prefix} &fCleared all active carries.` : `${prefix} &cNo active carries to clear.`
            carryees = []
            UpdateCarryee()
            ChatLib.chat(message)
            break
            
        default:
            ChatLib.chat(`${prefix} &cInvalid command! Run /carry help for a list of commands.`)
    }
}).setTabCompletions((args) => {
    const subcommand = args[0]?.toLowerCase()
    const currentArg = args[args.length - 1]?.toLowerCase()
    const playerNames = World.getAllPlayers()
        .filter(player => player.getUUID().version() === 4)
        .map(player => player.getName().removeFormatting())
    if (args.length === 2 && modcmd.includes(subcommand)) return playerNames.filter(name => name.toLowerCase().startsWith(currentArg))
    if (args.length === 1) return allcmd.filter(c => c.startsWith(currentArg))
    return []
}).setName("carry").setAliases(["macarry"])

register("command", (...args) => {
    if (!args) return showDgHelp()
    const [subcommand, name, count] = args;
    switch (subcommand?.toLowerCase()) {
        case "add":
            if (!name || !count) return dgSyntaxError("add <name> <count>");
            if (findDungeonCarryee(name)) return ChatLib.chat(`${prefix} &c${name} already exists!`);
            dungeonCarryees.push(new DungeonCarryee(name, parseInt(count)));
            ChatLib.chat(`${prefix} &fAdded &6${name} &ffor &6${count} &fcarries.`);
            break;
        case "set":
            if (!name || !count) return dgSyntaxError("set <name> <count>");
            const carryee = findDungeonCarryee(name);
            if (!carryee) return ChatLib.chat(`${prefix} &c${name} not found!`);
            carryee.count = Math.max(0, parseInt(count));
            ChatLib.chat(`${prefix} &fSet &6${name}&f's count to &6${count}&f.`);
            break;
        case "settotal": 
            if (!name || !count) return dgSyntaxError("settotal <name> <total>");
            const carryeeSetTotal = findDungeonCarryee(name);
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
            if (!name) return dgSyntaxError("remove <name>");
            dungeonCarryees = dungeonCarryees.filter(carryee => carryee.name !== name);
            ChatLib.chat(`${prefix} &fRemoved &6${name}&f.`);
            break;
        case "list":
            if (dungeonCarryees.length === 0) return ChatLib.chat(`${prefix} &cNo active carries!`);
            ChatLib.chat(`${prefix} &fActive carries:`);
            dungeonCarryees.forEach((carryee, index) => {
                const message = new Message()
                    .addTextComponent(new TextComponent(`&7> &f${carryee.name}: &b${carryee.count}/${carryee.total} &7| `))
                    .addTextComponent(new TextComponent("&a[+]")
                        .setClick("run_command", `/carry increase ${carryee.name}`)
                        .setHoverValue("&7Click to increase count"))
                    .addTextComponent(" &7| ")
                    .addTextComponent(new TextComponent("&c[-]")
                        .setClick("run_command", `/carry decrease ${carryee.name}`)
                        .setHoverValue("&7Click to decrease count"))
                    .addTextComponent(" &7| ")
                    .addTextComponent(new TextComponent("&4[×]")
                        .setClick("run_command", `/carry remove ${carryee.name}`)
                        .setHoverValue("&7Click to remove player"))
                ChatLib.chat(message)
            });
            break;
        case "increase":
            if (!name) return dgSyntaxError("increase <name>");
            const carryeeInc = findDungeonCarryee(name);
            if (!carryeeInc) return ChatLib.chat(`${prefix} &c${name} not found!`);
            carryeeInc.count = Math.min(carryeeInc.total, carryeeInc.count + 1);
            ChatLib.chat(`${prefix} &fIncreased &6${name}&f's count to &6${carryeeInc.count}&f.`);
            break;
        case "decrease":
            if (!name) return dgSyntaxError("decrease <name>");
            const carryeeDec = findDungeonCarryee(name);
            if (!carryeeDec) return ChatLib.chat(`${prefix} &c${name} not found!`);
            carryeeDec.count = Math.max(0, carryeeDec.count - 1);
            ChatLib.chat(`${prefix} &fDecreased &6${name}&f's count to &6${carryeeDec.count}&f.`);
            break;
        case "clear":
            const message = dungeonCarryees.length ? `${prefix} &aCleared all active carries.` : `${prefix} &cNo active carries to clear.`;
            dungeonCarryees = [];
            ChatLib.chat(message);
            break;
        default:
            ChatLib.chat(`${prefix} &cInvalid command! Run /dgcarry help for a list of commands.`)
            break
    }
}).setTabCompletions((args) => {
    const subcommand = args[0]?.toLowerCase();
    const currentArg = args[args.length - 1]?.toLowerCase();
    const playerNames = World.getAllPlayers()
        .filter(player => player.getUUID().version() === 4)
        .map(player => player.getName()?.removeFormatting())
    if (args.length === 2 && modcmd.includes(subcommand)) return playerNames.filter(name => name.toLowerCase().startsWith(currentArg))
    if (args.length === 1) return allcmd.filter(c => c.startsWith(currentArg))
    return []
}).setName("dgcarry").setAliases(["madgcarry"]);

function findDungeonCarryee(name) {
    return dungeonCarryees.find(c => c.name.toLowerCase() === name.toLowerCase());
}

function dgSyntaxError(usage) {
    ChatLib.chat(`${prefix} &cUsage: /dgcarry ${usage}`);
}

function showDgHelp() {
    ChatLib.chat(`${prefix} &aDungeon Carry Commands:`);
    ChatLib.chat("> &e/dgcarry add &c<name> <count> &7- Add new carry");
    ChatLib.chat("> &e/dgcarry set &c<name> <count> &7- Update carry count");
    ChatLib.chat("> &e/dgcarry settotal &c<name> <total> &7- Update carry total")
    ChatLib.chat("> &e/dgcarry remove &c<name> &7- Remove carry");
    ChatLib.chat("> &e/dgcarry list &7- Show active carries");
    ChatLib.chat("> &e/dgcarry clear &7- Clears all active carries")
    ChatLib.chat("> &e/carry gui &7- Open HUD editor");
}

const sendP = msg => {
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

function sendcarrymsg(msg) {
    if (!settings().sendcarrycountdc) return;
    if (settings().webhookurlcarry == `None`) return;
    SendMsg(webhookUrl, msg)
}

function showHelp() {
    ChatLib.chat(`${prefix} &aSlayer Carry Commands:`);
    ChatLib.chat("> &e/carry add &c<name> <count> &7- Add new carry");
    ChatLib.chat("> &e/carry set &c<name> <count> &7- Update carry count");
    ChatLib.chat("> &e/carry settotal &c<name> <total> &7- Update carry total");
    ChatLib.chat("> &e/carry remove &c<name> &7- Remove carry");
    ChatLib.chat("> &e/carry increase &c<name> &7- Increase carry count");
    ChatLib.chat("> &e/carry decrease &c<name> &7- Decrease carry count");
    ChatLib.chat("> &e/carry logs &7- See all tracked carries and profit");
    ChatLib.chat("> &e/carry clearlogs &7- Clear ALL carry logs");
    ChatLib.chat("> &e/carry list &7- Show active carries");
    ChatLib.chat("> &e/carry clear &7- Clears all active carries")
    ChatLib.chat("> &e/carry gui &7- Open HUD editor");
}

register("gameUnload", () => {
    if (carryees.length === 0) return;
    ChatLib.chat(`${prefix} &aPrinting &6${carryees.length} &aactive carries:`);
    carryees.forEach(carryee => ChatLib.chat(`&e> &f${carryee.name}: ` + `&b`+ carryee.count + `&f/&b` + carryee.total));
});