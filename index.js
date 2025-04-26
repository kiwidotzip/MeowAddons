// Meowing
import "./features/automeow";
import "./features/meowsounds";
import "./features/meowhitsound";
// General
import "./features/chatcleaner";
import "./features/cleanfriendjoin";
import "./features/cleanguildjoin";
import "./features/partyformat";
import "./features/guildformat";
// Party command
import "./features/partycmd";
// Skyblock General
import "./features/BetterAH";
import "./features/BetterBZ";
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
// Misc
import "./features/customsize";
import "./features/custommodel";
import "./features/blockoverlay";
import "./features/noclutter";
import "./features/poisontracker";

// Update Checker

import { LocalStore } from "../tska/storage/LocalStore";
import { fetch } from "../tska/polyfill/Fetch";
const Data = new LocalStore("MeowAddons", {
    firstInstall: true,
    DiscordSent: false
}, "./data/indexData.json")


const LOCAL_VERSION = JSON.parse(FileLib.read("MeowAddons", "metadata.json")).version.replace(/^v/, '');
const API_URL = 'https://api.github.com/repos/kiwidotzip/meowaddons/releases';
let updateMessage = `&9&m${ChatLib.getChatBreak("-")}\n`;

function compareVersions (v1, v2) {
    const a = v1.split('.').map(Number), b = v2.split('.').map(Number);
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      if ((a[i]||0) > (b[i]||0)) return 1;
      if ((a[i]||0) < (b[i]||0)) return -1;
    }
    return 0;
};

function buildUpdateMessage(releases) {
    let message = `&9&m${ChatLib.getChatBreak("-")}\n`;
    message += `&e&lMeowAddons Changelog: \n&fChanges since &bv${LOCAL_VERSION}&e:\n`;
    releases
        .filter(release => compareVersions(release.tag_name.replace(/^v/, ''), LOCAL_VERSION) > 0)
        .forEach(release => {
            release.body.split("\n").forEach(line => {
                const trimmedLine = line.trim();
                if (trimmedLine !== "" && !trimmedLine.includes("**Full Changelog**")) {
                    message += `&b${trimmedLine}\n`;
                }
            });
        });
    return message + `&9&m${ChatLib.getChatBreak("-")}`;
}

function checkUpdate(silent = false) {
    fetch(API_URL, {
        headers: { 'User-Agent': 'MeowAddons' },
        json: true
    })
    .then(releases => {
        if (!releases.length && !silent) {
            ChatLib.chat('&e[MeowAddons] &cNo releases found!');
            return;
        }

        const latestRelease = releases[0];
        const remoteVersion = latestRelease.tag_name.replace(/^v/, '');
        updateMessage = buildUpdateMessage(releases);

        if (!silent && compareVersions(LOCAL_VERSION, remoteVersion) !== 0) ChatLib.chat('&e[MeowAddons] &aChecking for updates...');

        if (compareVersions(LOCAL_VERSION, remoteVersion) > 0 && !silent) {
            ChatLib.chat('&e[MeowAddons] &aYou\'re running a development build that is newer than the latest release!');
        } else if (compareVersions(LOCAL_VERSION, remoteVersion) < 0 && !silent) {
            ChatLib.chat(`&e[MeowAddons] &aUpdate available: &bv${remoteVersion}&a! Current: &ev${LOCAL_VERSION}`);
            ChatLib.chat(new TextComponent(`&e[MeowAddons] &aClick here to go to the Github release page!`)
                .setHoverValue(`&bOpens the release page - Github`)
                .setClick("open_url", `https://github.com/kiwidotzip/meowaddons/releases/latest`));
            ChatLib.chat(new TextComponent(`&e[MeowAddons] &aHover over this message to view changelogs!`)
                .setHoverValue(updateMessage));
        }
    })
    .catch(error => {
        ChatLib.chat(`&e[MeowAddons] &cUpdate check failed: ${error}`);
    });
}

let updateChecked = false;
register("worldLoad", () => {
    if (!updateChecked) {
        if (Data.version < LOCAL_VERSION) {
            checkUpdate(true);
            Client.scheduleTask(40, () => ChatLib.chat(updateMessage));
            Data.version = LOCAL_VERSION;
            Data.save();
        }
        updateChecked = true;
        Client.scheduleTask(1000, () => {
            checkUpdate();
            if(!Data.DiscordSent) { 
                ChatLib.chat(new TextComponent(`&7&oPsssst &7- &e&lMeowAddons&f now has a discord - Click to join!`)
                            .setHoverValue(`Click to join!`)
                            .setClick("open_url", `https://discord.gg/KPmHQUC97G`))
                Data.DiscordSent = true;
                Data.save()
            }
            updateMessage = `&9&m${ChatLib.getChatBreak("-")}\n`;
        });
    }
});

register('command', () => {
    checkUpdate();
    updateMessage = `&9&m${ChatLib.getChatBreak("-")}\n`;
}).setName('meowupdate');

// First install

register("worldLoad", () => {
    if (Data.firstInstall) {
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
        ChatLib.chat(`&7> &7/&bmeowupdate &7- &fCheck for updates`)
        ChatLib.chat(`&b`)
        ChatLib.chat(`&b> Github&f:&7 https://github.com/kiwidotzip/meowaddons`)
        ChatLib.chat(`&b> Discord&f:&7 https://discord.gg/KPmHQUC97G`)
        ChatLib.chat(`&7&l-----------------------------------------------------`)
        Data.firstInstall = false;
        Data.save();
        if (FileLib.exists("MeowAddons", ".data.json")) {
            ChatLib.chat(`&cYou may be seeing this message again because your data file can no longer be accessed.`)
            ChatLib.chat(`&cDeleting old MeowAddons Data file...`)
            FileLib.delete("MeowAddons", ".data.json")
        }});
    }
});

// Command handler

import Config from "./config"
import { hud } from "./features/helperfunction"

register("command", (...args) => {
    if (!args[0]?.toLowerCase()) return Config().getConfig().openGui()
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
            ChatLib.chat(`&7> &7/&bmeowupdate &7- &fCheck for updates`)
            ChatLib.chat(`&b`)
            ChatLib.chat(`&b> Github&f:&7 https://github.com/kiwidotzip/meowaddons`)
            ChatLib.chat(`&b> Discord&f:&7 https://discord.gg/KPmHQUC97G`)
            ChatLib.chat(`&7&l-----------------------------------------------------`)
            break
        default:
            ChatLib.chat(`&e[MeowAddons] &fCommand not found! Do &c/ma help &ffor a list of commands.`)
            break
    }
}).setName("meowaddons").setAliases(["ma", "meowa"])    