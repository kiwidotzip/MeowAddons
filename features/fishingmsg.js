import Config from "../config";

function disableFishingMsg() {
    Config().fishingmsg = false;
    ChatLib.chat("&dMeowAddons &8> &cNormal fishing messages have been disabled because you have silly fishing messages enabled!");
}

register("worldLoad", () => {
    Client.scheduleTask(150, () => {
        if (!Config().fishingmsgsilly && !Config().fishingmsg) return;
        disableFishingMsg();
    })
});

register("chat", (event) => {
    if (!Config().fishingmsgsilly && !Config().fishingmsg){
        disableFishingMsg();
        return;
    }
    if (!Config().fishingmsg && !Config().fishingmsgmaintoggle) return;
    ChatLib.command(`pc Yeti!`);
}).setCriteria("What is this creature!?");

register("chat", (event) => {
    if (!Config().fishingmsgsilly && !Config().fishingmsg) {
        disableFishingMsg();
        return;
    }
    if (!Config().fishingmsg && !Config().fishingmsgmaintoggle) return;
    ChatLib.command(`pc Hydra!`);
}).setCriteria("The Water Hydra has come to test your strength.");

register("chat", (event) => {
    if (!Config().fishingmsgsilly && !Config().fishingmsg) {
        disableFishingMsg();
        return;
    }
    if (!Config().fishingmsg && !Config().fishingmsgmaintoggle) return;
    ChatLib.command(`pc Sea Emperor!`);
}).setCriteria("The Sea Emperor arises from the depths.");

register("chat", (event) => {
    if (!Config().fishingmsgsilly && !Config().fishingmsg) {
        disableFishingMsg();
        return;
    }
    if (!Config().fishingmsg && !Config().fishingmsgmaintoggle) return;
    ChatLib.command(`pc Shark!`);
}).setCriteria("Hide no longer, a Great White Shark has tracked your scent and thirsts for your blood!");

register("chat", (event) => {
    if (!Config().fishingmsgsilly && !Config().fishingmsg) {
        disableFishingMsg();
        return;
    }
    if (!Config().fishingmsg && !Config().fishingmsgmaintoggle) return;
    ChatLib.command(`pc Grim Reaper!`);
}).setCriteria("This can't be! The manifestation of death himself!");

register("chat", (event) => {
    if (!Config().fishingmsgsilly && !Config().fishingmsg) {
        disableFishingMsg();
        return;
    }
    if (!Config().fishingmsg && !Config().fishingmsgmaintoggle) return;
    ChatLib.command(`pc Reindrake!`);
}).setCriteria("A Reindrake forms from the depths.");

register("chat", (event) => {
    if (!Config().fishingmsgsilly && !Config().fishingmsg) {
        disableFishingMsg();
        return;
    }
    if (!Config().fishingmsg && !Config().fishingmsgmaintoggle) return;
    ChatLib.command(`pc Nutcracker!`);
}).setCriteria("You found a forgotten Nutcracker laying beneath the ice.");
