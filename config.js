import {
    @Vigilant,
    @TextProperty,
    @ButtonProperty,
    @SwitchProperty,
    @ColorProperty,
    @DecimalSliderProperty,
    Color,
    @SelectorProperty
} from "../Vigilance";

@Vigilant("MeowAddons", "Meow Addons", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["Chat", "Dungeons", "Fishing", "Party Commands", "Dev"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
    getSubcategoryComparator: () => (a, b) => {
        const subcategories = ["General", "Modules", "Developer", "Mask notifcations", "Blood helper", "Main toggle", "Sub Toggle","Fishing messages", "Join/Leave format", "Chat format", "Custom chat rank color", "UAYOR", "Debug"];
        return subcategories.indexOf(a.getValue()[0].attributesExt.subcategory) - subcategories.indexOf(b.getValue()[0].attributesExt.subcategory);
    }
})

class Config {

    @SwitchProperty({
        name: "Chat cleaner",
        description: "Hides a LOT of useless messages",
        category: "Chat",
        subcategory: "General"
    })
    chatcleaner = false

    @SwitchProperty({
        name: "Clean join/leave messages",
        description: "Formats join/leave messages in a clean way",
        category: "Chat",
        subcategory: "Join/Leave format"
    })
    cleantoggle = false

    @SwitchProperty({
        name: "Clean friend join messages",
        description: "Formats friend join messages",
        category: "Chat",
        subcategory: "Join/Leave format"
    })
    cleanfriendjoin = false

    @SwitchProperty({
        name: "Clean guild join messages",
        description: "Formats guild join messages",
        category: "Chat",
        subcategory: "Join/Leave format"
    })
    cleanguildjoin = false

    @SwitchProperty({
        name: "Clean party join messages",
        description: "Formats party join messages",
        category: "Chat",
        subcategory: "Join/Leave format"
    })
    cleanpartyjoin = false

    @SwitchProperty({
        name: "Toggle chat formatting",
        description: "Formats chat messages in a clean way",
        category: "Chat",
        subcategory: "Chat format"
    })
    formatchatmessage = false

    @SwitchProperty({
        name: "Format party messages",
        description: "Formats party messages",
        category: "Chat",
        subcategory: "Chat format"
    })
    partyformat = false

    @SwitchProperty({
        name: "Format guild messages",
        description: "Formats guild messages",
        category: "Chat",
        subcategory: "Chat format"
    })
    guildformat = false

    @SwitchProperty({
        name: "Toggle custom chat rank color",
        description: "Toggles custom chat rank color\n&4Requires party chat and guild chat formatting to be enabled",
        category: "Chat",
        subcategory: "Custom chat rank color"
    })
    togglecustomchatrankcolor = false

    @TextProperty({
        name: "Color code for MVP++ rank",
        description: "Color code for MVP++ rank",
        category: "Chat",
        subcategory: "Custom chat rank color",
        placeholder: "6"
    })
    mvppluspluscolor = "6"

    @TextProperty({
        name: "Color code for MVP+ rank",
        description: "Color code for MVP+ rank",
        category: "Chat",
        subcategory: "Custom chat rank color",
        placeholder: "b"
    })
    mvppluscolor = "b"

    @TextProperty({
        name: "Color code for MVP rank",
        description: "Color code for MVP rank",
        category: "Chat",
        subcategory: "Custom chat rank color",
        placeholder: "b"
    })
    mvpcolor = "b"

    @TextProperty({
        name: "Color code for VIP+ rank",
        description: "Color code for VIP+ rank",
        category: "Chat",
        subcategory: "Custom chat rank color",
        placeholder: "a"
    })
    vippluscolor = "a"

    @TextProperty({
        name: "Color code for VIP rank",
        description: "Color code for VIP rank",
        category: "Chat",
        subcategory: "Custom chat rank color",
        placeholder: "a"
    })
    vipcolor = "a"

    @SwitchProperty({
        name: "BetterAH",
        description: "Formats Auction House messages\n&4Currently somewhat broken for CO-OP AH",
        category: "Chat",
        subcategory: "General"
    })
    betterah = false

    @SwitchProperty({
        name: "BetterBZ",
        description: "Formats Bazaar messages",
        category: "Chat",
        subcategory: "General"
    })
    betterbz = false

    @SwitchProperty({
        name: "Automeow",
        description: "Sends \"meow\" when someone says \"meow :3\" in chat.",
        category: "Chat",
        subcategory: "UAYOR"
    })
    automeow = false

    @SwitchProperty({
        name: "Mask Notifications",
        description: "Notifies party chat when a mask pops",
        category: "Dungeons",
        subcategory: "Mask notifications"
    })
    masknotifier = false

    @SwitchProperty({
        name: "Blood Helper",
        description: "Main toggle for blood helper",
        category: "Dungeons",
        subcategory: "Blood helper"
    })
    blood = false

    @SwitchProperty({
        name: "Send blood information",
        description: "Sends blood times to party chat",
        category: "Dungeons",
        subcategory: "Blood helper"
    })
    sendbloodparty = false
    
    @SwitchProperty({
        name: "Main toggle",
        description: "Main toggle for fishing messages",
        category: "Fishing",
        subcategory: "Fishing messages"
    })
    fishingmsgmaintoggle = false

    @SwitchProperty({
        name: "Fishing messages",
        description: "Notifies party chat when a fishing boss spawns",
        category: "Fishing",
        subcategory: "Fishing messages"
    })
    fishingmsg = false

    @SwitchProperty({
        name: "Silly Fishing messages",
        description: "Sends more lively messages when a fishing boss spawns",
        category: "Fishing",
        subcategory: "Fishing messages"
    })
    fishingmsgsilly = false

    @SwitchProperty({
        name: "Party Commands",
        description: "Enables party commands",
        category: "Party Commands",
        subcategory: "Main toggle"
    })
    partycommands = false

    @SwitchProperty({
        name: "Party Transfer",
        description: "Transfers the party to the player that ran !ptme",
        category: "Party Commands",
        subcategory: "Sub Toggle"
    })
    partytransfer = false

    @SwitchProperty({
        name: "Party Warp",
        description: "Warps the party when someone says !warp",
        category: "Party Commands",
        subcategory: "Sub Toggle"
    })
    partywarp = false


    @SwitchProperty({
        name: "Party Invite",
        description: "Runs the party invite command when someone says !inv, !invite, !party, !p username in chat",
        category: "Party Commands",
        subcategory: "Sub Toggle"
    })
    partyinvite = false

    @SwitchProperty({
        name: "AllInvite",
        description: "Toggles allinvite when someone says !allinv or !allinvite",
        category: "Party Commands",
        subcategory: "Sub Toggle"
    })
    partyallinvite = false

    @SwitchProperty({
        name: "KickOffline",
        description: "Kicks all offline players from the party when someone says !kickoffline",
        category: "Party Commands",
        subcategory: "Sub Toggle"
    })
    partykickoffline = false

    @ButtonProperty({
        name: "Kiwidotzip",
        description: "Developer",
        category: "Dev",
        subcategory: "Developer",
        placeholder: " "
    })
    credit1() {};

    @ButtonProperty({
        name: "Sascha_Vadkovson (Scatha)",
        description: "Developer",
        category: "Dev",
        subcategory: "Developer",
        placeholder: " "
    })
    credit2() {};

    @SwitchProperty({
        name: "Debug",
        description: "Enables debug messages",
        category: "Dev",
        subcategory: "Debug"
    })
    debug = false

    constructor() {
        this.initialize(this)
        this.addDependency("AllInvite", "Party Commands")
        this.addDependency("KickOffline", "Party Commands")
        this.addDependency("Party Transfer", "Party Commands")
        this.addDependency("Party Warp", "Party Commands")
        this.addDependency("Party Invite", "Party Commands")
        this.addDependency("Clean friend join messages", "Clean join/leave messages")
        this.addDependency("Clean guild join messages", "Clean join/leave messages")
        this.addDependency("Clean party join messages", "Clean join/leave messages")
        this.addDependency("Format party messages", "Toggle chat formatting")
        this.addDependency("Format guild messages", "Toggle chat formatting")
        this.addDependency("Fishing messages", "Main toggle")
        this.addDependency("Silly Fishing messages", "Main toggle")
        this.addDependency("Send blood information", "Blood Helper")
        this.addDependency("Color code for MVP++ rank", "Toggle custom chat rank color")
        this.addDependency("Color code for MVP+ rank", "Toggle custom chat rank color")
        this.addDependency("Color code for MVP rank", "Toggle custom chat rank color")
        this.addDependency("Color code for VIP+ rank", "Toggle custom chat rank color")
        this.addDependency("Color code for VIP rank", "Toggle custom chat rank color")
    }
}
export default new Config()
