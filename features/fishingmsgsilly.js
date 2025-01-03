import Config from "../config";

register("chat", (event) => {
    if (!Config().fishingmsgsilly && !Config().fishingmsgmaintoggle) return
        ChatLib.command(`pc A Yeti(and the baby aswell) was fished up!`)
}).setCriteria("What is this creature!?")

register("chat", (event) => {
    if (!Config().fishingmsgsill && !Config().fishingmsgmaintoggley) return
        ChatLib.command(`pc A Hydra appeared! Hope it drops a head!`)
}).setCriteria("The Water Hydra has come to test your strength.")

register("chat", (event) => {
    if (!Config().fishingmsgsilly && !Config().fishingmsgmaintoggle) return
        ChatLib.command(`pc A Sea Emperor appeared to give us a free flying fish :3`)
}).setCriteria("The Sea Emperor arises from the depths.")

register("chat", (event) => {
    if (!Config().fishingmsgsilly && !Config().fishingmsgmaintoggle) return
        ChatLib.command(`pc A MASSIVE shark spawned, but you know what else is MASSIVE?`)
}).setCriteria("Hide no longer, a Great White Shark has tracked your scent and thirsts for your blood!")

register("chat", (event) => {
    if (!Config().fishingmsgsilly && !Config().fishingmsgmaintoggle) return
        ChatLib.command(`pc This can't be! The manifestation of death himself—The Grim Reaper! Uh-oh!`)
}).setCriteria("This can't be! The manifestation of death himself!")

register("chat", (event) => {
    if (!Config().fishingmsgsilly && !Config().fishingmsgmaintoggle) return
        ChatLib.command(`pc FREE GIFTS ALERT! A Reindrake appeared`)
}).setCriteria("A Reindrake forms from the depths.")

register("chat", (event) => {
    if (!Config().fishingmsgsilly && !Config().fishingmsgmaintoggle) return
        ChatLib.command(`pc Nutcracker!`)
}).setCriteria("You found a forgotten Nutcracker laying beneath the ice.")

register("chat", (event) => {
    if (!Config().fishingmsgsilly && !Config().fishingmsgmaintoggle) return
        ChatLib.command(`pc AAAAA THE THUNDER CAT`)
}).setCriteria("You hear a massive rumble as Thunder emerges.")

register("chat", (event) => {
    if (!Config().fishingmsgsilly && !Config().fishingmsgmaintoggle) return
        ChatLib.command(`ac JAWBUS GUY AAAAAAAAAA`)
}).setCriteria("You have angered a legendary creature... Lord Jawbus has arrived.")
