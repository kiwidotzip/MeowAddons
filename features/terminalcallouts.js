import Config from "../config";
import { registerWhen } from "./utils/renderutils";

registerWhen(register("chat", () => {
    if (Config().sendTermInChat != 5) 
        ChatLib.command(`pc I will do ${parseInt(Config().sendTermInChat)}!`);
    if (Config().sendTermInChat == 5) 
        ChatLib.command("pc I will do devices!");
}).setCriteria("[BOSS] Storm: I should have known that I stood no chance."), () => Config().sendTermInChat != 0)