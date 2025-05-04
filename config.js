// Make sure these go to the right directory 
import Settings from "../Amaterasu/core/Settings";
import DefaultConfig from "../Amaterasu/core/DefaultConfig";
import { meowc } from "./features/utils/data";
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
    subcategory: "Auto-meow",
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

// Slayers - Main

.addSwitch({
    category: "Slayers",
    configName: "slayermaintoggle",
    title: "Slayer toggles",
    description: "The main toggle for slayer code",
    subcategory: "Slayers"
})

// Slayers - Kill timer

.addSwitch({
    category: "Slayers",
    configName: "slayerkilltimer",
    title: "Slayer kill timer",
    description: "Sends the slayer kill time in chat, not party chat",
    subcategory: "Slayers",
    shouldShow: data => data.slayermaintoggle
})

// Slayers - Rendering

.addSwitch({
    category: "Slayers",
    configName: "slayerbossdisplay",
    title: "Slayer boss display",
    description: "Displays the timer, health and the boss name in a clean hud",
    subcategory: "Slayers",
    shouldShow: data => data.slayermaintoggle
})
.addButton({
    category: "Slayers",
    configName: "slayerbossdisplayedit",
    title: "Edit GUI",
    description: "Edit slayer boss display GUI",
    subcategory: "Slayers",
    shouldShow: data => data.slayerbossdisplay,
    onClick() {
        ChatLib.command(`meowaddons gui`, true)
    }
})
.addSwitch({
    category: "Slayers",
    configName: "slayerbosshighlight",
    title: "Slayer boss highlight",
    description: "Highlights your slayer boss",
    subcategory: "Slayers",
    shouldShow: data => data.slayermaintoggle
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
.addButton({
    configName: "carryedit",
    title: "Edit GUI",
    description: "Edit carry GUI",
    category: "Slayers",
    subcategory: "Carrying",
    onClick() {
        ChatLib.command(`meowaddons gui`, true)
    }
})
.addTextInput({
    configName: "carryvalue",
    title: "Carry price",
    description: "Auto-adds player to carry when you are receive a trade req. \n&4Put the carry value in millions",
    category: "Slayers",
    subcategory: "Carrying - QOL",
    value: "1.3",
    placeHolder: "1.3"
})
.addSwitch({
    category: "Slayers",
    configName: "notifybossspawn",
    title: "Notify boss spawn",
    description: "Displays a title when your client's boss spawns",
    subcategory: "Carrying - QOL"
})
.addSwitch({
    category: "Slayers",
    configName: "sendtrademsg",
    title: "Send trade msg",
    description: "Sends a message asking if you want to trade the player after their carry ends.",
    subcategory: "Carrying - QOL"
})
.addSwitch({
    category: "Slayers",
    configName: "carrytimesend",
    title: "Send carry time",
    description: "Sends carry time in chat, not party chat",
    subcategory: "Carrying - QOL",
    value: "true"
})

.addSwitch({
    category: "Slayers",
    configName: "sendcarrycount",
    title: "Send carry count",
    description: "Sends carry count in party chat",
    subcategory: "Carrying - QOL",
    value: "true"
})

.addSwitch({
    category: "Slayers",
    configName: "drawcarrybox",
    title: "Background for carry list",
    description: "Enables the background for carry list",
    subcategory: "Carrying - Rendering"
})

.addColorPicker({
    category: "Slayers",
    configName: "carryboxcolor",
    title: "Color Picker",
    description: "Pick a color for the background",
    subcategory: "Carrying - Rendering",
    value: [0, 0, 255, 255],
    shouldShow: data => data.drawcarrybox
})

.addDropDown({
    category: "Slayers",
    configName: "bossph",
    title: "Boss/Money per hour",
    description: "Shows the approximate amount of bosses/money you can make per hour",
    subcategory: "Carrying - Rendering",
    options: ['None', 'Boss', 'Money'],
    value: 0
})

.addSwitch({
    category: "Slayers",
    configName: "renderbossoutline",
    title: "Highlight boss",
    description: "Highlights boss when its in render distance",
    subcategory: "Carrying - Rendering"
})

.addSwitch({
    category: "Slayers",
    configName: "renderplayeroutline",
    title: "Highlight player",
    description: "Highlights the palyer you're carrying when they're in render distance",
    subcategory: "Carrying - Rendering"
})
.addSwitch({
    category: "Slayers",
    configName: "sendcarrycountdc",
    title: "Send discord message",
    description: "Sends a discord message using your webhook that you provide.",
    subcategory: "Carrying - Misc"
})
.addTextInput({
    category: "Slayers",
    configName: "webhookurlcarry",
    title: "Webhook URL",
    description: "Enter your discord webhook URL",
    subcategory: "Carrying - Misc",
    placeHolder: "None",
    value: "None",
    shouldShow: data => data.sendcarrycountdc
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

// Dungeons - Carrying

.addTextParagraph({
    configName: "dgcarryinfo",
    title: "DG Carry Info",
    description: "Use /dgcarry help to see the commands",
    centered: true,
    category: "Dungeons",
    subcategory: "Carrying"
})
.addSwitch({
    category: "Dungeons",
    configName: "senddgcarrycount",
    title: "Send carry count",
    description: "Sends carry count in party chat",
    subcategory: "Carrying - QOL"
})

// Dungeons - Server Lag Timer

.addSwitch({
    category: "Dungeons",
    configName: "serverlagtimer",
    title: "Server lag timer",
    description: "Shows how long the server lagged for in ticks and seconds",
    subcategory: "Server lag timer"
})

// Dungeons - Mimic

.addSwitch({
    category: "Dungeons",
    configName: "colormimicchests",
    title: "Color Mimic chests",
    description: "Colors the mimic chests in dungeons",
    subcategory: "Mimic"
})
.addSwitch({
    category: "Dungeons",
    configName: "mimicdeathmsg",
    title: "Mimic death message",
    description: "Sends a message when mimic dies",
    subcategory: "Mimic"
})

// Dungeons - Livid 

.addSwitch({
    category: "Dungeons",
    configName: "lividvuln",
    title: "Livid vulnerability timer",
    description: "Timer until livid is hitable/can be icesprayed",
    subcategory: "Livid"
})
.addButton({
    category: "Dungeons",
    configName: "lividvulnedit",
    title: "Edit GUI",
    description: "Edit livid vulnerability timer GUI",
    subcategory: "Livid",
    shouldShow: data => data.lividvuln,
    onClick() {
        ChatLib.command(`meowaddons gui`, true)
    }
})
// Dungeons - Mask notif

.addSwitch({
    category: "Dungeons",
    configName: "masknotifier",
    title: "Mask Notifications",
    description: "Notifies party chat when a mask pops",
    subcategory: "Masks"
})
.addSwitch({
    category: "Dungeons",
    configName: "maskrem",
    title: "Mask reminder",
    description: "Reminds you when you don't have a mask on",
    subcategory: "Masks"
})
.addSwitch({
    category: "Dungeons",
    configName: "maskcd",
    title: "Mask cooldown display",
    description: "Shows a HUD displaying the cooldown of your masks",
    subcategory: "Masks"
})
.addSwitch({
    category: "Dungeons",
    configName: "onlyshowinp3",
    title: "Only show in P3",
    description: "Enable to only show in P3 of f7/m7",
    subcategory: "Masks",
    shouldShow: data => data.maskcd
})
// Dungeons - Leap features

.addSwitch({
    category: "Dungeons",
    configName: "leapannounce",
    title: "Leap Announce",
    description: "Sends a message in party chat when you leap to a player",
    subcategory: "Leap features"
})
.addSwitch({
    category: "Dungeons",
    configName: "hideafterleap",
    title: "Hide players after leap",
    description: "Hides players after you leap to them",
    subcategory: "Leap features"
})
.addTextInput({
    category: "Dungeons",
    configName: "hideleaptime",
    title: "Amount of time to hide players for",
    description: "&4&lTIME IN SECONDS",
    subcategory: "Leap features",
    placeHolder: "10",
    value: "10",
    shouldShow: data => data.hideafterleap
})

// Dungeons - No clutter

.addSwitch({
    category: "Dungeons",
    configName: "hidenonstarmobs",
    title: "Hide non star mob names",
    description: "Hides non star mob names",
    subcategory: "No clutter - Dungeons"
})
.addSwitch({
    category: "Dungeons",
    configName: "hidedmg",
    title: "Hide damage",
    description: "Hides the damage in dungeons",
    subcategory: "No clutter - Dungeons"
})

// Dungeons - Fire freeze timer

.addSwitch({
    category: "Dungeons",
    configName: "firefreezenotif",
    title: "Fire freeze",
    description: "Fire freeze timer in f3 and m3",
    subcategory: "Fire Freeze"
})

// Dungeons - Crypt counter

.addSwitch({
    category: "Dungeons",
    configName: "cryptnotif",
    title: "Main toggle for the crypt reminder",
    description: "Disabling this will NOT disable the crypt features if you had them enabled",
    subcategory: "Crypt Reminder"
})
.addTextInput({
    category: "Dungeons",
    configName: "cryptremtime",
    title: "Time delay",
    description: "Time between crypt count checks\n&c&lTIME IN MINUTES",
    subcategory: "Crypt Reminder",
    placeHolder: "1.5",
    value: "1.5",
    shouldShow: data => data.cryptnotif
})
.addSwitch({
    category: "Dungeons",
    configName: "cryptchatmsg",
    title: "Crypt chat message",
    description: "Sends a message in party chat if 5 crypts have not been killed",
    subcategory: "Crypt Reminder",
    shouldShow: data => data.cryptnotif
})
.addSwitch({
    category: "Dungeons",
    configName: "crypttitle",
    title: "Crypt title",
    description: "Shows you a reminder on your sceen if 5 crypts have not been killed",
    subcategory: "Crypt Reminder",
    shouldShow: data => data.cryptnotif
})

// Dungeons - Titles

.addSwitch({
    category: "Dungeons",
    configName: "AlertMainToggle",
    title: "Show title options",
    description: "Merely here to save space, disabling this will NOT disable the title features if you had them enabled",
    subcategory: "Titles"
})
.addSwitch({
    category: "Dungeons",
    configName: "batdeadtitle",
    title: "Bat dead title",
    description: "Shows a title when a bat dies",
    subcategory: "Titles",
    shouldShow: data => data.AlertMainToggle
})
.addSwitch({
    category: "Dungeons",
    configName: "f7title-crush",
    title: "F7 Crush titles",
    description: "Titles when you crush storm/maxor",
    subcategory: "Titles",
    shouldShow: data => data.AlertMainToggle
})
.addSwitch({
    category: "Dungeons",
    configName: "f7title-necron",
    title: "F7 Necron title",
    description: "Titles when necron is damageable",
    subcategory: "Titles",
    shouldShow: data => data.AlertMainToggle
})
.addSwitch({
    category: "Dungeons",
    configName: "f7title-dead",
    title: "F7 Death titles",
    description: "Titles when the wither kings die",
    subcategory: "Titles",
    shouldShow: data => data.AlertMainToggle
})
.addSwitch({
    category: "Dungeons",
    configName: "m7ragtitle",
    title: "Rag alert in m7",
    description: "Shows the rag axe title",
    subcategory: "Titles",
    shouldShow: data => data.AlertMainToggle
})
.addSwitch({
    category: "Dungeons",
    configName: "healtitle",
    title: "Wish alert",
    description: "Shows the wish alert in f6, f7, m6, and m7",
    subcategory: "Titles",
    shouldShow: data => data.AlertMainToggle
})
.addSwitch({
    category: "Dungeons",
    configName: "tanktitle",
    title: "Ult (CoS) alert",
    description: "Shows the ult alert for tank in f7 and m7",
    subcategory: "Titles",
    shouldShow: data => data.AlertMainToggle
})

// Dungeons - F7 Misc.

.addSwitch({
    category: "Dungeons",
    configName: "f7p3timer",
    title: "F7 P3 Timer",
    description: "Shows the time until P3 starts (uses server ticks)",
    subcategory: "F7 Misc"
})

// Dungeons - Quiz Timer

.addSwitch({
    category: "Dungeons",
    configName: "quiztimer",
    title: "Quiz Timer",
    description: "Shows the time until you can answer the quiz question",
    subcategory: "Quiz"
})

// Dungeons - Score messages

.addSwitch({
    category: "Dungeons",
    configName: "dungeonscore270",
    title: "Dungeon score message (270)",
    description: "Dungeon score message on 270 score",
    subcategory: "Score messages"
})
.addTextInput({
    category: "Dungeons",
    configName: "dungeonscore270msg",
    title: "Dungeon score message for 270 score",
    description: "Dungeon score message for 270 score",
    subcategory: "Score messages",
    placeHolder: "270 meow",
    value: "270 meow",
    shouldShow: data => data.dungeonscore270
})
.addSwitch({
    category: "Dungeons",
    configName: "dungeonscore300",
    title: "Dungeon score message (300)",
    description: "Dungeon score message on 300 score",
    subcategory: "Score messages"
})
.addTextInput({
    category: "Dungeons",
    configName: "dungeonscore300msg",
    title: "Dungeon score message for 300 score",
    description: "Dungeon score message for 300 score",
    subcategory: "Score messages",
    placeHolder: "300 meow",
    value: "300 meow",
    shouldShow: data => data.dungeonscore300
})

// Dungeons - Terminal

.addSwitch({
    category: "Dungeons",
    configName: "showTerm",
    title: "Terminal labels",
    description: "Shows terminal number that belons to the terminal",
    subcategory: "Terminals",
})
.addSwitch({
    category: "Dungeons",
    configName: "showTermClass",
    title: "Show class",
    description: "Shows the class that should be doing the terminal",
    subcategory: "Terminals",
    shouldShow: data => data.showTerm
})
.addSlider({
    category: "Dungeons",
    configName: "showTermClassDistance",
    title: "Show class distance",
    description: "Distance at which the class label will be shown",
    options: [0, 20],
    value: 14,
    subcategory: "Terminals",
    shouldShow: data => data.showTermClass && data.showTerm
})
.addSwitch({
    category: "Dungeons",
    configName: "boxTerm",
    title: "Box terminal",
    description: "Boxes the terminal",
    subcategory: "Terminals",
    shouldShow: data => data.showTerm
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

// Removed because me lazy and code unoptimized

// Misc - Custom Size

.addSwitch({
    category: "Misc.",
    configName: "customsize",
    title: "Custom size",
    description: "Custom size for your player entity",
    subcategory: "Custom model size"
})
.addTextInput({
    category: "Misc.",
    configName: "customX",
    title: "X Size",
    description: "Player X Size",
    subcategory: "Custom model size",
    placeHolder: "1",
    value: "1",
    shouldShow: data => data.customsize
})
.addTextInput({
    category: "Misc.",
    configName: "customY",
    title: "Y Size",
    description: "Player Y Size",
    subcategory: "Custom model size",
    placeHolder: "1",
    value: "1",
    shouldShow: data => data.customsize
})
.addTextInput({
    category: "Misc.",
    configName: "customZ",
    title: "Z Size",
    description: "Player Z Size",
    subcategory: "Custom model size",
    placeHolder: "1",
    value: "1",
    shouldShow: data => data.customsize
})

.addSwitch({
    category: "Misc.",
    configName: "custommodel",
    title: "Custom model",
    description: "Custom model for your player entity",
    subcategory: "Custom model"
})
.addDropDown({
    category: "Misc.",
    configName: "custommodeltype",
    title: "Custom model type",
    description: "Custom model type",
    subcategory: "Custom model",
    options: ['None', 'Cat', 'Wolf', 'Slime', 'Creeper'],
    value: 0,
    shouldShow: data => data.custommodel,
    registerListener: (oldv, newv) => {
        const keys = [null, 'ocelot', 'wolf', 'slime', 'creeper'];
        const modelKey = keys[newv];
        if (modelKey) {
            ChatLib.command(`macatmodel ${modelKey}`, true);
        }
    }
})
.addDropDown({
    category: "Misc.",
    configName: "catmodeltype",
    title: "Cat model type",
    description: "Cat model type",
    subcategory: "Custom model",
    options: ['Ocelot', 'Black', 'Orange', "Siamese"],
    value: 0,
    shouldShow: data => data.custommodel && data.custommodeltype == 1,
    registerListener: (oldv, newv) => {
     
        ChatLib.command(`macattexture ${newv}`, true);
    }
})

// Misc - Space Helmet

.addSwitch({
    category: "Misc.",
    configName: "spacehelmet",
    title: "Space Helmet",
    description: "Shows a client-side space helmet on your head",
    subcategory: "Space helmet"
})
.addSlider({
    category: "Misc.",
    configName: "spacehelmetdelay",
    title: "Space helmet speed",
    description: "Speed for the space helmet animation",
    subcategory: "Space helmet",
    value: "3",
    options: [1, 5]
})

// Misc - Block Overlay

.addSwitch({
    category: "Misc.",
    configName: "blockoverlay",
    title: "Block overlay",
    description: "Draws an overlay over the block you highlight",
    subcategory: "Block overlay",
})
.addSwitch({
    category: "Misc.",
    configName: "blockoverlayfill",
    title: "Filled block overlay",
    description: "Draws a filled block overlay",
    subcategory: "Block overlay",
    shouldShow: data => data.blockoverlay
})
.addColorPicker({
    category: "Misc.",
    configName: "blockoverlaycolor",
    title: "Color Picker",
    description: "Pick a color for the block overlay",
    subcategory: "Block overlay",
    value: [0, 0, 0, 255],
    shouldShow: data => data.blockoverlay
})

// Misc - no clutter

.addSwitch({
    category: "Misc.",
    configName: "NoClutter",
    title: "No clutter",
    description: "Disables a lot of useless things\n&cCredit to DocilElm for this <3",
    subcategory: "No Clutter"
})
.addSwitch({
    category: "Misc.",
    configName: "noLightning",
    title: "No lightning",
    description: "Disables lightning",
    subcategory: "No Clutter",
    shouldShow: data => data.NoClutter
})
.addSwitch({
    category: "Misc.",
    configName: "noDeathAni",
    title: "No death animation",
    description: "Disables death animation",
    subcategory: "No Clutter",
    shouldShow: data => data.NoClutter
})
.addSwitch({
    category: "Misc.",
    configName: "noEnderTP",
    title: "No enderman teleport",
    description: "Disables enderman teleport animation",
    subcategory: "No Clutter",
    shouldShow: data => data.NoClutter
})
.addSwitch({
    category: "Misc.",
    configName: "noEmptyTooltip",
    title: "No empty tooltip",
    description: "Disables empty tooltip",
    subcategory: "No Clutter",
    shouldShow: data => data.NoClutter
})

// Misc - alerts

.addSwitch({
    category: "Misc.",
    configName: "alerttoggle",
    title: "Alerts",
    description: "Enable to see other alert toggles",
    subcategory: "Alerts"
})
.addSwitch({
    category: "Misc.",
    configName: "cellalignalert",
    title: "Cell align alert",
    description: "Alerts you when your cell alingement ends",
    subcategory: "Alerts",
    shouldShow: data => data.alerttoggle
})
.addSwitch({
    category: "Misc.",
    configName: "healwandalert",
    title: "Heal wand alert",
    description: "Alerts you when your healing wand's ability ends",
    subcategory: "Alerts",
    shouldShow: data => data.alerttoggle
})
.addSwitch({
    category: "Misc.",
    configName: "katanaalert",
    title: "Katana alert",
    description: "Alerts you when your katana's ability ends",
    subcategory: "Alerts",
    shouldShow: data => data.alerttoggle
})
.addSwitch({
    category: "Misc.",
    configName: "weirdtubaalert",
    title: "Weird tuba alert",
    description: "Alerts you when your weird tuba's ability ends",
    subcategory: "Alerts",
    shouldShow: data => data.alerttoggle
})
.addSwitch({
    category: "Misc.",
    configName: "withercloakalert",
    title: "Wither cloak alert",
    description: "Alerts you when your wither cloak's ability ends",
    subcategory: "Alerts",
    shouldShow: data => data.alerttoggle
})

// Misc - world age display

.addSwitch({
    category: "Misc.",
    configName: "worldagedisplay",
    title: "World age display",
    description: "Displays the world age in a GUI",
    subcategory: "World age"
})
.addButton({
    category: "Misc.",
    configName: "worldagedisplayedit",
    title: "Edit GUI",
    description: "Edit world age display GUI",
    subcategory: "World age",
    shouldShow: data => data.worldagedisplay,
    onClick() {
        ChatLib.command(`meowaddons gui`, true)
    }
})
.addSwitch({
    category: "Misc.",
    configName: "worldagemsg",
    title: "World age message",
    description: "Sends the world age in chat",
    subcategory: "World age"
})

// Misc - arrow poison tracker

.addSwitch({
    category: "Misc.",
    configName: "arrowpoistracker",
    title: "Arrow poison tracker",
    description: "Tracks the amount of arrow poisons you have in your inventory and displays them in a gui",
    subcategory: "Arrow poison tracker"
})
.addButton({
    category: "Misc.",
    configName: "arrowpoisonedit",
    title: "Edit GUI",
    description: "Edit arrow poison tracker GUI",
    subcategory: "Arrow poison tracker",
    shouldShow: data => data.arrowpoistracker,
    onClick() {
        ChatLib.command(`meowaddons gui`, true)
    }
})

// Misc - armor hud

.addSwitch({
    category: "Misc.",
    configName: "armorhud",
    title: "Armor HUD",
    description: "Displays your armor",
    subcategory: "Armor HUD"
})
.addSwitch({
    category: "Misc.",
    configName: "armorhudvert",
    title: "Vertical Armor HUD",
    description: "Enable to have vertical armor hud and disable for horizontal",
    subcategory: "Armor HUD",
    value: "true",
    shouldShow: data => data.armorhud
})
.addSwitch({
    category: "Misc.",
    configName: "drawarmorhudbox",
    title: "Armor HUD Box",
    description: "Enable to have the box around armor hud and disable for no box",
    subcategory: "Armor HUD",
    value: "true",
    shouldShow: data => data.armorhud
})
.addButton({
    category: "Misc.",
    configName: "armorhudedit",
    title: "Edit GUI",
    description: "Edit armor HUD GUI",
    subcategory: "Armor HUD",
    shouldShow: data => data.armorhud,
    onClick() {
        ChatLib.command(`meowaddons gui`, true)
    }
})

// Misc - party commands

.addSwitch({
    category: "Misc.",
    configName: "partycmd",
    title: "Party commands",
    description: "Enables party commands",
    subcategory: "Party commands"
})
.addTextParagraph({
    category: "Misc.",
    configName: "partycmdinfo",
    title: "Party commands info",
    description: "Use !ptme, !warp, !allinv, !kickoffline, !inv <player>, !tps, !ping to use the commands",
    centered: true,
    subcategory: "Party commands",
    shouldShow: data => data.partycmd
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
const config = new Settings("MeowAddons", defaultConf, "data/ColorScheme.json")
        .onOpenGui(() => config.mainRightBlock.setWidth((80).percent()))
const rcolor = Renderer.color(187, 134, 252)
const bcolor = Renderer.color(13, 13, 13)
config.getHandler().registers.onDraw(() => {
    // Line
    const mb = config.mainBlock;
    const width = mb.getRight() - mb.getLeft();
    const height = mb.getBottom() - mb.getTop();
    Renderer.drawLine(rcolor, mb.getLeft() + width * 0.20, mb.getTop() + height * 0.05, mb.getLeft() + width * 0.20, mb.getBottom() - height * 0.05, 2);
    // Box
    Renderer.drawRect(bcolor, mb.getLeft() + (width - width * 0.3) / 2, mb.getTop() + height * 0.0008, width * 0.5, height * 0.09)
    // Title
    Renderer.colorize(187, 134, 252, 255)
    Renderer.drawString(`MeowAddons v${JSON.parse(FileLib.read("MeowAddons", "metadata.json")).version}`, mb.getLeft() + (width - width * 0.3) / 2 + width * 0.5 / 2 - Renderer.getStringWidth(`MeowAddons v${JSON.parse(FileLib.read("MeowAddons", "metadata.json")).version}`) / 2, mb.getTop() + height * 0.0004 + height * 0.075 / 2)
})
config.AmaterasuGui.searchBar.x = 200 // yay no search bar
config
      .setSize(60,60)
      .apply()
export default () => config.settings