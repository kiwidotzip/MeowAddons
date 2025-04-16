import { LocalStore } from "../../../tska/storage/LocalStore";

export const Data = new LocalStore("MeowAddons", {
    goldorsection: 0,
    CarryX: 0,
    CarryY: 0,
    bloodCampPB: 9999,
    firstInstall: true,
    version: "2.2.9"
}, "./data/Data.json");

export const meowc = new LocalStore("MeowAddons", {
    meowcount: 0
}, "./data/meowcount.json");

register("worldLoad", () => {
    if (!FileLib.exists("MeowAddons", ".data.json")) return;
    ChatLib.chat(new Message("&e[MeowAddons]&c Your old data file can no longer be used!")
                .addTextComponent(new TextComponent(" [Delete]")
                .setClick("run_command", "/madeleteolddata")
                .setHoverValue("&cDelete the old data file."))
    );
    ChatLib.chat("&e[MeowAddons] &fPlease re-configure the gui location using &c/carry gui&f.")
});

register("command", () => {
    FileLib.delete("MeowAddons", ".data.json")
    ChatLib.chat("&e[MeowAddons] &cOld data file deleted successfully.")
}).setName("madeleteolddata");
