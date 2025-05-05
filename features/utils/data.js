import { LocalStore } from "../../../tska/storage/LocalStore";

export const Data = new LocalStore("MeowAddons", {
    goldorsection: 0,
    bloodCampPB: 9999
}, "./data/Data.json");

export const meowc = new LocalStore("MeowAddons", {
    meowcount: 0
}, "./data/meowcount.json");
