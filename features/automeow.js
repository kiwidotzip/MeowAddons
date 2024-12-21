import Settings from "../config";

register("chat", (event) => {
    if(!Settings.automeow) return;
    var message = ChatLib.getChatMessage(event).removeFormatting();
    var playerName = Player.getName();

        const Normalregex = /^(.+)? ?(>)? ?(\[.+\])? ?(.+?) ?(\[.+?\])?: meow$/i;
        const BridgeBotregex = /Guild > ?(\[.+\])? ?(.+?) ?(\[.+?\])?: (.+?) » meow$/i;

    if (Normalregex.test(message)) {
        if(message.includes(playerName)) return;

        if(message.startsWith("Party >")) {
            ChatLib.say("/pc meow :3")
        } else if(message.startsWith("Guild >")) {
            ChatLib.say("/gc meow :3")
        } else if(message.startsWith("Officer >")) {
            ChatLib.say("/oc meow :3")
        } else {
            ChatLib.say("/ac meow :3")
        }
        return;
    }

    if (BridgeBotregex.test(message)) {
        if(message.startsWith("Guild >")) {
            ChatLib.say("/gc meow :3")
        } else if(message.startsWith("Officer >")) {
            ChatLib.say("/oc meow :3")
        }
        return;
    }
})
