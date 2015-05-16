/**
 * Generates random number between 99 - 9999
 * @return {[String]}      returns zero padded code which is 4 digits long.
 */
function random() {
    var low = 99;
    var high = 9999;
    return Math.random() * (high - low) + low;
}

/**
 * Zero padded string which is 4 characters
 * @param  {[String]} number un-padded string
 * @return {[String]}        padded string
 */
function padToFour(number) {
    if (number <= 9999) {
        number = ("000" + number).slice(-4);
    }
    return number;
}

/**
 * Generates auth code to be send via SMS when a new registration for Store / User takes place.
 * @return {[String]} 4 digit regsitration code
 */
module.exports.generateAuthCode = function() {
    return padToFour(random(99, 9999));
}
