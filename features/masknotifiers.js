import Config from "../config";

register("chat", (event) => {
    if (!Config().masknotifier) return
    const msg = ChatLib.getChatMessage(event)
    let maskType = null

    if (Config().bonzoMaskNotifier && /Your (?:. )?Bonzo's Mask saved your life!/.test(msg)) maskType = "Bonzo Mask activated (3s)"
    else if (Config().spiritMaskNotifier && msg == "Second Wind Activated! Your Spirit Mask saved your life!") maskType = "Spirit Mask activated (3s)"
    else if (Config().phoenixPetNotifier && msg == "Your Phoenix Pet saved you from certain death!")   maskType = "Phoenix Pet activated (2-4s)"
    
    if (!maskType) return
     ChatLib.command(`pc MeowAddons » ${maskType}`)
     cancel(event)
})
