var _ = require('underscore');

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var loggerSchema = new Schema({
    level: String,
    tag: String,
    log: String,
    data: String,
    created_date: {
        type: Date,
        default: Date.now()
    }
});

var loggerModel = mongoose.model('logger', loggerSchema);

function createLog(level, tag, log, data_obj) {
    var logger = new loggerModel();
    logger.level = level;
    logger.tag = tag;

    if (log instanceof Array) {
        _.each(log, function(log) {
            logger.log = logger.log + " : " + JSON.stringify(log);
        });
    } else {
        logger.log = JSON.stringify(log);
    }

    logger.data = JSON.stringify(data_obj);
    logger.save();
    console.log(Date.now(), tag, log);
}

module.exports.info = function(tag, log, data_obj) {
    createLog('info', tag, log, data_obj);
};

module.exports.debug = function(tag, log, data_obj) {
    createLog('debug', tag, log, data_obj);
};

module.exports.err = function(tag, log, data_obj) {
    createLog('err', tag, log, data_obj);
}