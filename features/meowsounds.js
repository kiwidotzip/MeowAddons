import { FeatManager } from "./helperfunction";
const meowsounds = FeatManager.createFeature("meowsounds");
const sounds = ["mob.cat.meow", "mob.cat.purreow", "mob.cat.straymeow"]

meowsounds.register("chat", (msg) => {
    if (msg.toLowerCase().includes("meow")) World.playSound(sounds[Math.floor(Math.random() * sounds.length)], 1, 1);
}, /(?:Guild|Party|Co-op|From|To)? ?(?:>)? ?(?:\[.+?\])? ?(?:[a-zA-Z0-9_]+) ?(?:\[.+?\])?: (.+)/);