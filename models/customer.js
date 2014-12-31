var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var customerSchema = new Schema({
    name: String,
    ph: String,
    addr: String,
    apn_id: String,
    gcm_id: String,
    isSP: {
        type: Boolean,
        default: false
    },
    isAuth: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
})

// export
module.exports = mongoose.model('customer', customerSchema);
module.exports.schema = customerSchema;