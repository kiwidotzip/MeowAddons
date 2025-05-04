import { Render2D } from "../../tska/rendering/Render2D";
import { FeatManager } from "./helperfunction";
import { Dungeon } from "../../tska/skyblock/dungeon/Dungeon"

const BatDead = FeatManager.createFeature("batdeadtitle", "catacombs")
BatDead
    .register("soundPlay", () => !Dungeon.inBoss() && Render2D.showTitle(`&cBat Dead!`, null, 1000), "mob.bat.death")
    .register("soundPlay", () => !Dungeon.inBoss() && Render2D.showTitle(`&cBat Dead!`, null, 1000), "mob.bat.hurt")