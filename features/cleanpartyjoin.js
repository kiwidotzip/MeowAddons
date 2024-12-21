import Settings from "../config";

register("chat", (rank, username, event) => {
    if (!Settings.cleanpartyjoin) return;
    cancel(event);
    ChatLib.chat(`&9P &4<<&r &9${username}`);
}).setCriteria(/The party leader, (?:\[([^\]]*?)\] )?(\w{1,16}) has disconnected, they have 5 minutes to rejoin before the party is disbanded\./);

register("chat", (rank, username, event) => {
    if (!Settings.cleanpartyjoin) return;
    cancel(event);
    ChatLib.chat(`&9P &2>>&r &9${username}`);
}).setCriteria(/The party leader (?:\[([^\]]*?)\] )?(\w{1,16}) has rejoined\./);

register("chat", (rank, username, event) => {
    if (!Settings.cleanpartyjoin) return;
    cancel(event);
    ChatLib.chat(`&9P &4<<&r &9${username}`);
}).setCriteria(/(?:\[([^\]]*?)\] )?(\w{1,16}) has disconnected, they have 5 minutes to rejoin before they are removed from the party./);

register("chat", (rank, username, event) => {
    if (!Settings.cleanpartyjoin) return;
    cancel(event);
    ChatLib.chat(`&9P &2>>&r &9${username}`);
}).setCriteria(/(?:\[([^\]]*?)\] )?(\w{1,16}) has rejoined\./);