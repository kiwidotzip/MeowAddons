import Config from "../config";
import uselessMsgs from "./chatcleanerentry";
import { registerWhen } from "./utils/renderutils";

uselessMsgs.forEach(msg => {
    registerWhen(register("chat", e => cancel(e)).setCriteria(msg), () => Config().chatcleaner)
})
