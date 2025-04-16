import Config from "../config";
import { registerWhen } from "./utils/renderutils";

const partyPatterns = [
    [/^&eThe party leader, ?&r&(.)(?:\[[^\]]+\] )?(\w+) &r&ehas disconnected/, false],
    [/^&eThe party leader ?&r&(.)(?:\[[^\]]+\] )?(\w+) &r&ehas rejoined/, true],
    [/^&(.)(?:\[[^\]]+\] )?(\w+) &r&ehas disconnected/, false],
    [/^&(.)(?:\[[^\]]+\] )?(\w+) &r&ehas rejoined/, true]
];

registerWhen(register("chat", (event) => {
    const message = ChatLib.getChatMessage(event);
    
    for (const [regex, isJoin] of partyPatterns) {
        const match = message.match(regex);
        if (!match) return;
        cancel(event);
        const [, rankColor, username] = match;
        ChatLib.chat(`&9P ${isJoin ? "&2>>" : "&4<<"}&r &${rankColor}${username}`);
        return;
    }
}), () => Config().cleanpartyjoin && Config().cleantoggle)