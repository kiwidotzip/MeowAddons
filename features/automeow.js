import Config from "../config";

const Normalregex = /^(.+)? ?(>)? ?(\[.+\])? ?(.+?) ?(\[.+?\])?: meow$/i;
const BridgeBotregex = /Guild > ?(\[.+\])? ?(.+?) ?(\[.+?\])?: (.+?) » meow$/i;

let lastscantime = 0;
const scancooldown = 300;

register("chat", (event) => {
    if (!Config().automeow) return;

    const currentTime = Date.now();
    if (currentTime - lastscantime < scancooldown) return;

    const message = ChatLib.getChatMessage(event).removeFormatting();
    const playerName = Player.getName();
    const randomdelay = Config().randomdelayautomeow ? Math.floor(Math.random() * 2000 + 500) : 100;

    if (!message.includes("meow")) return;
    if (Normalregex.test(message) || BridgeBotregex.test(message) || message.includes(playerName)) {
        setTimeout(() => {
            if (message.startsWith("Party >")) {
                ChatLib.command("pc meow :3");
            } else if (message.startsWith("Guild >")) {
                if (Config().guildchattoggleautomeow) {
                    ChatLib.command("gc meow :3");
                }
            } else if (message.startsWith("Officer >")) {
                if (Config().guildchattoggleautomeow) {
                    ChatLib.command("oc meow :3");
                }
            } else {
                ChatLib.command("ac meow :3");
            }
        }, randomdelay);
        lastscantime = currentTime;
        return;
    }
});
