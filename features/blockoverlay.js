import Config from "../config";
import { registerWhen } from "./utils/renderutils";
import { Render3D } from "../../tska/rendering/Render3D";

// Credit to DocilElm's Doc module for like 70% of the code lmao <3

const Blocks = net.minecraft.init.Blocks
const BlockFlowingLava = Blocks.field_150356_k
const BlockLava = Blocks.field_150353_l
const BlockFlowingWater = Blocks.field_150358_i
const BlockWater = Blocks.field_150355_j
const BlockAir = Blocks.field_150350_a

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
    const mcBlock = ctBlock.type.mcBlock
    if (mcBlock == BlockAir ||
        mcBlock == BlockFlowingLava ||
        mcBlock == BlockFlowingWater ||
        mcBlock == BlockLava ||
        mcBlock == BlockWater) return;
    const phase = !(Client.settings.getSettings()?.field_74320_O === 1)
    const color = getColor(Config().blockoverlaycolor)
    const pticks = event.partialTicks

    const [ r, g, b, a ] = [color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha()]

    cancel(event)
    
    if (!Config().blockoverlayfill) Render3D.outlineBlock(ctBlock, r, g, b, a, phase, 2, true, pticks);
    if (Config().blockoverlayfill) Render3D.filledBlock(ctBlock, r, g, b, a, phase, 2, true, pticks);
}), () => Config().blockoverlay)
