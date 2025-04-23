import { formatNumber, FeatManager } from "./helperfunction";

const BetterBZ = FeatManager.createFeature("betterbz");
const BZPrefix = message => ChatLib.chat("§6[BZ]§r " + message);
const Replacements = { "Enchanted": "Ench.", "Ultimate": "Ult." };

BetterBZ
    .register("chat", (amt, item, price, event) => {
        BZPrefix(`§c§lInsta-Bought! §r§c${amt}§rx §c${item.replace(Replacements)}§r for §6${price}&r coins!`);
        cancel(event);
    }, "[Bazaar] Bought ${amt}x ${item} for ${price} coins!")
    .register("chat", (amt, item, price, event) => {
        BZPrefix(`§c§lBuy Order Setup! §r§c${amt}§rx §c${item.replace(Replacements)}§r for §6${formatNumber(price)}&r coins!`);
        cancel(event);
    }, "[Bazaar] Buy Order Setup! ${amt}x ${item} for ${price} coins.")
    .register("chat", (amt, item, event) => {
        BZPrefix(`§a§lBuy Order Filled! §r§c${amt}§rx §c${item.replace(Replacements)}§r!`);
        cancel(event);
    }, "[Bazaar] Your Buy Order for ${amt}x ${item} was filled!")
    .register("chat", (price, event) => {
        BZPrefix(`§c§lCancelled Order!§r Refunded §6${formatNumber(price)}&r coins!`);
        cancel(event);
    }, "[Bazaar] Cancelled! Refunded ${price} coins from cancelling Buy Order!")
    .register("chat", (amt, item, totalprice, peritemprice, event) => {
        let msg = "";
        if (totalprice != peritemprice) msg = `(§6${peritemprice}§r each!)`;
        BZPrefix(`Buy Order Claimed! §c${amt}§rx §c${item.replace(Replacements)}§r for §6${formatNumber(totalprice)}&r coins! ${msg}`);
        cancel(event);
    }, "[Bazaar] Claimed ${amt}x ${item} worth ${totalprice} coins bought for ${peritemprice} each!")
    .register("chat", (amt, item, price, event) => {
        BZPrefix(`§c§lInsta-Sold! §r§c${amt}§rx §c${item.replace(Replacements)}§r for §6${formatNumber(price)}&r coins!`);
        cancel(event);
    }, "[Bazaar] Sold ${amt}x ${item} for ${price} coins!")
    .register("chat", (amt, item, price, event) => {
        BZPrefix(`§c§lSell Offer Setup! §r§c${amt}§rx §c${item.replace(Replacements)}§r for §6${formatNumber(price)}&r coins!`);
        cancel(event);
    }, "[Bazaar] Sell Offer Setup! ${amt}x ${item} for ${price} coins.")
    .register("chat", (amt, item, event) => {
        BZPrefix(`§a§lSell Offer Filled! §r§c${amt}§rx §c${item.replace(Replacements)}§r!`);
        cancel(event);
    }, "[Bazaar] Your Sell Offer for ${amt}x ${item} was filled!")
    .register("chat", (amt, item, event) => {
        BZPrefix(`§c§lCancelled Order!§r Refunded §6${amt}§rx §c${item.replace(Replacements)}§r!`);
        cancel(event);
    }, "[Bazaar] Cancelled! Refunded ${amt}x ${item} from cancelling Sell Offer!")
    .register("chat", (amt, item, totalprice, peritemprice, event) => {
        let msg = "";
        if (totalprice != peritemprice) msg = `(§6${peritemprice}§r each!)`;
        BZPrefix(`Sell Order Claimed! §c${amt}§rx §c${item.replace(Replacements)}§r for §6${formatNumber(totalprice)}&r coins! ${msg}`);
        cancel(event);
    }, "[Bazaar] Claimed ${amt}x ${item} worth ${totalprice} coins sold for ${peritemprice} each!");