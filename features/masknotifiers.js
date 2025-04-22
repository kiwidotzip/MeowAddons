import { FeatManager } from "./helperfunction";
const masknotifier = FeatManager.createFeature("masknotifier");

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