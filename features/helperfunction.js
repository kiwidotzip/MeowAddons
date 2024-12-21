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
