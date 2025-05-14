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

// Custom events

Event.createEvent("ma:renderEntity", (cb, entityType) => register("renderEntity", cb).setFilteredClasses(entityType));
Event.createEvent("ma:postRenderEntity", (cb, entityType) => register("postRenderEntity", cb).setFilteredClasses(entityType));
Event.createEvent("ma:renderTileEntity", (cb, tileEntityType) => register("renderTileEntity", cb).setFilteredClasses(tileEntityType));
Event.createEvent("ma:postRenderTileEntity", (cb, tileEntityType) => register("postRenderTileEntity", cb).setFilteredClasses(tileEntityType));
Event.createEvent("ma:entityJoin", (cb) => register(net.minecraftforge.event.entity.EntityJoinWorldEvent, (e) => cb(e.entity, e.entity.func_145782_y(), e)));
Event.createEvent("ma:endermanTP", (cb) => register(net.minecraftforge.event.entity.living.EnderTeleportEvent, cb));
Event.createEvent("ma:setSlot", (cb) => register("packetReceived", (p, evn) => cb(p.func_149175_c(), p.func_149173_d(), p.func_149174_e(), evn)).setFilteredClass(net.minecraft.network.play.server.S2FPacketSetSlot));

// Hud save

register("gameUnload", () => hud.save())

// Goldor section changer

const GSec = FeatManager.createFeatureNo("catacombs")
GSec
    .register("chat", () => Data.goldorsection = 1, "[BOSS] Storm: I should have known that I stood no chance.")
    .register("chat", () => Data.goldorsection += 1, /^\w{1,16} (?:activated|completed) a \w+! \((?:7\/7|8\/8)\)$/)
    .register("chat", () => Data.goldorsection = 5, "The Core entrance is opening!")
    .register("chat", () => Data.goldorsection = 0, "[BOSS] Necron: You went further than any human before, congratulations.")
    .onRegister(() => Data.goldorsection = 0)
    .onUnregister(() => Data.goldorsection = 0)

// Format numbers

const thresholds = [
    { value: 1e9, symbol: "b", precision: 1 },
    { value: 1e6, symbol: "m", precision: 1 },
    { value: 1e3, symbol: "k", precision: 1 }
]
export function formatNumber(number) {
    const num = parseFloat(number.toString().replace(/,/g, ''))
    const threshold = thresholds.find(({ value }) => num >= value)
    return threshold ? parseFloat((num / threshold.value).toFixed(threshold.precision)) + threshold.symbol : (Number.isInteger(num) ? Math.round(num) : num)
}

// Send message to webhook url
    
export const SendMsg = (webhookUrl, message) => fetch(webhookUrl, { method: "POST", body: { content: message }})