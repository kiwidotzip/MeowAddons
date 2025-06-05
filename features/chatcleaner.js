import Config from "../config"
import { UIText, UITextInput, UIRoundedRectangle, ScrollComponent, ChildBasedSizeConstraint, CenterConstraint, ConstantColorConstraint, animate, Animations } from "../../sin/utils/elementa"
import HandleGui from "../../sin/utils/HandleGui"

let patterns = JSON.parse(FileLib.read("MeowAddons", "data/uselessmsgs.json"))
let msgs = patterns.map(p => new RegExp(p))
const Color = java.awt.Color
const COLORS = {
    bg: new Color(8/255, 12/255, 16/255, 1.0), 
    panel: new Color(12/255, 16/255, 20/255, 1.0),
    panelHover: new Color(22/255, 26/255, 30/255, 1.0), 
    btn: new Color(15/255, 20/255, 25/255, 1.0),
    btnHover: new Color(40/255, 80/255, 90/255, 1.0), 
    btnText: new Color(100/255, 245/255, 255/255, 1.0),
    text: new Color(220/255, 240/255, 245/255, 1.0), 
    accent: new Color(100/255, 245/255, 255/255, 1.0),
    input: new Color(10/255, 14/255, 18/255, 1.0), 
    inputText: new Color(170/255, 230/255, 240/255, 1.0),
    closeNormal: new Color(25/255, 30/255, 35/255, 1.0),
    closeHover: new Color(45/255, 55/255, 65/255, 1.0), 
    rowBg: new Color(18/255, 22/255, 26/255, 1.0),
    placeholder: new Color(70/255, 120/255, 140/255, 1.0)
}

function registerFilters() {
    if (!Config().chatcleaner) return
    msgs.forEach(msg => register("chat", (evn) => Config().chatcleaner && cancel(evn)).setCriteria(msg))
}

function savePatterns() {
    FileLib.write("MeowAddons", "data/uselessmsgs.json", JSON.stringify(patterns, null, 4))
    msgs = patterns.map(p => new RegExp(p))
    registerFilters()
}

registerFilters()

class ChatCleanerGui {
    constructor() {
        this.gui = new HandleGui()
        this.buildGui()
    }

    createButton(text, color, onClick, hoverColor = null) {
        const hColor = hoverColor || COLORS.btnHover
        const button = new UIRoundedRectangle(6)
            .setColor(color)
            .onMouseEnter(() => button.setColor(hColor))
            .onMouseLeave(() => button.setColor(color))
            .onMouseClick(() => {
                onClick()
                animate(button, animation => {
                    animation.setColorAnimation(Animations.OUT_EXP, 0.5, new ConstantColorConstraint(hColor), 0)
                    animation.onComplete(() => button.setColor(color))
                })
            })
        new UIText(text, true)
            .setX(new CenterConstraint())
            .setY(new CenterConstraint())
            .setColor(COLORS.btnText)
            .setTextScale((1.1).pixels())
            .setChildOf(button)
        return button
    }
    buildGui() {
        const main = new UIRoundedRectangle(6)
            .setX(new CenterConstraint())
            .setY(new CenterConstraint())
            .setWidth((640).pixels())
            .setHeight((360).pixels())
            .setColor(COLORS.bg)
        new UIText("Chat Cleaner", true)
            .setX((20).pixels())
            .setY((15).pixels())
            .setColor(COLORS.accent)
            .setTextScale((1.35).pixels())
            .setChildOf(main)
        this.createButton("✕", COLORS.closeNormal, () => this.gui.ctGui.close(), COLORS.closeHover)
            .setX((20).pixels(true))
            .setY((10).pixels())
            .setWidth((20).pixels())
            .setHeight((20).pixels())
            .setChildOf(main)
        const scroll = new ScrollComponent()
            .setX((20).pixels())
            .setY((40).pixels())
            .setWidth((600).pixels())
            .setHeight((240).pixels())
            .setChildOf(main)
        this.listContainer = new UIRoundedRectangle(6)
            .setWidth((100).percent())
            .setHeight(new ChildBasedSizeConstraint(5.2))
            .setColor(COLORS.panel)
            .setChildOf(scroll)
        const inputContainer = new UIRoundedRectangle(6)
            .setX((20).pixels())
            .setY((290).pixels())
            .setWidth((600).pixels())
            .setHeight((50).pixels())
            .setColor(COLORS.panel)
            .setChildOf(main)
        const inputBg = new UIRoundedRectangle(5)
            .setX((10).pixels())
            .setY(new CenterConstraint())
            .setWidth((545).pixels())
            .setHeight((30).pixels())
            .setColor(COLORS.input)
            .setChildOf(inputContainer)
            .onMouseClick(() => this.input.grabWindowFocus())
        this.input = new UITextInput("Enter regex pattern...", true)
            .setX((8).pixels())
            .setY(new CenterConstraint())
            .setWidth((520).pixels())
            .setColor(COLORS.inputText)
            .setChildOf(inputBg)
        this.createButton("+", COLORS.btn, () => this.addPattern())
            .setX((10).pixels(true))
            .setY(new CenterConstraint())
            .setWidth((30).pixels())
            .setHeight((30).pixels())
            .setChildOf(inputContainer)
        this.gui.draw(main, false)
        this.renderPatterns()
    }
    renderPatterns() {
        this.listContainer.clearChildren()
        if (patterns.length === 0)
            return new UIText("No patterns added...", true)
                .setX((20).pixels())
                .setY((20).pixels())
                .setColor(COLORS.placeholder)
                .setTextScale((0.95).pixels())
                .setChildOf(this.listContainer)
        this.patternInputs = []
        patterns.forEach((pattern, index) => {
            const row = new UIRoundedRectangle(6)
                .setX((10).pixels())
                .setY((index * 40 + 8).pixels())
                .setWidth((580).pixels())
                .setHeight((35).pixels())
                .setColor(COLORS.rowBg)
                .setChildOf(this.listContainer)
                .onMouseEnter(() => row.setColor(COLORS.panelHover))
                .onMouseLeave(() => row.setColor(COLORS.rowBg))
            const patternInput = new UITextInput(pattern, true)
                .setX((10).pixels())
                .setY(new CenterConstraint())
                .setWidth((495).pixels())
                .setColor(COLORS.inputText)
                .setTextScale((0.9).pixels())
                .setChildOf(row)
                .onKeyType((_, __, c) => c === 28 && patternInput.getText() !== pattern && this.updatePattern(index, patternInput.getText()))
                .onFocusLost(() => patternInput.getText() !== pattern && this.updatePattern(index, patternInput.getText()))
                .onMouseClick(() => {
                    patternInput.setText(pattern)
                    patternInput.grabWindowFocus()
                })
            this.patternInputs.push(patternInput)
            this.createButton("⿻", COLORS.btn, () => this.copyPattern(index))
                .setX((35).pixels(true))
                .setY((7.5).pixels())
                .setWidth((25).pixels())
                .setHeight((20).pixels())
                .setChildOf(row)
            this.createButton("✕", COLORS.btn, () => this.removePattern(index))
                .setX((5).pixels(true))
                .setY((7.5).pixels())
                .setWidth((25).pixels())
                .setHeight((20).pixels())
                .setChildOf(row)
        })
    }
    addPattern() {
        const pattern = this.input.getText().trim()
        if (!pattern || pattern === "Enter regex pattern...") return ChatLib.chat("&cEnter a pattern!")
        if (patterns.includes(pattern)) return ChatLib.chat("&ePattern already exists!")
        try {
            new RegExp(pattern)
        } catch (e) {
            return ChatLib.chat("&e[MeowAddons] &fInvalid regex pattern!")
        }
        patterns.push(pattern)
        savePatterns()
        this.input.setText("")
        this.renderPatterns()
        ChatLib.chat("&e[MeowAddons] &fPattern added successfully!")
    }
    copyPattern(index) {
        ChatLib.command(`ct copy ${patterns[index]}`, true)
    }

    updatePattern(index, newPattern) {
        const trimmed = newPattern.trim()
        if (!trimmed) {
            ChatLib.chat("&cPattern cannot be empty!")
            this.patternInputs[index].setText(patterns[index])
            return
        }
        if (patterns.includes(trimmed) && patterns[index] !== trimmed) {
            ChatLib.chat("&ePattern already exists!")
            this.patternInputs[index].setText(patterns[index])
            return
        }
        try { new RegExp(trimmed) } catch (e) {
            ChatLib.chat("&e[MeowAddons] &fInvalid regex pattern!")
            this.patternInputs[index].setText(patterns[index])
            return
        }
        patterns[index] = trimmed
        savePatterns()
        ChatLib.chat("&e[MeowAddons] &fPattern updated successfully!")
    }

    removePattern(index) {
        patterns.splice(index, 1)
        savePatterns()
        this.renderPatterns()
        ChatLib.chat("&e[MeowAddons] &fPattern removed successfully!")
    }

    open() {
        this.gui.ctGui.open()
    }
}

register("command", () => new ChatCleanerGui().open()).setName("machatcleaner")