import Settings from "../config";
import { formatNumber } from "./helperfunction";

//Credit to ctbot/zyryon for code

const playerusername = Player.getName(); 
const AHPrefix = (msg) => {
    ChatLib.chat(`§6[AH]§r ` + msg);
};

register("chat", (item, price, event) => {
    if (!Settings.betterah) return;
    AHPrefix(`Bought §c${item} §rfor §6${formatNumber(price)}§r coins!`);
    cancel(event);
}).setCriteria("You purchased ${item} for ${price} coins!");

register("chat", (buyer, item, price, event) => {
    if (!Settings.betterah) return;
    AHPrefix(`§a${buyer} §rbought §c${item} §rfor §6${formatNumber(price)}§r coins!`);
    cancel(event);
}).setCriteria("[Auction] ${buyer} bought ${item} for ${price} coins CLICK");

register("chat", (item, event) => {
    if (!Settings.betterah) return;
    AHPrefix(`§a§lBIN Started!§r §a${playerusername}§r is selling §c${item}§r!`);
    cancel(event);
}).setCriteria("BIN Auction started for ${item}!");

register("chat", (price, item, rank, buyer, event) => {
    if (!Settings.betterah) return;
    AHPrefix(`Collected §6${formatNumber(price)}§r coins from §c${item} §rto §a${buyer}§r!`);
    cancel(event);
}).setCriteria("You collected ${price} coins from selling ${item} to ${rank} ${buyer} in an auction!");

register("chat", (item, event) => {
    if (!Settings.betterah) return;
    AHPrefix(`§a§lAUCTION STARTED!§r §a${playerusername}§r started auction for §c${item}§r!`);
    cancel(event);
}).setCriteria("Auction started for ${item}!");

register("chat", (item, event) => {
    if (!Settings.betterah) return;
    AHPrefix(`§c§lAUCTION CANCELLED!§r §a${playerusername}§r cancelled auction for §c${item}§r!`);
    cancel(event);
}).setCriteria("You canceled your auction for ${item}!");

register("chat", (rank, player, price, event) => {
    if (!Settings.betterah) return;
    cancel(event);
}).setCriteria("[${rank}] ${player} collected an auction for ${price} coins!");
