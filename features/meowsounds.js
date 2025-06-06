import { FeatManager } from "./helperfunction"
import Config from "../config"

const meowsounds = FeatManager.createFeature("meowsounds")
const meowhitsound = FeatManager.createFeature("meowhitsound")

const ArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")
const sounds = ["mob.cat.meow", "mob.cat.purreow", "mob.cat.straymeow"]
const EnumParticleTypes = net.minecraft.util.EnumParticleTypes // ily doc

meowsounds
    .register("chat", (msg) => {
        msg.toLowerCase().includes("meow") && World.playSound(sounds[Math.floor(Math.random() * sounds.length)], 1, 1)
    }, /(?:Guild|Party|Co-op|From|To)? ?(?:>)? ?(?:\[.+?\])? ?(?:[a-zA-Z0-9_]+) ?(?:\[.+?\])?: (.+)/)

meowhitsound
    .register("entityDeath", (e) => {
        if (!e || e.distanceTo(Player.getPlayer()) > Config().meowhitradius || e.getEntity() instanceof ArmorStand) return
        playSFX()
        playParticles(e)
    })

const playSFX = () => {
    for (var i = 0; i < 2; i++) setTimeout(() => World.playSound(sounds[Math.floor(Math.random() * sounds.length)], 1, 0.9 + Math.random() * 0.2), i*120)
}

const playParticles = (ent) => {
    const world = World.getWorld()
    let [x, y, z] = [ent.getX(), ent.getY(), ent.getZ()]
    
    for (var i = 0; i < 10; i++) {
        setTimeout(() => {
            if (Math.random() > 0.66) return
            world.func_175688_a(
                EnumParticleTypes.NOTE,
                x + Math.random() * 0.4, y + 0.1 + Math.random() * 1.7, z + Math.random() * 0.4,
                0, 0, 0, 0
            )
        }, i * 30)
    }
}