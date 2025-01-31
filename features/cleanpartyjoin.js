import Config from "../config";

register("chat", (hypixelrankcolor, username, event) => {
    if (!Config().cleanpartyjoin) return;
    if (!Config().cleantoggle) return;
    cancel(event);
    ChatLib.chat(`&9P &4<<&r &${hypixelrankcolor}${username}`);
}).setCriteria(/^The party leader, ?^&(.)(?:\[[^\]]+\] )?(\w+) has disconnected, they have 5 minutes to rejoin before the party is disbanded\.&r$/);

register("chat", (hypixelrankcolor, username, event) => {
    if (!Config().cleanpartyjoin) return;
    if (!Config().cleantoggle) return;
    cancel(event);
    ChatLib.chat(`&9P &2>>&r &${hypixelrankcolor}${username}`);
}).setCriteria(/^The party leader ?&(.)(?:\[[^\]]+\] )?(\w+) has rejoined\.&r$/);

register("chat", (hypixelrankcolor, username, event) => {
    if (!Config().cleanpartyjoin) return;
    if (!Config().cleantoggle) return;
    cancel(event);
    ChatLib.chat(`&9P &4<<&r &${hypixelrankcolor}${username}`);
}).setCriteria(/^&(.)(?:\[[^\]]+\] )?(\w+) &r&ehas disconnected, they have &r&c5 &r&eminutes to rejoin before they are removed from the party.&r$/);

register("chat", (hypixelrankcolor, username, event) => {
    if (!Config().cleanpartyjoin) return;
    if (!Config().cleantoggle) return;
    cancel(event);
    ChatLib.chat(`&9P &2>>&r &${hypixelrankcolor}${username}`);
}).setCriteria(/^&(.)(?:\[[^\]]+\] )?(\w+) &r&ehas rejoined\.&r$/);
