import { FeatManager } from "./helperfunction";
import { Render2D } from "../../tska/rendering/Render2D"

let cellc = 0
let healc = 0
let soulcry = false
let howl = false

const CellAlign = FeatManager.createFeature("cellalignalert")
const Heal = FeatManager.createFeature("healwandalert")
const Katana = FeatManager.createFeature("katanaalert")
const WeirdTuba = FeatManager.createFeature("weirdtubaalert")
const WitherCloak = FeatManager.createFeature("withercloakalert")

const cellalert = () => setTimeout(() => ++cellc === cellc && Render2D.showTitle("Cells Alignment Has Expired", null, 1000), 5400)

CellAlign
    .register("serverActionbar", () => cellalert(), /.+\(Cells Alignment\).+/)
    .register("serverChat", () => cellalert(), /([A-Za-z0-9_]+) casted Cells Alignment on you!/)
Heal
    .register("serverActionbar", () => {
        let mel = ++healc
        setTimeout(() => mel === healc && Render2D.showTitle("&cHealing Has Expired!", null, 1000), 5800)
    }, /.+\((Small|Medium|Big|Huge) Heal\).+/)
Katana
    .register("serverActionbar", () => {
        if (soulcry) return
        soulcry = true
        setTimeout(() => (soulcry = false, Render2D.showTitle("&cSoulcry expired!", null, 1000)), 3900)
    }, /.+\(Soulcry\).+/)
WeirdTuba
    .register("serverActionbar", () => {
        if (howl) return
        howl = true
        const type = /.+Weirder.+Tuba/.test(Player.getHeldItem().getName())
        setTimeout(() => (howl = false, Render2D.showTitle(`&c ${type ? "Weirder" : "Weird"} Tuba expired!`, null, 1000)), type ? 30000 : 20000)
    }, /.+\(Howl\).+/)
WitherCloak
    .register("serverChat", () => { 
        Render2D.showTitle("&cWither Cloak Disabled!", null, 1000) 
    }, /(Creeper Veil De-activated! \(Expired\)|Not enough mana! Creeper Veil De-activated!)/)