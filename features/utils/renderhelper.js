const RenderGlobal = Java.type("net.minecraft.client.renderer.RenderGlobal");
const AxisAlignedBB = Java.type("net.minecraft.util.AxisAlignedBB");

// Taken from doc's renderhelper, ily doc (https://github.com/DocilElm/Doc)

export default function drawEntityBox(x, y, z, width, height, red, green, blue, alpha, lineWidth = 1, phase = false) {
    if (x == null) return;
    
    const aabb = new AxisAlignedBB(
        x - width / 2, y, z - width / 2,
        x + width / 2, y + height, z + width / 2
    );
    
    GlStateManager.func_179090_x(); // disableTexture2D
    GlStateManager.func_179147_l(); // enableBlend
    GlStateManager.func_179140_f(); // disableLighting
    GlStateManager.func_179118_c(); // disableAlpha
    GlStateManager.func_179120_a(770, 771, 1, 0); // tryBlendFuncSeparate
    
    GL11.glLineWidth(lineWidth);
    
    if (phase) GlStateManager.func_179097_i(); // disableDepth
    
    RenderGlobal.func_181563_a(aabb, red, green, blue, alpha);
    
    if (phase) GlStateManager.func_179126_j(); // enableDepth
    
    GlStateManager.func_179084_k(); // disableBlend
    GlStateManager.func_179141_d(); // enableAlpha
    GlStateManager.func_179098_w(); // enableTexture2D
    GlStateManager.func_179131_c(1, 1, 1, 1); // color
    GlStateManager.func_179145_e(); // enableLighting
    
    GL11.glLineWidth(2);
}
