import { FeatManager } from "./helperfunction"

const maskrem = FeatManager.createFeature("maskrem", "catacombs")
const masknotifier = FeatManager.createFeature("masknotifier")

masknotifier.register("chat", (msg, event) => {
    const mask = [
        [/Your (?:. )?Bonzo's Mask saved your life!/, "Bonzo Mask activated (3s)"],
        [/^Second Wind Activated! Your Spirit Mask saved your life!$/, "Spirit Mask activated (3s)"],
        [/^Your Phoenix Pet saved you from certain death!$/, "Phoenix Pet activated (2-4s)"]
    ].find(([pattern]) => pattern.test(msg));
  
    if (!mask) return;
    ChatLib.command(`pc MeowAddons » ${mask[1]}`);
    cancel(event);
}, "${msg}")

maskrem
    .register("serverChat", () => {
        const helmet = Player.armor.getHelmet()?.getName()?.removeFormatting()
        if ((helmet?.includes("Bonzo's Mask")) || helmet?.includes("Spirit Mask")) return
        Client.showTitle("&cMask not equipped!", "", 1, 60, 1)
        World.playSound("mob.cat.hiss", 1, 1)
    }, "[BOSS] Storm: I should have known that I stood no chance.")