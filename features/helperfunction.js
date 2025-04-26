import { Data } from "./utils/data";
import { fetch } from "../../tska/polyfill/Fetch";
import { LocalStore } from "../../tska/storage/LocalStore";
import { FeatureManager } from "../../tska/event/FeatureManager";
import { Event } from "../../tska/event/Event";
import { HudManager } from "../../tska/gui/HudManager";
import Config from "../config";

const HudData = new LocalStore("tska", {});
export const hud = new HudManager(HudData);
export const FeatManager = new FeatureManager(Config().getConfig());
const thresholds = [
  { value: 1e9, symbol: "B", precision: 1 },
  { value: 1e6, symbol: "M", precision: 1 },
  { value: 1e3, symbol: "K", precision: 1 }
];
// Custom events
Event.createEvent("ma:renderEntity", (cb, entityType) => register("renderEntity", cb).setFilteredClasses(entityType));
Event.createEvent("ma:postRenderEntity", (cb, entityType) => register("postRenderEntity", cb).setFilteredClasses(entityType));
Event.createEvent("ma:renderTileEntity", (cb, tileEntityType) => register("renderTileEntity", cb).setFilteredClasses(tileEntityType));
Event.createEvent("ma:postRenderTileEntity", (cb, tileEntityType) => register("postRenderTileEntity", cb).setFilteredClasses(tileEntityType));
Event.createEvent("ma:entityJoin", (cb) => register(net.minecraftforge.event.entity.EntityJoinWorldEvent, (e) => cb(e.entity, e.entity.func_145782_y(), e)));
Event.createEvent("ma:endermanTP", (cb) => register(net.minecraftforge.event.entity.living.EnderTeleportEvent, cb));
// Goldor sections
register("worldLoad", () => {
    Data.goldorsection = 0;
});
// Hud save
register("gameUnload", () => {
  hud.save();
  HudData.save();
});
// Goldor section changer
register("chat", (message) =>
    [
      {
        predicate: msg => msg.startsWith("[BOSS] Storm: I should have known that I stood no chance."),
        action: () => Data.goldorsection = 1
      },
      {
        predicate: msg => (msg.includes("(7/7)") || msg.includes("(8/8)")) && !msg.includes(":"),
        action: () => Data.goldorsection += 1
      },
      {
        predicate: msg => msg === "The Core entrance is opening!",
        action: () => Data.goldorsection = 5
      },
      {
        predicate: msg => msg === "[BOSS] Necron: You went further than any human before, congratulations.",
        action: () => Data.goldorsection = 0
      }
    ].find(({ predicate }) => predicate(message))?.action()
).setCriteria("${message}");  
// Format numbers
export function formatNumber(number) {
    const num = parseFloat(number.toString().replace(/,/g, ''));
    const threshold = thresholds.find(({ value }) => num >= value);
    return threshold
      ? `${(num / threshold.value).toFixed(threshold.precision)}${threshold.symbol}`
      : num;
}
// Send message to webhook url
export function SendMsg(webhookUrl, message) {
  return fetch(webhookUrl, {
      method: "POST",
      body: { content: message }
  });
}