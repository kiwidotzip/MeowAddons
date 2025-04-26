import { FeatManager } from "./helperfunction";

const BatDead = FeatManager.createFeature("batdeadtitle", "catacombs")
BatDead
    .register("soundPlay", () => Client.showTitle(`&cBat Dead!`, "", 1, 20, 1), "mob.bat.death")
    .register("soundPlay", () => Client.showTitle(`&cBat Dead!`, "", 1, 20, 1), "mob.bat.hurt")