module.exports.ifError = function(err, reply) {
    if (err) {
        reply({
            "error": err
        });
    }
};

module.exports.derp = function(reply) {
    reply("derp....");
}