import Config from "../config";
import { FeatManager } from "./helperfunction";
const sendTermInChat = FeatManager.createFeature("sendTermInChat");

sendTermInChat.register("chat", () => {
    if (Config().sendTermInChat != 5) ChatLib.command(`pc I will do ${parseInt(Config().sendTermInChat)}!`);
    if (Config().sendTermInChat == 5) ChatLib.command("pc I will do devices!");
}, "[BOSS] Storm: I should have known that I stood no chance.")