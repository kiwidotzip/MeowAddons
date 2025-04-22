import settings from "../config";
import { LocalStore } from "../../tska/storage/LocalStore";
import { Render3D } from "../../tska/rendering/Render3D";
import { Huds } from "../../Krun/Huds";
import { FeatManager } from "./helperfunction";

const slayerbossdisplay = FeatManager.createFeature("slayerbossdisplay");
const slayerkilltimer = FeatManager.createFeature("slayerkilltimer");       
const slayerbosshighlight = FeatManager.createFeature("slayerbosshighlight");

const data = new LocalStore("Krun", {});
const huds = new Huds(data);
const GUI = huds.createTextHud("Slayer Display", 120, 10, "a\n☠ &bVoidgloom Seraph IV");
const BOSS_HP_REGEX = /☠ (.+?)\s*(?:ᛤ\s*)?([\d\.]+[MK]?\s*(?:Hits|❤))(?:\s*✯)?/i;
let bossID = null, hpEntity = null, timerEntity = null;
let bossName = "", hp = "", timestarted = 0;

const eHpEntity = () => !!hpEntity;
const resetBossTracker = () => [timestarted, bossID, hpEntity, timerEntity] = [0, null, null, null];

slayerbossdisplay.register("stepFps", () => {
    World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityArmorStand"))
        .forEach(entity => {
            if (entity.entity.func_145782_y() !== bossID + 1) return;
            const name = ChatLib.removeFormatting(entity.entity.func_70005_c_());
            const match = name.match(BOSS_HP_REGEX);
            if (match) {
                [bossName, hp] = [match[1], match[2]];
            }
        });
}, 10)

register(Java.type("net.minecraftforge.event.entity.EntityJoinWorldEvent"), (entity) => {
    if (settings().slayerbossdisplay || settings().slayerkilltimer) {
        Client.scheduleTask(1, () => {
            const name = ChatLib.removeFormatting(entity.entity.func_70005_c_());
            if (name.includes("Spawned by") && name.split("by: ")[1] === Player.getName()) {
                const armorStandID = entity.entity.func_145782_y();
                bossID = armorStandID - 3;
                hpEntity = World.getWorld().func_73045_a(bossID + 1);
                timerEntity = World.getWorld().func_73045_a(bossID + 2);
                timestarted = Date.now();
            }
        });
    }
})

register("entityDeath", (entity) => {
    const bossIDdeath = entity.entity.func_145782_y();
    if (bossIDdeath === bossID) {
        const timeTaken = Date.now() - timestarted;
        if (settings().slayerkilltimer) {
            ChatLib.chat(`&e[MeowAddons] &fYou killed your boss in &b${(timeTaken / 1000).toFixed(2)}s&f.`)
        };
        resetBossTracker();
    }
});


slayerbossdisplay.registersub("renderOverlay", () => {
    Renderer.translate(GUI.getX(), GUI.getY());
    Renderer.scale(GUI.getScale());
    Renderer.retainTransforms(true);
    const hpOffset = Renderer.getStringWidth(`&c☠ &b${bossName}`) - Renderer.getStringWidth(hp);
    const timerText = ChatLib.removeFormatting(timerEntity.func_70005_c_());
    Renderer.drawStringWithShadow(`&c${timerText}`, 0, 0);
    Renderer.drawStringWithShadow(`&c${hp}`, hpOffset, 0);
    Renderer.drawStringWithShadow(`&c☠ &b${bossName}`, 0, 10);
    Renderer.retainTransforms(false);
    Renderer.finishDraw()
}, () => eHpEntity())


slayerbosshighlight.register("postRenderEntity", (ent, pos) => {
    if (ent.entity.func_145782_y() !== bossID) return;
    Render3D.renderEntityBox(
        pos.getX(),
        pos.getY(),
        pos.getZ(),
        ent.getWidth(),
        ent.getHeight(),
        0, 255, 255, 255, 2, false, false
    )
}, net.minecraft.entity.monster.EntityEnderman || net.minecraft.entity.passive.EntityWolf || net.minecraft.entity.monster.EntitySpider || net.minecraft.entity.monster.EntityZombie);

register("command", () => huds.open()).setName(`meowdevonlypls`);
register("chat", () => resetBossTracker()).setCriteria(/&r  &r&c&lSLAYER QUEST FAILED!&r/)

GUI.onDraw(() => {
    Renderer.translate(GUI.getX(), GUI.getY());
    Renderer.scale(GUI.getScale());
    Renderer.drawStringWithShadow("&c03:59               &e64.2M &c❤\n&c☠ &bVoidgloom Seraph IV" , 0, 0);
    Renderer.finishDraw();
})

register("gameUnload", () => {
    huds.save();
    data.save();
});