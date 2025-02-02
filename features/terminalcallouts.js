import Config from "../config";

register("chat", () => {
    if (Config().sendTermInChat != 0 && Config().sendTermInChat != 5) 
        ChatLib.command(`pc I will do ${parseInt(Config().sendTermInChat)}!`);
    if (Config().sendTermInChat == 5) 
        ChatLib.command("pc I will do devices!");
}).setCriteria("[BOSS] Storm: I should have known that I stood no chance.")