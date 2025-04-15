import Config from "../config";
import { formatNumber } from "./helperfunction";
import { registerWhen } from "./utils/renderutils";

const BZPrefix = message => ChatLib.chat("§6[BZ]§r " + message);
const Replacements = { "Enchanted": "Ench.", "Ultimate": "Ult." };

const patterns = [
    // Buy messages
    {
        regex: /^\[Bazaar\] Bought (\d+)x (.+) for (\d+) coins!$/,
        action: (amt, item, price) => 
            `§c§lInsta-Bought! §r§c${amt}§rx §c${item.replace(Replacements)}§r for §6${price}&r coins!`
    },
    {
        regex: /^\[Bazaar\] Buy Order Setup! (\d+)x (.+) for (\d+) coins\.$/,
        action: (amt, item, price) => 
            `§c§lBuy Order Setup! §r§c${amt}§rx §c${item.replace(Replacements)}§r for §6${formatNumber(price)}&r coins!`
    },
    {
        regex: /^\[Bazaar\] Your Buy Order for (\d+)x (.+) was filled!$/,
        action: (amt, item) => 
            `§a§lBuy Order Filled! §r§c${amt}§rx §c${item.replace(Replacements)}§r!`
    },
    {
        regex: /^\[Bazaar\] Cancelled! Refunded (\d+) coins from cancelling Buy Order!$/,
        action: (price) => 
            `§c§lCancelled Order!§r Refunded §6${formatNumber(price)}&r coins!`
    },
    {
        regex: /^\[Bazaar\] Claimed (\d+)x (.+) worth (\d+) coins bought for (\d+) each!$/,
        action: (amt, item, totalprice, peritemprice) => 
            `§a§lBuy Order Claimed! §r§c${amt}§rx §c${item}§r for §6${formatNumber(totalprice)}&r coins! ` +
            `${totalprice != peritemprice ? `(§6${peritemprice}§r each!)` : ''}`
    },
    // Sell messages
    {
        regex: /^\[Bazaar\] Sold (\d+)x (.+) for (\d+) coins!$/,
        action: (amt, item, price) => 
            `§a§lInsta-Sold! §r§c${amt}§rx §c${item.replace(Replacements)}§r for §6${formatNumber(price)}&r coins!`
    },
    {
        regex: /^\[Bazaar\] Sell Offer Setup! (\d+)x (.+) for (\d+) coins\.$/,
        action: (amt, item, price) => 
            `§c§lSell Offer Setup! §r§c${amt}§rx §c${item.replace(Replacements)}§r for §6${formatNumber(price)}&r coins!`
    },
    {
        regex: /^\[Bazaar\] Your Sell Offer for (\d+)x (.+) was filled!$/,
        action: (amt, item) => 
            `§a§lSell Offer Filled! §r§c${amt}§rx §c${item.replace(Replacements)}§r!`
    },
    {
        regex: /^\[Bazaar\] Cancelled! Refunded (\d+)x (.+) from cancelling Sell Offer!$/,
        action: (amt, item) => 
            `§c§lCancelled Order!§r Refunded §6${amt}§rx §c${item}§r!`
    },
    {
        regex: /^\[Bazaar\] Claimed (\d+)x (.+) worth (\d+) coins sold for (\d+) each!$/,
        action: (amt, item, totalprice, peritemprice) => 
            `Sell Order Claimed! §c${amt}§rx §c${item.replace(Replacements)}§r for §6${formatNumber(totalprice)}&r coins! ` +
            `${totalprice != peritemprice ? `(§6${peritemprice}§r each!)` : ''}`
    }
];

registerWhen(register("chat", (message, event) => {
    for (const { regex, action } of patterns) {
        const match = message.match(regex);
        if (!match) return;
        BZPrefix(action(...match.slice(1)));
        cancel(event);
        break;
    }
}).setCriteria("${message}"), () => Confif().betterbz