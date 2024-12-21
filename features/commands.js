import Settings from "../config"

register("command", () =>!Settings.openGUI())
                                  .setName("meowaddons")
                                  .setAliases("ma", "meowa");
register("command", () => {
    ChatLib.chat(`&00 &11 &22 &33 &44 &55 &66 &77 &88 &99 &aa &bb &cc &dd &ee &ff`)
}).setName("colorr");
