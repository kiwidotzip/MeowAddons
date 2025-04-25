import Config from "../config";
import { Render3D } from "../../tska/rendering/Render3D";
import { FeatManager } from "./helperfunction";

// Credit to DocilElm's Doc module for like 70% of the code lmao <3

const DrawBlock = FeatManager.createFeature("blockoverlay")
const cachedColors = new Map();
const excludedBlocks = new Set([
    net.minecraft.init.Blocks.field_150350_a,    // BlockAir
    net.minecraft.init.Blocks.field_150356_k,    // FlowLava
    net.minecraft.init.Blocks.field_150353_l,    // StillLava
    net.minecraft.init.Blocks.field_150358_i,    // FlowWater
    net.minecraft.init.Blocks.field_150355_j     // StillWater
]);
const getColor = ([r,g,b,a]) => {
  const key = [r,g,b,a].toString();
  return cachedColors.has(key) ? cachedColors.get(key) : (cachedColors.set(key, new java.awt.Color(r/255,g/255,b/255,a/255)), cachedColors.get(key));
}

DrawBlock.register("drawBlockHighlight", (pos, event) => {
    const block = World.getBlockAt(pos.x, pos.y, pos.z);
    if ([...excludedBlocks].some(b => b?.getRegistryName?.() === block.type.mcBlock?.getRegistryName?.())) return;
    cancel(event);
    const color = getColor(Config().blockoverlaycolor);
    const phase = Client.settings.getSettings()?.field_74320_O !== 1;
    Config().blockoverlayfill
      ? Render3D.filledBlock(block, color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha(), phase, true, event.partialTicks)
      : Render3D.outlineBlock(block, color.getRed(), color.getGreen(), color.getBlue(), color.getAlpha(), phase, 2, true, event.partialTicks);
})