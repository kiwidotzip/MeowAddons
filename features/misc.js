import { FeatManager } from "./helperfunction"
import Config from "../config"

// Overlay thing

const ShowCMD = FeatManager.createFeature("showcmd")

ShowCMD
    .register("chatComponentHovered", (comp) => {
        if (!comp.getClickValue()) return
        const newValue = new TextComponent(comp.getHoverValue() 
                        ? comp.getHoverValue() + "\n&e[MA] &7| &fRuns &c\"&n" + comp.getClickValue() + "&c\"" 
                        : "&e[MA] &7| &fRuns &c\"&n" + comp.getClickValue() + "&c\"")
        comp.setHoverValue(newValue.getText())
    })

// Reaper highlight

const ReaperHG = FeatManager.createFeature("reaperhighlight")
let ReaperColor = Renderer.color(...Config().reaperhgcolor)

ReaperHG
    .register("renderSlot", (slot) => {
        const [x, y] = [slot.getDisplayX(), slot.getDisplayY()]
        if (slot?.getItem()?.getName()?.removeFormatting()?.includes("Reaper")) Renderer.drawCircle(ReaperColor, x + 8, y + 8, 8, 20)
    })

Config().getConfig().registerListener("reaperhgcolor", (oldv, newv) => ReaperColor = Renderer.color(...newv))