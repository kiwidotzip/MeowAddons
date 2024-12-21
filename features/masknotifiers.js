import Settings from "../config";

register("chat", (event) => {
    if (!Settings.masknotifier) return
        cancel(event)
        ChatLib.command(`pc MeowAddons » Bonzo Mask activated (3s)`)
}).setCriteria("Your ⚚ Bonzo's Mask saved your life!")

register("chat", (event) => {
    if (!Settings.masknotifier) return
        cancel(event)
        ChatLib.command(`pc MeowAddons » Bonzo Mask activated (3s)`)
}).setCriteria("Your Bonzo's Mask saved your life!")

register("chat", (event) => {
    if (!Settings.masknotifier) return
        cancel(event)
        ChatLib.command(`pc MeowAddons » Spirit Mask activated (3s)`)
}).setCriteria("Second Wind Activated! Your Spirit Mask saved your life!")

register("chat", (event) => {
    if (!Settings.masknotifier) return
        cancel(event)
        ChatLib.command(`pc MeowAddons » Phoenix Pet activated (2-4s)`)
}).setCriteria("Your Phoenix Pet saved you from certain death!")