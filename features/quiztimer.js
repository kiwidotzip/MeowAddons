import { FeatManager, hud } from "./helperfunction"

let start = 0
let duration = 0

const GUI = hud.createTextHud("Quiz Timer", 300, 300, "&cQuiz: &b12.6s")
const Quiz = FeatManager.createFeature("quiztimer", "catacombs")
const quiztimerT = (time) => {
    start = Date.now()
    duration = time
    Quiz.update()
    setTimeout(() => (duration = 0, Quiz.update()), duration)
}

Quiz
    .register("serverChat", () => quiztimerT(12000), "[STATUE] Oruo the Omniscient: I am Oruo the Omniscient. I have lived many lives. I have learned all there is to know.")
    .register("serverChat", () => quiztimerT(8200), /\[STATUE\] Oruo the Omniscient: (?:.+) answered Question #\d correctly!/)
    .registersub("renderOverlay", () => {
        const rem = duration - (Date.now() - start)
        Renderer.translate(GUI.getX(), GUI.getY())
        Renderer.scale(GUI.getScale())
        Renderer.drawString(`&cQuiz: &b${(rem / 1000).toFixed(1)}s`, 0, 0)
        Renderer.finishDraw()
    }, () => duration)
    
GUI.onDraw(() => {
    Renderer.translate(GUI.getX(), GUI.getY())
    Renderer.scale(GUI.getScale())
    Renderer.drawString(`&cQuiz: &b12.6s`, 0, 0)
    Renderer.finishDraw()
})