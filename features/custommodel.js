import Settings from "../config"
import { LocalStore } from "../../tska/storage/LocalStore";
import { FeatManager } from "./helperfunction";
const custommodel = FeatManager.createFeature("custommodel")
const ResLoc = Java.type("net.minecraft.util.ResourceLocation")

// Thanks @Noamm9 for helping out with like almost all of this <3

const data = new LocalStore("MeowAddons", {
    selectedType: "ocelot",
    selectedTexture: 0,
}, "./data/meowcustommodel.json")

const lerp = (a, b, t) => a + (b - a) * t
const clamp180 = a => ((a + 180) % 360 + 360) % 360 - 180
const limit90 = a => Math.max(-90, Math.min(90, a))

const types = {
    ocelot: {
        model: new net.minecraft.client.model.ModelOcelot(),
        textures: [
            new ResLoc("textures/entity/cat/ocelot.png"),  // 0
            new ResLoc("textures/entity/cat/black.png"),   // 1
            new ResLoc("textures/entity/cat/red.png"),     // 2
            new ResLoc("textures/entity/cat/siamese.png")  // 3
        ],
    },
    wolf: {
        model: new net.minecraft.client.model.ModelWolf(),
        textures: [new ResLoc("textures/entity/wolf/wolf.png")]
    },
    slime: {
        model: new net.minecraft.client.model.ModelSlime(16),
        textures: [new ResLoc("textures/entity/slime/slime.png")]
    },
    creeper: {
        model: new net.minecraft.client.model.ModelCreeper(),
        textures: [new ResLoc("textures/entity/creeper/creeper.png")]
    }
}

let x = Settings().customX
let y = Settings().customY
let z = Settings().customZ

Settings().getConfig()
    .registerListener("customX", (oldv, newv) => x = newv)
    .registerListener("customY", (oldv, newv) => y = newv)
    .registerListener("customZ", (oldv, newv) => z = newv)

function drawCustomModel(pt) {
    if (!Client.isInGui() && Client.settings.getSettings().field_74320_O === 0) return
    
    const tex = types[data.selectedType].textures[data.selectedTexture]
    const model = types[data.selectedType].model
    const player = Player.getPlayer()
    const bodyYaw = lerp(player.field_70760_ar, player.field_70761_aq, pt)
    const headYaw = clamp180(lerp(player.field_70758_at, player.field_70759_as, pt) - bodyYaw)
    const pitch = lerp(player.field_70127_C, player.field_70125_A, pt)
    const limb = lerp(player.field_184619_aG ?? player.field_70754_ba, player.field_70754_ba, pt)
    const limbAmt = lerp(player.field_184618_aF ?? player.field_70721_aZ, player.field_70721_aZ, pt)

    GlStateManager.func_179094_E() // pushMatrix
    GlStateManager.func_179145_e() // enableRescaleNormal
    GlStateManager.func_179129_p() // enableAlpha
    Tessellator.colorize(1, 1, 1, 1).disableLighting()
    GlStateManager.func_179118_c() // enableBlend
    GlStateManager.func_179139_a(x * 10, y * 10, z * 10) // scale
    GlStateManager.func_179137_b(0, 0.24, 0) // translate
    GlStateManager.func_179114_b(-bodyYaw, 0, 1, 0) // rotate

    Client.getMinecraft().func_110434_K().func_110577_a(tex)
    model.func_78088_a(player, limb, limbAmt, player.func_70654_ax() + pt, -limit90(headYaw), pitch, -0.01)

    GlStateManager.func_179089_o() // disableBlend
    GlStateManager.func_179141_d() // disableAlpha
    Tessellator.enableLighting()
    GlStateManager.func_179121_F() // popMatrix
}

custommodel
    .register("renderEntity", () => {
        GlStateManager.func_179094_E() // pushMatrix
        GlStateManager.func_179137_b(0, 500, 0) // translate
    }, net.minecraft.client.entity.EntityPlayerSP)
    .register("postRenderEntity", (e, pos, pt, event)=> {
        GlStateManager.func_179121_F() // popMatrix
        drawCustomModel(pt)
    }, net.minecraft.client.entity.EntityPlayerSP)
    .register("ma:command", (arg) => {
        const int = parseInt(arg)
        if (isNaN(int) || int < 0 || types[data.selectedType].textures.length-1 < int) return
        data.selectedTexture = int
    }, "macattexture")
    .register("ma:command", (arg) => {
        if (!types[arg]) return
        data.selectedType = arg
        data.selectedTexture = 0
    }, "macatmodel")