import Config from "../config";
import { registerWhen } from "./utils/renderutils";

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
const sounds = ["mob.cat.meow", "mob.cat.purreow", "mob.cat.straymeow"]

registerWhen(register("entityDeath", (entity) => {
    if (entity == null) return
    if (entity.distanceTo(Player.getPlayer()) > Config().meowhitradius) return
    if (entity.getEntity() instanceof ArmorStand) return;

    playSFX()
    playParticles(entity)
}), () => Config().meowhitsound)

// Credit to Xynth 

const playSFX = () => {
    for (var i = 0; i < 2; i++) {
        setTimeout(() => {
            let random = Math.floor(Math.random() * sounds.length)
            World.playSound(sounds[random], 1, 0.9 + Math.random() * 0.2);

    }, i*120)}
}

const playParticles = (entity) => {
    let x = entity.getX();
    let y = entity.getY();
    let z = entity.getZ();

    for (var i = 0; i < 10; i++) {
        setTimeout(() => {
                if (Math.random() <= 0.66) {
                    World.particle.spawnParticle(
                        "NOTE",
                        x + Math.random() * 0.4, y + 0.1 + Math.random() * 1.7, z + Math.random() * 0.4,
                        0, 0, 0
                    ).setMaxAge(6 + Math.random() * 6).scale(0.66 + Math.random() * 0.2)
                }
        }, i*30) 
    }
}
