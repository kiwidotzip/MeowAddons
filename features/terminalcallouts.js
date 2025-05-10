import Config from "../config";
import { FeatManager } from "./helperfunction";
const sendTermInChat = FeatManager.createFeature("sendTermInChat");

sendTermInChat.register("chat", () => {
    ChatLib.command(Config().sendTermInChat == 5 ? "pc I will do devices!" : `pc I will do ${parseInt(Config().sendTermInChat)}!`)
}, "[BOSS] Storm: I should have known that I stood no chance.")