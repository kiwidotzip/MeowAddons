import Config from "../config";
import { registerWhen } from "./utils/renderutils";
import { Render3D } from "../../tska/rendering/Render3D";

// Credit to DocilElm's Doc module for like 70% of the code lmao <3

const cachedColors = new Map()
const getColor = (colors) => {
    const [ r, g, b, a ] = colors

    if (cachedColors.has(colors.toString())) return cachedColors.get(colors.toString())

    const javaColor = new java.awt.Color(r / 255, g / 255, b / 255, a / 255)

    cachedColors.set(colors.toString(), javaColor)

    return javaColor
}

registerWhen(register("blockHighlight", ({x, y, z}, event) => { 
    const ctBlock = World.getBlockAt(x, y, z)

    const phase = !(Client.settings.getSettings()?.field_74320_O === 1)
    const color = getColor(config().blockOverlayColor)
    const pticks = event.partialTicks

    const [ r, g, b, a ] = [color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha()]
    const [ r1, g1, b1 ] = [color.getRed(), color.getGreen(), color.getBlue()]

    cancel(event)
    
    Render3D.outlineBlock(ctBlock, r, g, b, a, phase, 2, true, pticks)
    if (Config().blockoverlayfill) Render3D.filledBlock(ctBlock, r, g, b, a, phase, 2, true, pticks)
}), () => Config().blockoverlay)