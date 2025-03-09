// Make sure these go to the right directory 
import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"
const defaultConf = new DefaultConfig("MeowAddons", "data/settings.json")

// Chat - General

.addSwitch({
    category: "Chat",
    configName: "chatcleaner",
    title: "Chat cleaner",
    description: "Hides a LOT of useless messages",
    subcategory: "General"
})
.addSwitch({
    category: "Chat",
    configName: "betterah",
    title: "BetterAH",
    description: "Formats Auction House messages\n&4Currently somewhat broken for CO-OP AH",
    subcategory: "General"
})
.addSwitch({
    category: "Chat",
    configName: "betterbz",
    title: "BetterBZ",
    description: "Formats Bazaar messages",
    subcategory: "General"
})

// Chat - Join/Leave format

.addSwitch({
    category: "Chat",
    configName: "cleantoggle",
    title: "Clean join/leave messages",
    description: "Formats join/leave messages in a clean way",
    subcategory: "Join/Leave format"
})
.addSwitch({
    category: "Chat",
    configName: "cleanfriendjoin",
    title: "Clean friend join messages",
    description: "Formats friend join messages",
    subcategory: "Join/Leave format",
    shouldShow: data => data.cleantoggle
})
.addSwitch({
    category: "Chat",
    configName: "cleanguildjoin",
    title: "Clean guild join messages",
    description: "Formats guild join messages",
    subcategory: "Join/Leave format",
    shouldShow: data => data.cleantoggle
})
.addSwitch({
    category: "Chat",
    configName: "cleanpartyjoin",
    title: "Clean party join messages",
    description: "Formats party join messages",
    subcategory: "Join/Leave format",
    shouldShow: data => data.cleantoggle
})

// Chat - Chat format

.addSwitch({
    category: "Chat",
    configName: "formatchatmessage",
    title: "Toggle chat formatting",
    description: "Formats chat messages in a clean way",
    subcategory: "Chat format",
})
.addSwitch({
    category: "Chat",
    configName: "partyformat",
    title: "Format party messages",
    description: "Formats party messages",
    subcategory: "Chat format",
    shouldShow: data => data.formatchatmessage,
})
.addSwitch({
    category: "Chat",
    configName: "guildformat",
    title: "Format guild messages",
    description: "Formats guild messages",
    subcategory: "Chat format",
    shouldShow: data => data.formatchatmessage,
})

// Chat - Custom chat rank (username) color

.addSwitch({
    category: "Chat",
    configName: "togglecustomchatrankcolor",
    title: "Toggle custom chat rank color",
    description: "Toggles custom chat rank color\n&4Requires party chat and guild chat formatting to be enabled",
    subcategory: "Custom chat rank color",
})
.addTextInput({
    category: "Chat",
    configName: "mvppluspluscolor",
    title: "Color code for MVP++ rank",
    description: "Color code for MVP++ rank",
    value: "6",
    placeHolder: "6",
    subcategory: "Custom chat rank color",
    shouldShow: data => data.togglecustomchatrankcolor,
})
.addTextInput({
    category: "Chat",
    configName: "mvppluscolor",
    title: "Color code for MVP+ rank",
    description: "Color code for MVP+ rank",
    value: "b",
    placeHolder: "b",
    subcategory: "Custom chat rank color",
    shouldShow: data => data.togglecustomchatrankcolor,
})
.addTextInput({
    category: "Chat",
    configName: "mvpcolor",
    title: "Color code for MVP rank",
    description: "Color code for MVP rank",
    value: "b",
    placeHolder: "b",
    subcategory: "Custom chat rank color",
    shouldShow: data => data.togglecustomchatrankcolor
})
.addTextInput({
    category: "Chat",
    configName: "vippluscolor",
    title: "Color code for VIP+ rank",
    description: "Color code for VIP+ rank",
    value: "a",
    placeHolder: "a",
    subcategory: "Custom chat rank color",
    shouldShow: data => data.togglecustomchatrankcolor
})
.addTextInput({
    category: "Chat",
    configName: "vipcolor",
    title: "Color code for VIP rank",
    description: "Color code for VIP rank",
    value: "a",
    placeHolder: "a",
    subcategory: "Custom chat rank color",
    shouldShow: data => data.togglecustomchatrankcolor
})

// Meowing - Auto meow

.addSwitch({
    category: "Meowing",
    configName: "automeow",
    title: "Automeow",
    description: "Sends \"meow :3\" when someone says \"meow\" in chat.",
    subcategory: "Auto-meow"
})
.addSwitch({
    category: "Meowing",
    configName: "randomdelayautomeow",
    title: "Enable delay for automeow",
    description: "Adds a random delay to the meow message to make it less detectable.\n&4Recommended if you are using it in guild chat",
    subcategory: "Auto-meow",
    shouldShow: data => data.automeow
})
.addSwitch({
    category: "Meowing",
    configName: "guildchattoggleautomeow",
    title: "Enables automeow for guild chat",
    description: "Enables automeow for guild chat.\n&4Enable random delay for auto meow",
    subcategory: "Auto meow",
    shouldShow: data => data.automeow
})

// Meowing - Meow sounds

.addSwitch({
    category: "Meowing",
    configName: "meowsounds",
    title: "Cat sounds",
    description: "Plays cat sounds whenever someone says meow in chat",
    subcategory: "Meow Sounds"
})

// Meowing - Meow hit sounds

.addSwitch({
    category: "Meowing",
    configName: "meowhitsound",
    title: "Meow kill sounds",
    description: "Plays cat sounds whenever you kill a mob",
    subcategory: "Meow Kills Sounds"
})

.addSlider({
    category: "Meowing",
    configName: "meowhitradius",
    title: "Meow sound radius",
    description: "Radius in which the meow kill sound will play",
    options: [0, 32],
    value: 5,
    subcategory: "Meow Kills Sounds",
    shouldShow: data => data.meowhitsound
})

// Slayers - Kill timer

.addSwitch({
    category: "Slayers",
    configName: "slayerkilltimer",
    title: "Slayer kill timer",
    description: "Sends the slayer kill time in chat, not party chat",
    subcategory: "Slayers"
})

// Slayers - Carrying

.addTextParagraph({
    configName: "carryinfo",
    title: "Carry info",
    description: "Use /carry help to see the commands",
    centered: true,
    category: "Slayers",
    subcategory: "Carrying"
})

.addTextInput({
    configName: "carryvalue",
    title: "Carry price",
    description: "Auto-adds player to carry when you are receive a trade req. \n&4Put the carry value in millions",
    category: "Slayers",
    subcategory: "Carrying",
    value: "1.3",
    placeHolder: "1.3"
})

.addSwitch({
    category: "Slayers",
    configName: "drawcarrybox",
    title: "Background for carry list",
    description: "Enables the background for carry list",
    subcategory: "Carrying"
})

.addColorPicker({
    category: "Slayers",
    configName: "carryboxcolor",
    title: "Color Picker",
    description: "Pick a color for the background",
    subcategory: "Carrying",
    value: [0, 0, 255, 255],
    shouldShow: data => data.drawcarrybox
})

.addSwitch({
    category: "Slayers",
    configName: "notifybossspawn",
    title: "Notify boss spawn",
    description: "Displays a title when your client's boss spawns",
    subcategory: "Carrying"
})

.addSwitch({
    category: "Slayers",
    configName: "carrytimesend",
    title: "Send carry time",
    description: "Sends carry time in chat, not party chat",
    subcategory: "Carrying",
    value: "true"
})
.addSwitch({
    category: "Slayers",
    configName: "sendcarrycount",
    title: "Send carry count",
    description: "Sends carry count in party chat",
    subcategory: "Carrying",
    value: "true"
})
// Dungeons - Mask notifications

.addSwitch({
    category: "Dungeons",
    configName: "masknotifier",
    title: "Mask Notifications",
    description: "Notifies party chat when a mask pops",
    subcategory: "Mask notifications"
})

// Dungeons - Blood helper

.addSwitch({
    category: "Dungeons",
    configName: "blood",
    title: "Blood Helper",
    description: "Main toggle for blood helper",
    subcategory: "Blood helper"
})
.addSwitch({
    category: "Dungeons",
    configName: "sendbloodparty",
    title: "Send blood information",
    description: "Sends blood times to party chat",
    subcategory: "Blood helper",
    shouldShow: data => data.blood
})

// Dungeons - Leap announce

.addSwitch({
    category: "Dungeons",
    configName: "leapannounce",
    title: "Leap Announce",
    description: "Sends a message in party chat when you leap to a player",
    subcategory: "Leap announce"
})

// Dungeons - Terminal

.addDropDown({
    category: "Dungeons",
    configName: "showTerm",
    title: "Terminal labels",
    description: "Select the terminal number that you want!",
    subcategory: "Terminals",
    options: ['None', '1', '2', '3', '4', 'Device', 'All'],
    value: 0
})
.addSwitch({
    category: "Dungeons",
    configName: "showTermClass",
    title: "Show class",
    description: "Shows the class that should be doing the terminal",
    subcategory: "Terminals",
    shouldShow: data => data.showTerm != 0
})
.addSlider({
    category: "Dungeons",
    configName: "showTermClassDistance",
    title: "Show class distance",
    description: "Distance at which the class label will be shown",
    options: [0, 20],
    value: 14,
    subcategory: "Terminals",
    shouldShow: data => data.showTermClass
})
.addSwitch({
    category: "Dungeons",
    configName: "boxTerm",
    title: "Box terminal",
    description: "Boxes the terminal",
    subcategory: "Terminals",
    shouldShow: data => data.showTerm != 0
})
.addDropDown({
    category: "Dungeons",
    configName: "sendTermInChat",
    title: "Send the terminal you select in chat",
    description: "Sends the terminal you select in chat",
    subcategory: "Terminals",
    options: ['None', '1', '2', '3', '4', 'Device'],
    value: 0
})

// Fishing - Fishing messagees

.addSwitch({
    category: "Fishing",
    configName: "fishingmsgmaintoggle",
    title: "Main toggle",
    description: "Main toggle for fishing messages",
    subcategory: "Fishing messages"
})
.addSwitch({
    category: "Fishing",
    configName: "fishingmsgsilly",
    title: "Silly Fishing messages",
    description: "Sends more lively messages when a fishing boss spawns",
    subcategory: "Fishing messages",
    shouldShow: data => data.fishingmsgmaintoggle
})

// Party commands

.addSwitch({
    category: "Party Commands",
    configName: "partycommands",
    title: "Party Commands",
    description: "Enables party commands",
    subcategory: "Main toggle"
})
.addSwitch({
    category: "Party Commands",
    configName: "partytransfer",
    title: "Party Transfer",
    description: "Transfers the party to the player that ran !ptme",
    subcategory: "Sub Toggle",
    shouldShow: data => data.partycommands,
})
.addSwitch({
    category: "Party Commands",
    configName: "partywarp",
    title: "Party Warp",
    description: "Warps the party when someone says !warp",
    subcategory: "Sub Toggle",
    shouldShow: data => data.partycommands,
})
.addSwitch({
    category: "Party Commands",
    configName: "partyinvite",
    title: "Party Invite",
    description: "Runs the party invite command when someone says !inv, !invite, !party, !p username in chat",
    subcategory: "Sub Toggle",
    shouldShow: data => data.partycommands,
})
.addSwitch({
    category: "Party Commands",
    configName: "partyallinvite",
    title: "AllInvite",
    description: "Toggles allinvite when someone says !allinv or !allinvite",
    subcategory: "Sub Toggle",
    shouldShow: data => data.partycommands,
})
.addSwitch({
    category: "Party Commands",
    configName: "partykickoffline",
    title: "KickOffline",
    description: "Kicks all offline players from the party when someone says !kickoffline",
    subcategory: "Sub Toggle",
    shouldShow: data => data.partycommands,
})

// Dev

.addButton({
    category: "Developer",
    configName: "credit1",
    title: "Kiwidotzip",
    description: "Developer",
    subcategory: "Developer",
    onClick() {
        ChatLib.chat(`&d&lmeow`)
        World.playSound("mob.cat.meow", 1, 1)
    }
})
.addButton({
    category: "Developer",
    configName: "credit2",
    title: "Sascha_Vadkovson (Scatha)",
    description: "Developer",
    subcategory: "Developer",
    onClick() {
        ChatLib.chat(`&3&lAurora Dye`)
        World.playSound("mob.cat.meow", 1, 1)
    }
})
.addSwitch({
    category: "Developer",
    configName: "debug",
    title: "Debug",
    description: "Enables debug messages",
    subcategory: "Debug"
})

const config = new Settings("MeowAddons", defaultConf, "data/ColorScheme.json").setCommand("MeowAddons", ["ma", "meowa"])
config
      .setSize(60,60)
      .apply()
export default () => config.settings
