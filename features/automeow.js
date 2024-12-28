import Settings from "../config";

const Normalregex = /^(.+)? ?(>)? ?(\[.+\])? ?(.+?) ?(\[.+?\])?: meow$/i;
const BridgeBotregex = /Guild > ?(\[.+\])? ?(.+?) ?(\[.+?\])?: (.+?) » meow$/i;

let lastscantime = 0;
const scancooldown = 1000;

register("chat", (event) => {
    if (!Settings.automeow) return;

    const currentTime = Date.now();
    if (currentTime - lastscantime < scancooldown) return;

    const message = ChatLib.getChatMessage(event).removeFormatting();
    const playerName = Player.getName();

    if (!message.includes("meow") || message.includes(playerName)) return;

    if (Normalregex.test(message)) {
        if (message.startsWith("Party >")) {
            ChatLib.command("pc meow :3");
        } else if (message.startsWith("Guild >")) {
            ChatLib.command("gc meow :3");
        } else if (message.startsWith("Officer >")) {
            ChatLib.command("oc meow :3");
        } else {
            ChatLib.command("ac meow :3");
        }
        lastscantime = currentTime;
        return;
    }

    if (BridgeBotregex.test(message)) {
        if (message.startsWith("Guild >")) {
            ChatLib.command("gc meow :3");
        } else if (message.startsWith("Officer >")) {
            ChatLib.command("oc meow :3");
        }
        lastscantime = currentTime;
    }
});
