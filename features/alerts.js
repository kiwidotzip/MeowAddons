import { FeatManager } from "./helperfunction";

let cellc = 0
let healc = 0
let soulcry = false
let howl = false

const CellAlign = FeatManager.createFeature("cellalignalert")
const Heal = FeatManager.createFeature("healwandalert")
const Katana = FeatManager.createFeature("katanaalert")
const WeirdTuba = FeatManager.createFeature("weirdtubaalert")
const WitherCloak = FeatManager.createFeature("withercloakalert")

const cellalert = () => setTimeout(() => ++cellc === cellc && expTitle("Cells Alignment Has Expired"), 5400)

CellAlign
    .register("serverActionbar", () => cellalert(), /.+\(Cells Alignment\).+/)
    .register("serverChat", () => cellalert(), /([A-Za-z0-9_]+) casted Cells Alignment on you!/)
Heal
    .register("serverActionbar", () => {
        let mel = ++healc
        setTimeout(() => mel === healc && Client.showTitle("&cHealing Has Expired!", "", 1, 20, 1), 5800)
    }, /.+\((Small|Medium|Big|Huge) Heal\).+/)
Katana
    .register("serverActionbar", () => {
        if (soulcry) return
        soulcry = true
        setTimeout(() => (soulcry = false, Client.showTitle("&cSoulcry expired!", "", 1, 20, 1)), 3900)
    }, /.+\(Soulcry\).+/)
WeirdTuba
    .register("serverActionbar", () => {
        if (howl) return
        howl = true
        const type = /.+Weirder.+Tuba/.test(Player.getHeldItem().getName())
        setTimeout(() => (howl = false, Client.showTitle(`&c ${type ? "Weirder" : "Weird"} Tuba expired!`, "", 1, 20, 1)), type ? 30000 : 20000)
    }, /.+\(Howl\).+/)
WitherCloak
    .register("serverChat", () => { 
        Client.showTitle("&cWither Cloak Disabled!", "", 1, 20, 1) 
    }, /(Creeper Veil De-activated! \(Expired\)|Not enough mana! Creeper Veil De-activated!)/)