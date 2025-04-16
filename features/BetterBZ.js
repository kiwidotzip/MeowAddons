import Config from "../config";
import { formatNumber } from "./helperfunction";
import { registerWhen } from "./utils/renderutils";

const BZPrefix = message => ChatLib.chat("§6[BZ]§r " + message);
const Replacements = { "Enchanted": "Ench.", "Ultimate": "Ult." };

registerWhen(register("chat",(amt,item,price,event)=>{
    BZPrefix(`§c§lInsta-Bought! §r§c${amt}§rx §c${item.replace(Replacements)}§r for §6${price}&r coins!`);
    cancel(event);
}).setCriteria("[Bazaar] Bought ${amt}x ${item} for ${price} coins!"),()=>Config().betterbz);

registerWhen(register("chat",(amt,item,price,event)=>{
    BZPrefix(`§c§lBuy Order Setup! §r§c${amt}§rx §c${item.replace(Replacements)}§r for §6${formatNumber(price)}&r coins!`);
    cancel(event);
}).setCriteria("[Bazaar] Buy Order Setup! ${amt}x ${item} for ${price} coins."),()=>Config().betterbz);

registerWhen(register("chat",(amt,item,event)=>{
    BZPrefix(`§a§lBuy Order Filled! §r§c${amt}§rx §c${item.replace(Replacements)}§r!`);
    cancel(event);
}).setCriteria("[Bazaar] Your Buy Order for ${amt}x ${item} was filled!"),()=>Config().betterbz);

registerWhen(register("chat",(price,event)=>{
    BZPrefix(`§c§lCancelled Order!§r Refunded §6${formatNumber(price)}&r coins!`);
    cancel(event);
}).setCriteria("[Bazaar] Cancelled! Refunded ${price} coins from cancelling Buy Order!"),()=>Config().betterbz);

registerWhen(register("chat",(amt,item,totalprice,peritemprice,event)=>{
    let msg="";
    if(totalprice!=peritemprice)msg=`(§6${peritemprice}§r each!)`;
    BZPrefix(`§a§lBuy Order Claimed! §r§c${amt}§rx §c${item}§r for §6${formatNumber(totalprice)}&r coins! ${msg}`);
    cancel(event);
}).setCriteria("[Bazaar] Claimed ${amt}x ${item} worth ${totalprice} coins bought for ${peritemprice} each!"),()=>Config().betterbz);

registerWhen(register("chat",(amt,item,price,event)=>{
    BZPrefix(`§a§lInsta-Sold! §r§c${amt}§rx §c${item.replace(Replacements)}§r for §6${formatNumber(price)}&r coins!`);
    cancel(event);
}).setCriteria("[Bazaar] Sold ${amt}x ${item} for ${price} coins!"),()=>Config().betterbz);

registerWhen(register("chat",(amt,item,price,event)=>{
    BZPrefix(`§c§lSell Offer Setup! §r§c${amt}§rx §c${item.replace(Replacements)}§r for §6${formatNumber(price)}&r coins!`);
    cancel(event);
}).setCriteria("[Bazaar] Sell Offer Setup! ${amt}x ${item} for ${price} coins."),()=>Config().betterbz);

registerWhen(register("chat",(amt,item,event)=>{
    BZPrefix(`§a§lSell Offer Filled! §r§c${amt}§rx §c${item.replace(Replacements)}§r!`);
    cancel(event);
}).setCriteria("[Bazaar] Your Sell Offer for ${amt}x ${item} was filled!"),()=>Config().betterbz);

registerWhen(register("chat",(amt,item,event)=>{
    BZPrefix(`§c§lCancelled Order!§r Refunded §6${amt}§rx §c${item}§r!`);
    cancel(event);
}).setCriteria("[Bazaar] Cancelled! Refunded ${amt}x ${item} from cancelling Sell Offer!"),()=>Config().betterbz);

registerWhen(register("chat",(amt,item,totalprice,peritemprice,event)=>{
    let msg="";
    if(totalprice!=peritemprice)msg=`(§6${peritemprice}§r each!)`;
    BZPrefix(`Sell Order Claimed! §c${amt}§rx §c${item.replace(Replacements)}§r for §6${formatNumber(totalprice)}&r coins! ${msg}`);
    cancel(event);
}).setCriteria("[Bazaar] Claimed ${amt}x ${item} worth ${totalprice} coins sold for ${peritemprice} each!"),()=>Config().betterbz);
