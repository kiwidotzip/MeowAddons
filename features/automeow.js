import Config from "../config";

const Normalregex = /^(.+)? ?(>)? ?(\[.+\])? ?(.+?) ?(\[.+?\])?: meow$/i;
const BridgeBotregex = /Guild > ?(\[.+\])? ?(.+?) ?(\[.+?\])?: (.+?) » meow$/i;
const meow = ["mroww", "purr", "meowwwwww", "meow :3", "mrow", "moew", "mrow :3", "purrr :3"]

let lastscantime = 0;
const scancooldown = 300;

register("chat", (event) => {
    if (!Config().automeow) return;

    const currentTime = Date.now();
    if (currentTime - lastscantime < scancooldown) return;

    const message = ChatLib.getChatMessage(event).removeFormatting();
    const playerName = Player.getName();
    const randomdelay = Config().randomdelayautomeow ? Math.floor(Math.random() * 2000 + 500) : 100;

    if (!message.includes("meow") || message.includes(playerName)) return;
    if (Normalregex.test(message) || BridgeBotregex.test(message)) {
        setTimeout(() => {
            let random = Math.floor(Math.random() * meow.length)
            if (message.startsWith("Party >")) {
                ChatLib.command(`pc ${meow[random]}`);
            } else if (message.startsWith("Guild >")) {
                if (Config().guildchattoggleautomeow) {
                    ChatLib.command(`gc ${meow[random]}`);
                }
            } else if (message.startsWith("Officer >")) {
                if (Config().guildchattoggleautomeow) {
                    ChatLib.command(`oc ${meow[random]}`);
                }
            } else {
                ChatLib.command(`ac ${meow[random]}`);
            }
        }, randomdelay);
        lastscantime = currentTime;
        return;
    }
});
