const RenderGlobal = Java.type("net.minecraft.client.renderer.RenderGlobal");
const AxisAlignedBB = Java.type("net.minecraft.util.AxisAlignedBB");

export default function drawEntityBox(x, y, z, width, height, red, green, blue, alpha, lineWidth = 1, phase = false, translate = true, customTicks = null) {
    if (x == null) return;
    
    const aabb = new AxisAlignedBB(
        x - width / 2, y, z - width / 2,
        x + width / 2, y + height, z + width / 2
    );
    
    const renderView = Client.getMinecraft().func_175606_aa();
    const partialTicks = customTicks || Tessellator.getPartialTicks();
    
    const realX = renderView.field_70142_S + (renderView.field_70165_t - renderView.field_70142_S) * partialTicks;
    const realY = renderView.field_70137_T + (renderView.field_70163_u - renderView.field_70137_T) * partialTicks;
    const realZ = renderView.field_70136_U + (renderView.field_70161_v - renderView.field_70136_U) * partialTicks;
    
    GlStateManager.func_179094_E();
    GlStateManager.func_179090_x();
    GlStateManager.func_179147_l();
    GlStateManager.func_179140_f();
    GlStateManager.func_179118_c();
    GlStateManager.func_179120_a(770, 771, 1, 0);
    
    GL11.glLineWidth(lineWidth);
    
    if (translate) GlStateManager.func_179137_b(-realX, -realY, -realZ);
    if (phase) GlStateManager.func_179097_i();
    
    RenderGlobal.func_181563_a(aabb, red, green, blue, alpha);
    
    if (translate) GlStateManager.func_179137_b(realX, realY, realZ);
    if (phase) GlStateManager.func_179126_j();
    
    GlStateManager.func_179084_k();
    GlStateManager.func_179141_d();
    GlStateManager.func_179098_w();
    GlStateManager.func_179131_c(1, 1, 1, 1);
    GlStateManager.func_179145_e();
    GlStateManager.func_179121_F();
    
    GL11.glLineWidth(2);
}