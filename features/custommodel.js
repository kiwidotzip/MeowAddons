import Settings from "../config";
import { registerWhen } from "../../BloomCore/utils/Utils";
import PogObject from "../../PogData"

// Thanks Noamm99 <3 for helping out with like almost all this code

const ResLoc = Java.type("net.minecraft.util.ResourceLocation");
const storage = new PogObject("MeowAddons", {
    texcst: "textures/entity/cat/ocelot.png",
    modelcst: "net.minecraft.client.model.ModelOcelot",
}, "./data/meowcustommodel.json")
const ModelOcelot = Java.type(storage.modelcst);
const model = new ModelOcelot();
const lerp = (a, b, t) => a + (b - a) * t;
const clamp180 = a => ((a + 180) % 360 + 360) % 360 - 180;
const textures = {
    black: "textures/entity/cat/black.png",
    red: "textures/entity/cat/red.png",
    ocelot: "textures/entity/cat/ocelot.png",
    siamese: "textures/entity/cat/siamese.png",
    creeper: "textures/entity/creeper/creeper.png",
};

register("command", (arg) => {
    if (textures[arg]) storage.texcst = textures[arg];
    storage.save();
}).setName("macattexture");

function drawCustomModel(pt) {
    if (Client.settings.getSettings().field_74320_O === 0) return;

    const tex = new ResLoc(storage.texcst);
    const player = Player.getPlayer();
    const bodyYaw = lerp(player.field_70760_ar, player.field_70761_aq, pt);
    const headYaw = clamp180(lerp(player.field_70758_at, player.field_70759_as, pt) - bodyYaw);
    const pitch = lerp(player.field_70127_C, player.field_70125_A, pt);
    const limb = lerp(player.field_184619_aG ?? player.field_70754_ba, player.field_70754_ba, pt);
    const limbAmt = lerp(player.field_184618_aF ?? player.field_70721_aZ, player.field_70721_aZ, pt);

    GlStateManager.func_179094_E(); // pushMatrix
    GlStateManager.func_179145_e(); // enableRescaleNormal
    GlStateManager.func_179129_p(); // enableAlpha
    GlStateManager.func_179118_c(); // enableBlend
    GlStateManager.func_179139_a(Settings().customX * 10, Settings().customY * 10, Settings().customZ * 10); // scale
    GlStateManager.func_179137_b(0, 0.24, 0); // translate
    GlStateManager.func_179114_b(-bodyYaw, 0, 1, 0); // rotate

    Client.getMinecraft().func_110434_K().func_110577_a(tex);

    model.func_78088_a(
      player,                        // entity
      limb,                          // limb swing
      limbAmt,                       // limb swing amount
      player.func_70654_ax() + pt,   // ageInTicks
      -Math.max(-90, Math.min(90, headYaw)), // netHeadYaw
      pitch,                         // headPitch
      -0.01                          // scale
    );

    GlStateManager.func_179089_o(); // disableBlend
    GlStateManager.func_179141_d(); // disableAlpha
    GlStateManager.func_179121_F(); // popMatrix
}


registerWhen(register("renderEntity", e => {
    if (e.entity != Player.getPlayer()) return
    GlStateManager.func_179094_E(); // pushMatrix
    GlStateManager.func_179137_b(0, 500, 0); // translate
}), () => Settings().custommodel)

registerWhen(register("renderEntity", (e, _, pt, event) => {
    if (e.entity != Player.getPlayer()) return
    GlStateManager.func_179121_F(); // popMatrix
    drawCustomModel(pt)
}), () => Settings().custommodel)
