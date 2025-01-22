import Config from "../config"
const sounds = ["mob.cat.hit", "mob.cat.meow", "mob.cat.purreow", "mob.cat.straymeow"]

register("chat", (message, event) => {
    if (!Config().meowsounds) return;
        if (message.toLowerCase().includes("meow")) {
            let random = Math.floor(Math.random() * sounds.length)
            World.playSound(sounds[random], 1, 1);
        }
    }).setCriteria(/(?:Guild|Party|Co-op|From|To)? ?(?:>)? ?(?:\[.+?\])? ?(?:[a-zA-Z0-9_]+) ?(?:\[.+?\])?: (.+)/)