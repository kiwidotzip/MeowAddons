export function formatNumber(number, uppercase = false) {
    let formattedNumber;
    if(number < 100) return number
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