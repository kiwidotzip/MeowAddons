import Config from "../config";
import { Data } from "./utils/data";
import { FeatManager } from "./helperfunction";
import { Render3D } from "../../tska/rendering/Render3D";

const showTerm = FeatManager.createFeature("showTerm", "catacombs");
const pdistance = (x, y, z) =>
  Math.hypot(
    x - Math.floor(Player.getX() + 0.25),
    y - Math.round(Player.getY()),
    z - Math.floor(Player.getZ() + 0.25)
  );

const phases = {
  1: [
    { text: "&7[&f1&7]", x: 110.5, y: 113.5, z: 73.5 },
    { text: "&7[&f2&7]", x: 110.5, y: 119.5, z: 79.5 },
    { text: "&7[&f3&7]", x: 89.5, y: 112.5, z: 92.5 },
    { text: "&7[&f4&7]", x: 89.5, y: 122.5, z: 101.5 },
    { text: "Device", x: 108, y: 122, z: 94 },
  ],
  2: [
    { text: "&7[&f1&7]", x: 68.5, y: 109.5, z: 121.5 },
    { text: "&7[&f2&7]", x: 59.5, y: 120.5, z: 122.5 },
    { text: "&7[&f3&7]", x: 47.5, y: 109.5, z: 121.5 },
    { text: "&7[&f4&7]", x: 39.5, y: 108.5, z: 143.5 },
    { text: "&7[&f5&7]", x: 40.5, y: 124.5, z: 123.5 },
    { text: "Device", x: 60.5, y: 134, z: 140.5 },
  ],
  3: [
    { text: "&7[&f1&7]", x: -2.5, y: 109.5, z: 112.5 },
    { text: "&7[&f2&7]", x: -2.5, y: 119.5, z: 93.5 },
    { text: "&7[&f3&7]", x: 19.5, y: 123.5, z: 93.5 },
    { text: "&7[&f4&7]", x: -2.5, y: 109.5, z: 77.5 },
    { text: "Device", x: 0.5, y: 121.5, z: 77.5 },
  ],
  4: [
    { text: "&7[&f1&7]", x: 41.5, y: 109.5, z: 29.5 },
    { text: "&7[&f2&7]", x: 44.5, y: 121.5, z: 29.5 },
    { text: "&7[&f3&7]", x: 67.5, y: 109.5, z: 29.5 },
    { text: "&7[&f4&7]", x: 72.5, y: 115.5, z: 48.5 },
    { text: "Device", x: 63.5, y: 128.5, z: 35.5 },
  ],
};

const getLabel = (text) => {
  if (Data.goldorsection === 1) {
    if (text === "&7[&f1&7]" || text === "&7[&f2&7]") return "&aTank";
    if (text === "&7[&f3&7]" || text === "&7[&f4&7]") return "&bMage";
  } else {
    const labels = {
      "&7[&f1&7]": "&aTank",
      "&7[&f2&7]": "&bMage",  
      "&7[&f3&7]": "&4Bers",
      "&7[&f4&7]": "&cArch",
      "&7[&f5&7]": "&4Bers",
    };
    return labels[text] || "";
  }
};

const renderTerm = ({ text, x, y, z }) => {
  Render3D.renderString(text, x, y + 0.5, z, 0xffffff, true, 0.05, false, true, true);
  const label = Config().showTermClass ? getLabel(text) : "";
  if (label && pdistance(x, y, z) < Config().showTermClassDistance) {
    Render3D.renderString(label, x, y, z, 0xffffff, true, 0.05, false, true, true);
  }
};

const renderPhase = () => {phases[Data.goldorsection]?.forEach(renderTerm)};

showTerm.register("renderWorld", renderPhase)

