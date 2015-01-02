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

// export
module.exports = mongoose.model('logger', loggerSchema);
module.exports.schema = loggerSchema;