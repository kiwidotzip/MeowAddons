import { FeatManager } from "./helperfunction"

const ShowCMD = FeatManager.createFeature("showcmd")

ShowCMD
    .register("chatComponentHovered", (comp) => {
        if (!comp.getClickValue()) return
        const newValue = new TextComponent(comp.getHoverValue() 
                        ? comp.getHoverValue() + "\n&e[MA] &7| &fRuns &c\"&n" + comp.getClickValue() + "&c\"" 
                        : "&e[MA] &7| &fRuns &c\"&n" + comp.getClickValue() + "&c\"")
        comp.setHoverValue(newValue.getText())
    })