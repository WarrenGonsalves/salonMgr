var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var authCodeSchema = new Schema({
    ph: String,
    code: String,
    active: {
        type: Boolean,
        default: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
})

// export
module.exports = mongoose.model('authCode', authCodeSchema);
module.exports.schema = authCodeSchema;