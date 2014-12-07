module.exports.ifError = function(err, reply) {
    if (err) {
        reply({
            "error": err
        }).code(420);
    }
};

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

module.exports.derp = function(reply) {
    reply("derp....");
}