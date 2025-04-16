import Config from "../config";
import { registerWhen } from "./utils/renderutils";
import { Render3D } from "../../tska/rendering/Render3D";

// Credit to DocilElm's Doc module for like 70% of the code lmao <3
const {
  field_150350_a: Air,
  field_150356_k: FlowingLava,
  field_150353_l: Lava,
  field_150358_i: FlowingWater,
  field_150355_j: Water,
} = net.minecraft.init.Blocks;
const ignored = new Set([Air, FlowingLava, Lava, FlowingWater, Water]);
const cachedColors = new Map()
const getColor = (colors) => {
    const [ r, g, b, a ] = colors

    if (cachedColors.has(colors.toString())) return cachedColors.get(colors.toString())

    const javaColor = new java.awt.Color(r / 255, g / 255, b / 255, a / 255)

    cachedColors.set(colors.toString(), javaColor)

    return javaColor
}

registerWhen(register("drawBlockHighlight", ({x, y, z}, event) => { 
    const ctBlock = World.getBlockAt(x, y, z)
    if (ignored.has(ctBlock.type.mcBlock)) return cancel(event);
    const phase = !(Client.settings.getSettings()?.field_74320_O === 1)
    const color = getColor(Config().blockoverlaycolor)
    const pticks = event.partialTicks

    const [ r, g, b, a ] = [color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha()]

    cancel(event)
    
    if (!Config().blockoverlayfill) Render3D.outlineBlock(ctBlock, r, g, b, a, phase, 2, true, pticks);
    if (Config().blockoverlayfill) Render3D.filledBlock(ctBlock, r, g, b, a, phase, 2, true, pticks);
}), () => Config().blockoverlay)