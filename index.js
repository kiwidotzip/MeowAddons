// Meowing
import "./features/automeow";
import "./features/meowsounds";
import "./features/meowhitsound";
// General
import "./features/chatcleaner";
import "./features/cleanfriendjoin";
import "./features/cleanguildjoin";
import "./features/cleanpartyjoin";
import "./features/partyformat";
import "./features/guildformat";
// Fishing
import "./features/fishingmsgsilly";
// Party command
import "./features/partycmd";
// Skyblock General
import "./features/BetterAH";
import "./features/BetterBZ";
// Skyblock Slayer
import "./features/carrycounter";
// Dungeons
import "./features/masknotifiers";
import "./features/blood";
import "./features/terminallabel";
import "./features/leapannounce";
import "./features/terminalcallouts";

// Update checker

import request from "../requestV2"

const VERSION = JSON.parse(FileLib.read("MeowAddons", "metadata.json")).version;
const API_URL = 'https://api.github.com/repos/kiwidotzip/meowaddons/releases';

function checkUpdate() {
    request({
        url: API_URL,
        headers: { 'User-Agent': 'MeowAddons' },
        json: true
    })
    .then(function(response) {
        if (!response.length) {
            ChatLib.chat('&e[MeowAddons] &cNo releases found!');
            return;
        }

        ChatLib.chat(`&e[MeowAddons] &aChecking for updates...`);
        const latest = response[0];
        const remoteVersion = latest.tag_name.replace(/^v/, '');
        const localVersion = VERSION.replace(/^v/, '');

        if (localVersion > remoteVersion) {
            ChatLib.chat('&e[MeowAddons] &aYou\'re running a development build that is newer than the latest release!');
        } else if (localVersion < remoteVersion) {
            ChatLib.chat(`&e[MeowAddons] &aUpdate available: &bv${remoteVersion}&a! Current: &ev${localVersion}`);
            ChatLib.chat(new TextComponent(`&e[MeowAddons] &aClick here to go to the Github release page!`)
            .setClick("open_url", `https://github.com/kiwidotzip/meowaddons/releases/latest`));
        } else {
            ChatLib.chat('&e[MeowAddons] &aYou\'re running the latest version!');
        }
    })
    .catch(function(error) {
        ChatLib.chat(`&e[MeowAddons] &cUpdate check failed: ${error}`);
    });
}

let UpdateChecked = false;

register("worldLoad", () => {
    if (!UpdateChecked) {
        UpdateChecked = true;
        Client.scheduleTask(1000, () => {
            checkUpdate();
        });
    }
});

register("gameLoad", () => {
    UpdateChecked = false;
});

register('command', () => {
    checkUpdate();
}).setName('meowupdate');