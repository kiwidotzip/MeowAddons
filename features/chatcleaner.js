import uselessMsgs from "./chatcleanerentry";
import { FeatManager } from "./helperfunction";

const chatcleaner = FeatManager.createFeature("chatcleaner")
uselessMsgs.forEach(msg => {
    chatcleaner.register("chat", e => cancel(e), msg)
})