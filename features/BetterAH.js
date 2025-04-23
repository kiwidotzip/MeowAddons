import { formatNumber, FeatManager } from "./helperfunction";

const BetterAH = FeatManager.createFeature("betterah");
const playerusername = Player.getName();
const AHPrefix = msg => ChatLib.chat(`§6[AH]§r ${msg}`);

BetterAH
    .register("chat", (event) => cancel(event), "§b-----------------------------------------------------")
    .register("chat", (item, price, event) => {
        AHPrefix(`Bought §c${item} §rfor §6${formatNumber(price)}§r coins!`);
        cancel(event);
    }, "You purchased ${item} for ${price} coins!")
    .register("chat", (buyer, item, price, event) => {
        AHPrefix(`§a${buyer} §rbought §c${item} §rfor §6${formatNumber(price)}§r coins!`);
        cancel(event);
    }, "[Auction] ${buyer} bought ${item} for ${price} coins CLICK")
    .register("chat", (item, event) => {
        AHPrefix(`§a§lBIN Started!§r §a${playerusername}§r is selling §c${item}§r!`);
        cancel(event);
    }, "BIN Auction started for ${item}!")
    .register("chat", (price, item, rank, buyer, event) => {
        AHPrefix(`Collected §6${formatNumber(price)}§r coins from §c${item} §rto §a${buyer}§r!`);
        cancel(event);
    }, "You collected ${price} coins from selling ${item} to ${rank} ${buyer} in an auction!")
    .register("chat", (item, event) => {
        AHPrefix(`§a§lAUCTION STARTED!§r §a${playerusername}§r started auction for §c${item}§r!`);
        cancel(event);
    }, "Auction started for ${item}!")
    .register("chat", (item, event) => {
        AHPrefix(`§c§lAUCTION CANCELLED!§r §a${playerusername}§r cancelled auction for §c${item}§r!`);
        cancel(event);
    }, "You canceled your auction for ${item}!")
    .register("chat", (rank, player, price, event) => cancel(event), "[${rank}] ${player} collected an auction for ${price} coins!");