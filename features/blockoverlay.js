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
const excludedBlocks = new Set([BlockAir, FlowLava, StillLava, FlowWater, StillWater]);
const colorCache = new Map();
const getColor = ([r, g, b, a]) => {
    const key = `${r},${g},${b},${a}`;
    return colorCache.get(key) || 
           colorCache.set(key, new java.awt.Color(r/255, g/255, b/255, a/255)).get(key);
};

registerWhen(register("drawBlockHighlight", (pos, event) => {
    const block = World.getBlockAt(pos.x, pos.y, pos.z);
    if (excludedBlocks.has(block.type.mcBlock)) return;
    cancel(event);
    
    const [r, g, b, a] = getColor(Config().blockoverlaycolor).getRGB().split(/, |,/);
    const phase = Client.settings.getSettings()?.field_74320_O !== 1;
    const partialTicks = event.partialTicks;

    Config().blockoverlayfill
        ? Render3D.filledBlock(block, r, g, b, a, phase, 2, true, partialTicks)
        : Render3D.outlineBlock(block, r, g, b, a, phase, 2, true, partialTicks);
}), () => Config().blockoverlay);
