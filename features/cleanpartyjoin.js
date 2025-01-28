import Config from "../config";

const rankColors = {
    "Admin": "&c",
    "Mod": "&2",
    "Helper": "&9",
    "GM": "&2",
    "MVP++": "&6",
    "MVP+": "&b",
    "MVP": "&b",
    "VIP+": "&a",
    "VIP": "&a",
};

function handlemessage(hypixelrank, username, event, messageType) {
    if (!Config().cleanpartyjoin) return;
    if (!Config().cleantoggle) return;

    const rankNameMatch = hypixelrank ? hypixelrank.match(/\[(.+?)\]/) : null;
    const rankName = rankNameMatch ? rankNameMatch[1] : null;
    const rankColor = rankColors[rankName] || "&7";

    cancel(event);

    const arrow = messageType === "join" ? "&2>>" : "&4<<";
    ChatLib.chat(`&9P ${arrow}&r ${rankColor}${username}`);
    console.log(`${hypixelrank}`);
}

register("chat", (hypixelrank, username, event) => {
    handlemessage(hypixelrank, username, event, "leave");
}).setCriteria(/The party leader, ?(\[.+?\])? ?(\w{1,16}) has disconnected, they have 5 minutes to rejoin before the party is disbanded\./);

register("chat", (hypixelrank, username, event) => {
    handlemessage(hypixelrank, username, event, "join");
}).setCriteria(/The party leader ?(\[.+?\])? ?(\w{1,16}) has rejoined\./);

register("chat", (hypixelrank, username, event) => {
    handlemessage(hypixelrank, username, event, "leave");
}).setCriteria(/(\[.+?\])? ?(\w{1,16}) has disconnected, they have 5 minutes to rejoin before they are removed from the party./);

register("chat", (hypixelrank, username, event) => {
    handlemessage(hypixelrank, username, event, "join");
}).setCriteria(/(\[.+?\])? ?(\w{1,16}) has rejoined\./);
