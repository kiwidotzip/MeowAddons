import Config from "../config";
import { pogData } from "./utils/pogdata";
import { renderFilledBox } from "../../BloomCore/RenderUtils";

const phases = {
  1: [
    { text: "[1]", x: 111.5, y: 113.5, z: 73.5 },
    { text: "[2]", x: 111.5, y: 119.5, z: 79.5 },
    { text: "[3]", x: 89.5, y: 112.5, z: 92.5 },
    { text: "[4]", x: 89.5, y: 122.5, z: 101.5 },
    { text: "Device", x: 108, y: 122, z: 94 },
  ],
  2: [
    { text: "[1]", x: 68.5, y: 109.5, z: 121.5 },
    { text: "[2]", x: 59.5, y: 120.5, z: 122.5 },
    { text: "[3]", x: 47.5, y: 109.5, z: 121.5 },
    { text: "[4]", x: 39.5, y: 108.5, z: 143.5 },
    { text: "[5]", x: 40.5, y: 124.5, z: 123.5 },
    { text: "Device", x: 60.5, y: 134, z: 140.5 },
  ],
  3: [
    { text: "[1]", x: -2.5, y: 109.5, z: 112.5 },
    { text: "[2]", x: -2.5, y: 119.5, z: 93.5 },
    { text: "[3]", x: 19.5, y: 123.5, z: 93.5 },
    { text: "[4]", x: -2.5, y: 109.5, z: 77.5 },
    { text: "Device", x: 0.5, y: 121.5, z: 77.5 },
  ],
  4: [
    { text: "[1]", x: 41.5, y: 109.5, z: 29.5 },
    { text: "[2]", x: 44.5, y: 121.5, z: 29.5 },
    { text: "[3]", x: 67.5, y: 109.5, z: 29.5 },
    { text: "[4]", x: 72.5, y: 115.5, z: 48.5 },
    { text: "Device", x: 63.5, y: 128.5, z: 35.5 },
  ],
};

function renderText(text, x, y, z) {
  let pos = [x, y, z];
  let playerPos = [Math.round(Player.getX() + 0.25) - 1, Math.round(Player.getY()), Math.round(Player.getZ() + 0.25) - 1];
  calcDistance = (p1, p2) => {
    var a = p2[0] - p1[0];
    var b = p2[1] - p1[1];
    var c = p2[2] - p1[2];

    let dist = Math.sqrt(a * a + b * b + c * c);

    if (dist < 0) {
        dist *= -1;
    }
    return dist;};
  let pdistance = calcDistance(playerPos, pos);
  

  if (Config().showTerm == text || (Config().showTerm === 5 && text === "Device") || Config().showTerm == 6) {

    if (pdistance > 7) { Tessellator.drawString(text, x, y, z, 0xffffff, true, 2, true); } 
    else { Tessellator.drawString(text, x, y, z, 0xffffff, true, 0.05, false); }

    let label = "";
    switch (text) {
      case "[1]":
        label = "Tank";
        break;
      case "[2]":
        label = "Mage";
        break;
      case "[3]":
        label = "Bers";
        break;
      case "[4]":
        label = "Arch";
        break;
      case "[5]":
        label = "Bers";
        break;
    }

    if (label && Config().showTermClass) {
    if (pdistance < 14) {
    Tessellator.drawString(label, x, y - 0.5, z, 0xffffff, true, 0.05, false);
    }
    }
  }
};

register("renderWorld", () => {
 const phaseData = phases[pogData.goldorsection];
  if (Config().showTerm !== 0) {
    if (phaseData) {
      phaseData.forEach(({ text, x, y, z }) => renderText(text, x, y, z));
    }
  }
  if (Config().boxTerm) {
   if (phaseData) {
  phaseData.forEach(({ x, y, z }) => renderFilledBox(x, y - 0.5, z, 1, 1, 1, 1, 10, 0.5, false));
   }
  }
});

register("command", () => {
  if (!Config().debug) return;
  const phaseData = phases[pogData.goldorsection];
  if (phaseData) {
    phaseData.forEach(({ text, x, y, z }) => renderText(text, x, y, z));
  }
}).setName("renderterm");
