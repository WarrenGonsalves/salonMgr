var gcm = require('node-gcm');

var message = new gcm.Message({
    collapseKey: 'demo',
    delayWhileIdle: true,
    timeToLive: 3,
    // data: {
    //     key1: 'test msg from fixers',
    //     key2: 'test msg 2 from fixers'
    // }
});

var sender = new gcm.Sender('AIzaSyCBOByaMFuG6v_hjeh2huS4mJtpHPXYncQ');
var registrationIds = [];

module.exports.sendGCM = function(gcmToken, pushPayload) {

    registrationIds.push(gcmToken);
    message.data = pushPayload;

    console.log("GCM push: " + gcmToken + " msg:" + JSON.stringify(message));

    sender.send(message, registrationIds, 4, function(err, result) {
        if (err) {
            reply(err).code(510);
            return;
        }
        console.log(result);
    });
}