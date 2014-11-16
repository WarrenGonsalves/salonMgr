module.exports.ifError = function(err, reply) {
    if (err) {
        reply({
            "error": err
        }).code(500);
    }
};

module.exports.derp = function(reply) {
    reply("derp....");
}