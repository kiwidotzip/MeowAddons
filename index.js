// Meowing
import "./features/automeow";
import "./features/meowsounds";
// General
import "./features/chatcleanerentry";
import "./features/cleanjoins";
import "./features/cleanmsgs";
// Party command
import "./features/partycmd";
// Skyblock General
import "./features/BetterAH";
import "./features/BetterBZ";
import "./features/alerts";
// Skyblock Carrying
import "./features/carrycounter";
// Skyblock Slayers
import "./features/slayertimer";
// Dungeons
import "./features/masknotifiers";
import "./features/blood";
import "./features/terminallabel";
import "./features/leapannounce";
import "./features/terminalcallouts";
import "./features/lividvuln";
import "./features/mimic";
import "./features/serverlagtimer";
import "./features/batdead";
import "./features/f7title";
import "./features/cryptcounter";
import "./features/firefreezetimer";
import "./features/quiztimer";
import "./features/dungeonmisc";
// Misc
import "./features/customsize";
import "./features/custommodel";
import "./features/blockoverlay";
import "./features/noclutter";
import "./features/poisontracker";
import "./features/worldage";
import "./features/armorhud";
import "./features/helmet";

// Update Checker

import { LocalStore } from "../tska/storage/LocalStore";
import { fetch } from "../tska/polyfill/Fetch";
const Data = new LocalStore("MeowAddons", {
    firstInstall: true,
    version: "2.3.2"
}, "./data/indexData.json")

const LOCAL_VERSION = JSON.parse(FileLib.read("MeowAddons", "metadata.json")).version.replace(/^v/, '');
const API_URL = 'https://api.github.com/repos/kiwidotzip/meowaddons/releases';
let updateMessage = `&9&m${ChatLib.getChatBreak("-")}\n`;

function compareVersions (v1, v2) {
    const a = v1.split('.').map(Number), b = v2.split('.').map(Number);
    for (let i = 0, l = Math.max(a.length, b.length); i < l; i++) if ((a[i] || 0) !== (b[i] || 0)) return (a[i] || 0) > (b[i] || 0) ? 1 : -1
    return 0
}

function buildUpdateMessage(releases) {
    let message = `&9&m${ChatLib.getChatBreak("-")}\n&e&lMeowAddons Changelog: \n&fChanges since &bv${Data.version}&f:\n`
    releases
        .filter(release => compareVersions(release.tag_name.replace(/^v/, ''), Data.version) > 0)
        .forEach(r => r.body.split("\n").forEach(l => l.trim() !== "" && !l.trim().includes("**Full Changelog**") && (message += `&b${l.trim()}\n`)))
    return message + `&9&m${ChatLib.getChatBreak("-")}`
}

function checkUpdate(silent = false) {
    fetch(API_URL, {
        headers: { 'User-Agent': 'MeowAddons' },
        json: true
    })
    .then(releases => {
        if (!releases.length && !silent) return ChatLib.chat('&e[MeowAddons] &fNo releases found!')
        updateMessage = buildUpdateMessage(releases)
        if (silent) return
        compareVersions(LOCAL_VERSION, releases[0].tag_name) > 0 ? ChatLib.chat('&e[MeowAddons] &fYou\'re on a development build.')
        : compareVersions(LOCAL_VERSION, releases[0].tag_name) < 0 && (
            ChatLib.chat(`&e[MeowAddons] &fUpdate available: &bv${remoteVersion}&f! Current: &bv${LOCAL_VERSION}`),
            ChatLib.chat(new TextComponent(`&e[MeowAddons] &fClick here to go to the release page!`).setClick("open_url", `https://github.com/kiwidotzip/meowaddons/releases/latest`)),
            ChatLib.chat(new TextComponent(`&e[MeowAddons] &fHover over this message to view changelogs!`).setHoverValue(updateMessage))
        )
    })
    .catch(error => ChatLib.chat(`&e[MeowAddons] &fUpdate check failed: &c${error}`))
}

// Update check

let updateChecked = false

const Changelog = register("worldLoad", () => {
    checkUpdate(true)
    Changelog.unregister()
    Client.scheduleTask(40, () => (ChatLib.chat(updateMessage), Data.version = LOCAL_VERSION))
}).unregister()

const UpdateCH = register("worldLoad", () => {
    updateChecked = true
    UpdateCH.unregister()
    Client.scheduleTask(1000, () => (checkUpdate(), updateMessage = `&9&m${ChatLib.getChatBreak("-")}\n`))
}).unregister()

register("gameLoad", () => (Data.version < LOCAL_VERSION && Changelog.register(), !updateChecked && UpdateCH.register()))

// First install

const fi = register("step", () => {
    if (!World.isLoaded()) return
    Data.firstInstall = false
    fi.unregister()
    Client.scheduleTask(20, () => {
        ChatLib.chat(`&7&l-----------------------------------------------------`)
        ChatLib.chat(ChatLib.getCenteredText("&bThanks for installing &e&lMeowAddons&b!"))
        ChatLib.chat(`&b`)
        ChatLib.chat(`&b> Commands&f:`)
        ChatLib.chat(`&7> &7/&bmeowaddons &7- &fOpen the settings menu &7&o(Aliases: /meowa, /ma)`)
        ChatLib.chat(`&7> &7/&bmeowaddons gui &7- &fOpens the gui editor &7&o(Alias: /ma gui)`)
        ChatLib.chat(`&7> &7/&bmacarry help &7- &fView slayer carry commands &7&o(Aliases: /carry)`)
        ChatLib.chat(`&7> &7/&bmadgcarry help &7- &fView dungeon carry commands &7&o(Aliases: /dgcarry)`)
        ChatLib.chat(`&7> &7/&bmeowcount &7- &fCheck the amount of times you've meowed!`)
        ChatLib.chat(`&7> &7/&bma update &7- &fCheck for updates`)
        ChatLib.chat(`&b`)
        ChatLib.chat(`&b> Github&f:&7 https://github.com/kiwidotzip/meowaddons`)
        ChatLib.chat(`&b> Discord&f:&7 https://discord.gg/KPmHQUC97G`)
        ChatLib.chat(`&7&l-----------------------------------------------------`)
    })
}).setDelay(2).unregister()

register("gameLoad", () => Data.firstInstall && fi.register())

// Command handler

import Config from "./config"
import { hud } from "./features/helperfunction"

register("command", (...args) => {
    if (!args[0]?.toLowerCase()) return Config()?.getConfig()?.openGui()
    switch (args[0]?.toLowerCase()) {
        case "gui":
            hud.open()
            break
        case "help":
            ChatLib.chat(`&7&l-----------------------------------------------------`)
            ChatLib.chat(`&b> Commands&f:`)
            ChatLib.chat(`&7> &7/&bmeowaddons &7- &fOpen the settings menu &7&o(Aliases: /meowa, /ma)`)
            ChatLib.chat(`&7> &7/&bmeowaddons gui &7- &fOpens the gui editor &7&o(Alias: /ma gui)`)
            ChatLib.chat(`&7> &7/&bmacarry help &7- &fView slayer carry commands &7&o(Aliases: /carry)`)
            ChatLib.chat(`&7> &7/&bmadgcarry help &7- &fView dungeon carry commands &7&o(Aliases: /dgcarry)`)
            ChatLib.chat(`&7> &7/&bmeowcount &7- &fCheck the amount of times you've meowed!`)
            ChatLib.chat(`&7> &7/&bma update &7- &fCheck for updates`)
            ChatLib.chat(`&b`)
            ChatLib.chat(`&b> Github&f:&7 https://github.com/kiwidotzip/meowaddons`)
            ChatLib.chat(`&b> Discord&f:&7 https://discord.gg/KPmHQUC97G`)
            ChatLib.chat(`&7&l-----------------------------------------------------`)
            break
        case "update": 
            checkUpdate()
            updateMessage = `&9&m${ChatLib.getChatBreak("-")}\n`
            break
        default:
            ChatLib.chat(`&e[MeowAddons] &fCommand not found! Do &c/ma help &ffor a list of commands.`)
            break
    }
}).setName("meowaddons").setAliases(["ma", "meowa"])