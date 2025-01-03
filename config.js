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
        const categories = ["Chat", "Dungeons", "Fishing", "Party Commands", "Credits"];
        return 1
    }
})

class Config {

    // Chat - General
    @SwitchProperty({
        name: "Chat cleaner",
        description: "Hides a LOT of useless messages",
        category: "Chat",
        subcategory: "1 - General"
    })
    chatcleaner = false

    @SwitchProperty({
        name: "BetterAH",
        description: "Formats Auction House messages\n&4Currently somewhat broken for CO-OP AH",
        category: "Chat",
        subcategory: "1 - General"
    })
    betterah = false

    @SwitchProperty({
        name: "BetterBZ",
        description: "Formats Bazaar messages",
        category: "Chat",
        subcategory: "1 - General"
    })
    betterbz = false

    // Chat - Join/Leave format
    @SwitchProperty({
        name: "Clean join/leave messages",
        description: "Formats join/leave messages in a clean way",
        category: "Chat",
        subcategory: "2 - Join/Leave format"
    })
    cleantoggle = false

    @SwitchProperty({
        name: "Clean friend join messages",
        description: "Formats friend join messages",
        category: "Chat",
        subcategory: "2 - Join/Leave format"
    })
    cleanfriendjoin = false

    @SwitchProperty({
        name: "Clean guild join messages",
        description: "Formats guild join messages",
        category: "Chat",
        subcategory: "2 - Join/Leave format"
    })
    cleanguildjoin = false

    @SwitchProperty({
        name: "Clean party join messages",
        description: "Formats party join messages",
        category: "Chat",
        subcategory: "2 - Join/Leave format"
    })
    cleanpartyjoin = false

    // Chat - Chat format
    @SwitchProperty({
        name: "Toggle chat formatting",
        description: "Formats chat messages in a clean way",
        category: "Chat",
        subcategory: "3 - Chat format"
    })
    formatchatmessage = false

    @SwitchProperty({
        name: "Format party messages",
        description: "Formats party messages",
        category: "Chat",
        subcategory: "3 - Chat format"
    })
    partyformat = false

    @SwitchProperty({
        name: "Format guild messages",
        description: "Formats guild messages",
        category: "Chat",
        subcategory: "3 - Chat format"
    })
    guildformat = false

    // Chat - Custom chat rank color
    @SwitchProperty({
        name: "Toggle custom chat rank color",
        description: "Toggles custom chat rank color\n&4Requires party chat and guild chat formatting to be enabled",
        category: "Chat",
        subcategory: "4 - Custom chat rank color"
    })
    togglecustomchatrankcolor = false

    @TextProperty({
        name: "Color code for MVP++ rank",
        description: "Color code for MVP++ rank",
        category: "Chat",
        subcategory: "4 - Custom chat rank color",
        placeholder: "6"
    })
    mvppluspluscolor = "6"

    @TextProperty({
        name: "Color code for MVP+ rank",
        description: "Color code for MVP+ rank",
        category: "Chat",
        subcategory: "4 - Custom chat rank color",
        placeholder: "b"
    })
    mvppluscolor = "b"

    @TextProperty({
        name: "Color code for MVP rank",
        description: "Color code for MVP rank",
        category: "Chat",
        subcategory: "4 - Custom chat rank color",
        placeholder: "b"
    })
    mvpcolor = "b"

    @TextProperty({
        name: "Color code for VIP+ rank",
        description: "Color code for VIP+ rank",
        category: "Chat",
        subcategory: "4 - Custom chat rank color",
        placeholder: "a"
    })
    vippluscolor = "a"

    @TextProperty({
        name: "Color code for VIP rank",
        description: "Color code for VIP rank",
        category: "Chat",
        subcategory: "4 - Custom chat rank color",
        placeholder: "a"
    })
    vipcolor = "a"

    // Chat - UAYOR
    @SwitchProperty({
        name: "Automeow",
        description: "Sends \"meow\" when someone says \"meow :3\" in chat.",
        category: "Chat",
        subcategory: "5 - UAYOR"
    })
    automeow = false

    // Dungeons - Mask notifications
    @SwitchProperty({
        name: "Mask Notifications",
        description: "Notifies party chat when a mask pops",
        category: "Dungeons",
        subcategory: "1 - Mask notifications"
    })
    masknotifier = false

    // Dungeons - Blood helper
    @SwitchProperty({
        name: "Blood Helper",
        description: "Main toggle for blood helper",
        category: "Dungeons",
        subcategory: "2 - Blood helper"
    })
    blood = false

    @SwitchProperty({
        name: "Send blood information",
        description: "Sends blood times to party chat",
        category: "Dungeons",
        subcategory: "2 - Blood helper"
    })
    sendbloodparty = false

    // Fishing - Fishing messages
    @SwitchProperty({
        name: "Main toggle",
        description: "Main toggle for fishing messages",
        category: "Fishing",
        subcategory: "1 - Fishing messages"
    })
    fishingmsgmaintoggle = false

    @SwitchProperty({
        name: "Fishing messages",
        description: "Notifies party chat when a fishing boss spawns",
        category: "Fishing",
        subcategory: "1 - Fishing messages"
    })
    fishingmsg = false

    @SwitchProperty({
        name: "Silly Fishing messages",
        description: "Sends more lively messages when a fishing boss spawns",
        category: "Fishing",
        subcategory: "1 - Fishing messages"
    })
    fishingmsgsilly = false

    // Party Commands - Main toggle
    @SwitchProperty({
        name: "Party Commands",
        description: "Enables party commands",
        category: "Party Commands",
        subcategory: "1 - Main toggle"
    })
    partycommands = false

    // Party Commands - Sub Toggle
    @SwitchProperty({
        name: "Party Transfer",
        description: "Transfers the party to the player that ran !ptme",
        category: "Party Commands",
        subcategory: "2 - Sub Toggle"
    })
    partytransfer = false

    @SwitchProperty({
        name: "Party Warp",
        description: "Warps the party when someone says !warp",
        category: "Party Commands",
        subcategory: "2 - Sub Toggle"
    })
    partywarp = false

    @SwitchProperty({
        name: "Party Invite",
        description: "Runs the party invite command when someone says !inv, !invite, !party, !p username in chat",
        category: "Party Commands",
        subcategory: "2 - Sub Toggle"
    })
    partyinvite = false

    @SwitchProperty({
        name: "AllInvite",
        description: "Toggles allinvite when someone says !allinv or !allinvite",
        category: "Party Commands",
        subcategory: "2 - Sub Toggle"
    })
    partyallinvite = false

    @SwitchProperty({
        name: "KickOffline",
        description: "Kicks all offline players from the party when someone says !kickoffline",
        category: "Party Commands",
        subcategory: "2 - Sub Toggle"
    })
    partykickoffline = false

    // Credits - Developer
    @ButtonProperty({
        name: "Kiwidotzip",
        description: "Developer",
        category: "Credits",
        subcategory: "1 - Developer",
        placeholder: " "
    })
    credit1() {};

    @ButtonProperty({
        name: "Sascha_Vadkovson (Scatha)",
        description: "Developer",
        category: "Credits",
        subcategory: "1 - Developer",
        placeholder: " "
    })
    credit2() {};

    // Credits - Debug
    @SwitchProperty({
        name: "Debug",
        description: "Enables debug messages",
        category: "Credits",
        subcategory: "2 - Debug"
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
