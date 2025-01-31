import Config from "../config";
import { pogData } from "./utils/pogdata";

const phases = {
  1: [
    { text: "1", x: 111.5, y: 113.5, z: 73.5 },
    { text: "2", x: 111.5, y: 119.5, z: 79.5 },
    { text: "3", x: 89.5, y: 112.5, z: 92.5 },
    { text: "4", x: 89.5, y: 122.5, z: 101.5 },
    { text: "Device", x: 108, y: 122, z: 94 },
  ],
  2: [
    { text: "1", x: 68.5, y: 109.5, z: 121.5 },
    { text: "2", x: 59.5, y: 120.5, z: 122.5 },
    { text: "3", x: 47.5, y: 109.5, z: 121.5 },
    { text: "4", x: 39.5, y: 108.5, z: 143.5 },
    { text: "Device", x: 60.5, y: 134, z: 140.5 },
  ],
  3: [
    { text: "1", x: -2.5, y: 109.5, z: 112.5 },
    { text: "2", x: -2.5, y: 119.5, z: 93.5 },
    { text: "3", x: 19.5, y: 123.5, z: 93.5 },
    { text: "4", x: -2.5, y: 109.5, z: 77.5 },
    { text: "Device", x: 0.5, y: 121.5, z: 77.5 },
  ],
  4: [
    { text: "1", x: 41.5, y: 109.5, z: 29.5 },
    { text: "2", x: 44.5, y: 121.5, z: 29.5 },
    { text: "3", x: 67.5, y: 109.5, z: 29.5 },
    { text: "4", x: 72.5, y: 115.5, z: 48.5 },
    { text: "Device", x: 63.5, y: 128.5, z: 35.5 },
  ],
};

function renderText(text, x, y, z) {
  if (Config().showTerm == text || (Config().showTerm === 5 && text === "Device") || Config().showTerm == 6) {
    Tessellator.drawString(text, x, y, z, Renderer.WHITE, true, 0.05, false);
  }
}

register("renderWorld", () => {
  if (Config().showTerm !== 0) {
    const phaseData = phases[pogData.goldorsection];
    if (phaseData) {
      phaseData.forEach(({ text, x, y, z }) => renderText(text, x, y, z));
    }
  }
});