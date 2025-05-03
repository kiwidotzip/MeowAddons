import { Render2D } from "../../tska/rendering/Render2D";
import { FeatManager } from "./helperfunction";

const BatDead = FeatManager.createFeature("batdeadtitle", "catacombs")
BatDead
    .register("soundPlay", () => Render2D.showTitle(`&cBat Dead!`, null, 1000), "mob.bat.death")
    .register("soundPlay", () => Render2D.showTitle(`&cBat Dead!`, null, 1000), "mob.bat.hurt")