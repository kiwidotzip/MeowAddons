import Config from "../config";
import { formatNumber } from "./helperfunction";
import { registerWhen } from "./utils/renderutils";

const playerusername = Player.getName();
const AHPrefix = msg => ChatLib.chat(`§6[AH]§r ` + msg);

const patterns = [
    {
        regex: /^-{53}$/,
        action: () => {}
    },
    {
        regex: /^You purchased (.+) for (\d+) coins!$/,
        action: (item, price) => `Bought §c${item} §rfor §6${formatNumber(price)}§r coins!`
    },
    {
        regex: /^\[Auction\] (.+) bought (.+) for (\d+) coins CLICK$/,
        action: (buyer, item, price) => `§a${buyer} §rbought §c${item} §rfor §6${formatNumber(price)}§r coins!`
    },
    {
        regex: /^BIN Auction started for (.+)!$/,
        action: (item) => `§a§lBIN Started!§r §a${playerusername}§r is selling §c${item}§r!`
    },
    {
        regex: /^You collected (\d+) coins from selling (.+) to (.+) (.+) in an auction!$/,
        action: (price, item, rank, buyer) => `Collected §6${formatNumber(price)}§r coins from §c${item} §rto §a${buyer}§r!`
    },
    {
        regex: /^Auction started for (.+)!$/,
        action: (item) => `§a§lAUCTION STARTED!§r §a${playerusername}§r started auction for §c${item}§r!`
    },
    {
        regex: /^You canceled your auction for (.+)!$/,
        action: (item) => `§c§lAUCTION CANCELLED!§r §a${playerusername}§r cancelled auction for §c${item}§r!`
    },
    {
        regex: /^\[(.+)\] (.+) collected an auction for (\d+) coins!$/,
        action: () => {}
    }
];

registerWhen(register("chat", (message, event) => {
    for (const { regex, action } of patterns) {
        const match = message.match(regex);
        if (!match) return;
        AHPrefix(action(...match.slice(1)));
        cancel(event);
        break;
    }
}).setCriteria(${message}), () => Config().betterah)