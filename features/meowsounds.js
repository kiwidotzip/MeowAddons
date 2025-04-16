import Config from "../config"
import { registerWhen } from "./utils/renderutils";
const sounds = ["mob.cat.meow", "mob.cat.purreow", "mob.cat.straymeow"]

registerWhen(register("chat", (message, event) => {
        if (message.toLowerCase().includes("meow")) {
            let random = Math.floor(Math.random() * sounds.length)
            World.playSound(sounds[random], 1, 1);
        }
    }).setCriteria(/(?:Guild|Party|Co-op|From|To)? ?(?:>)? ?(?:\[.+?\])? ?(?:[a-zA-Z0-9_]+) ?(?:\[.+?\])?: (.+)/), () => Config().meowsounds)
