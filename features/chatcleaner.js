import Config from "../config";
import uselessMsgs from "./chatcleanerentry"

uselessMsgs.forEach(msg => {
    register("chat", event => {
        if (!Config().chatcleaner) return
       cancel(event)
    }).setCriteria(msg)
})
