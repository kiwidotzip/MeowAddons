import Config from "../config"

register("chat", (message, event) => {
    if (!Config().meowsounds) return;
        if (message.toLowerCase().includes("meow")) 
            World.playSound("mob.cat.meow", 1, 1);
    }).setCriteria(/(?:Guild|Party|Co-op|From|To)? ?(?:>)? ?(?:\[.+?\])? ?(?:[a-zA-Z0-9_]+) ?(?:\[.+?\])?: (.+)/)