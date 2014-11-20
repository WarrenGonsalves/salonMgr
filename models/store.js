var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var storeSchema = new Schema({
    name: String,
    ph: Number,
    contact_name: String,
    lat: Number,
    lng: Number,
    created_date: {
        type: Date,
        default: Date.now()
    }
})

// export
module.exports = mongoose.model('store', storeSchema);
module.exports.schema = storeSchema;