import { pogData } from "./utils/pogdata";

register("worldLoad", () => {
    pogData.goldorsection = 0;
    pogData.save();
});

register("chat", (message, rest) => {
    if (message.startsWith("[BOSS] Storm: I should have known that I stood no chance.")) {
        pogData.goldorsection = 1;
        pogData.save();
    } else if ((message.includes("(7/7)") || message.includes("(8/8)")) && !message.includes(":")) {
        pogData.goldorsection += 1;
        pogData.save();
    } else if (message == "The Core entrance is opening!") {
        pogData.goldorsection = 5;
        pogData.save();
    } else if (message == "[BOSS] Necron: You went further than any human before, congratulations.") {
        pogData.goldorsection = 0;
        pogData.save();
    }
}).setCriteria("${message}");

export function formatNumber(number, uppercase = false) {
    let formattedNumber;
    if(number < 1000) return number
    number = parseFloat(number.toString().replace(/,/g, '').replace(/,/g, ''));

    if (number >= 1000000000) {
        formattedNumber = (number / 1000000000).toFixed(0) + (uppercase ? "B" : "b");
    } else if (number >= 10000000) {
        formattedNumber = (number / 1000000).toFixed(0) + (uppercase ? "M" : "m");
    } else if (number >= 1000000) {
        formattedNumber = (number / 1000000).toFixed(1) + (uppercase ? "M" : "m");
    } else if (number >= 100000) {
        formattedNumber = (number / 1000).toFixed(0) + (uppercase ? "K" : "k");
    } else if (number >= 1000) {
        formattedNumber = (number / 1000).toFixed(1) + (uppercase ? "K" : "k");
    } 

    return formattedNumber;
}

//Credit to jcnlk for inDungeon and getCryptCountFromTablist

export function InDungeon() {
    try {
        const tabList = TabList.getNames();
        if (!tabList) return false;
        return tabList.some(line => 
            ChatLib.removeFormatting(line).includes("Dungeon:")
        );
    } catch (error) {
        ChatLib.chat(`&c&lMeowAddons &8» &rError in checkInDungeon: ${error}`);
        return false;
    }
}

export function getCryptCountFromTablist() {
    try {
        const tabList = TabList.getNames();
        if (!tabList) {
            if (!Config().debug) {
                return 0;
            } else {
                ChatLib.chat(`&cMeowAddons &8» &rFailed to get Crypt amount`);
                return 0;
            }
        }
        for (let line of tabList) {
            line = ChatLib.removeFormatting(line);
            if (line.includes("Crypts: ")) {
                const count = parseInt(line.split("Crypts: ")[1]);
                return isNaN(count) ? 0 : count;
            }
        }
    } catch (error) {
        if (!Config().debug) { 
            return 0;
        } else {
            ChatLib.chat(`&cMeowAddons &8» &rFailed to get Crypt amount ${error}`);
            return 0;
        }
    }
}

