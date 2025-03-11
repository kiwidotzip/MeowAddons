const RenderGlobal = Java.type("net.minecraft.client.renderer.RenderGlobal");
const AxisAlignedBB = Java.type("net.minecraft.util.AxisAlignedBB");

export default function drawEntityBox(x, y, z, width, height, red, green, blue, alpha, lineWidth = 1, phase = false) {
    if (x == null) return;
    
    const aabb = new AxisAlignedBB(
        x - width / 2, y, z - width / 2,
        x + width / 2, y + height, z + width / 2
    );
    
    GlStateManager.func_179090_x();
    GlStateManager.func_179147_l();
    GlStateManager.func_179140_f();
    GlStateManager.func_179118_c();
    GlStateManager.func_179120_a(770, 771, 1, 0);
    
    GL11.glLineWidth(lineWidth);
    
    if (phase) GlStateManager.func_179097_i();
    
    RenderGlobal.func_181563_a(aabb, red, green, blue, alpha);
    
    if (phase) GlStateManager.func_179126_j();
    
    GlStateManager.func_179084_k();
    GlStateManager.func_179141_d();
    GlStateManager.func_179098_w();
    GlStateManager.func_179131_c(1, 1, 1, 1);
    GlStateManager.func_179145_e();
    
    GL11.glLineWidth(2);
}
