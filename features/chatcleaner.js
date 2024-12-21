import Settings from "../config";
import uselessMsgs from "./chatcleanerentry"

uselessMsgs.forEach(msg => {
    register("chat", event => {
        if (!Settings.chatcleaner) return
       cancel(event)
    }).setCriteria(msg)
})
