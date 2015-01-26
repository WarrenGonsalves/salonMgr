var config = require('../config/constants');
var logger = require('./logger');

var apn = require('apn');
var logger = require('./logger');
var certPath
var keyPath
var options

if (config.env === "prod") {
    logger.info(__filename, ["using prod apn certificates"]);
    p12Path = __dirname + '/cert/prod_certificates.p12';

    options = {
        pfx: p12Path,
        passphrase: "123",
        production: true
    };

} else {
    logger.info(__filename, ["using dev apn certificates"]);
    p12Path = __dirname + '/cert/dev_certificates.p12';

    options = {
        pfx: p12Path,
        production: false,
        passphrase: "nyne"
    };
}

var feedback = new apn.Feedback(options);
feedback.on("feedback", function(devices) {
    devices.forEach(function(item) {
        logger.info(__filename, ["apn feedback"], JSON.stringify(item));
    });
});

module.exports.sendAPN = function(token, pushPayload) {

    var myDevice = new apn.Device(token);
    var note = new apn.Notification();
    var apnConnection = new apn.Connection(options);

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 1;
    note.sound = "ping.aiff";
    note.alert = "\uD83D\uDCE7 \u2709 Handz invoice";
    note.payload = pushPayload;

    logger.info("APN", ["APN for token", token, JSON.stringify(options)]);

    apnConnection.pushNotification(note, myDevice);
}