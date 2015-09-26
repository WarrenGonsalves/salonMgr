module.exports.success = function(msg, reply) {
    reply({
        Success: msg
    });
}

module.exports.error = function(msg, reply) {
    reply({
        Error: msg
    }).code(420);
}

module.exports.authError = function(msg, reply) {
    reply({
        Error: msg
    }).code(401);
}

module.exports.authFail = function(msg, reply) {
    reply({
        Error: msg
    }).code(401).takeover();
}

module.exports.derp = function(reply) {
    reply("derp....");
}