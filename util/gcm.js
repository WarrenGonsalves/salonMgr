var gcm = require('node-gcm');
var logger = require('./logger');

var message = new gcm.Message({
    timeToLive: 3,
    data: {
        sender: 'Fixers'
    }
});

var sender = new gcm.Sender('AIzaSyCBOByaMFuG6v_hjeh2huS4mJtpHPXYncQ');

module.exports.sendGCM = function(token, invoice_id) {

    var registrationIds = [];
    registrationIds.push(token);
    message.data.invoice_id = invoice_id;

    logger.info("GCM", ["GCM for token", token, JSON.stringify(message)], JSON.stringify(message));

    sender.send(message, registrationIds, 4, function(err, result) {
        if (err) {
            reply(err).code(510);
            return;
        }
        logger.info("GCM", ["result", result], JSON.stringify(result));
    });
}