import Config from "../config";
import { formatNumber } from "./helperfunction";
import { registerWhen } from "./utils/renderutils";

const playerusername = Player.getName();
const AHPrefix = msg => ChatLib.chat(`§6[AH]§r ${msg}`);

registerWhen(register("chat", event => {
    cancel(event);
}).setCriteria("§b-----------------------------------------------------"), () => Config().betterah);

registerWhen(register("chat", (item, price, event) => {
    AHPrefix(`Bought §c${item} §rfor §6${formatNumber(price)}§r coins!`);
    cancel(event);
}).setCriteria("You purchased ${item} for ${price} coins!"), () => Config().betterah);

registerWhen(register("chat", (buyer, item, price, event) => {
    AHPrefix(`§a${buyer} §rbought §c${item} §rfor §6${formatNumber(price)}§r coins!`);
    cancel(event);
}).setCriteria("[Auction] ${buyer} bought ${item} for ${price} coins CLICK"), () => Config().betterah);

registerWhen(register("chat", (item, event) => {
    AHPrefix(`§a§lBIN Started!§r §a${playerusername}§r is selling §c${item}§r!`);
    cancel(event);
}).setCriteria("BIN Auction started for ${item}!"), () => Config().betterah);

registerWhen(register("chat", (price, item, rank, buyer, event) => {
    AHPrefix(`Collected §6${formatNumber(price)}§r coins from §c${item} §rto §a${buyer}§r!`);
    cancel(event);
}).setCriteria("You collected ${price} coins from selling ${item} to ${rank} ${buyer} in an auction!"), () => Config().betterah);

registerWhen(register("chat", (item, event) => {
    AHPrefix(`§a§lAUCTION STARTED!§r §a${playerusername}§r started auction for §c${item}§r!`);
    cancel(event);
}).setCriteria("Auction started for ${item}!"), () => Config().betterah);

registerWhen(register("chat", (item, event) => {
    AHPrefix(`§c§lAUCTION CANCELLED!§r §a${playerusername}§r cancelled auction for §c${item}§r!`);
    cancel(event);
}).setCriteria("You canceled your auction for ${item}!"), () => Config().betterah);

registerWhen(register("chat", (rank, player, price, event) => {
    cancel(event);
}).setCriteria("[${rank}] ${player} collected an auction for ${price} coins!"), () => Config().betterah);
