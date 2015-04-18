var mongoose = require("mongoose")
var Schema = mongoose.Schema

var imageSchema = new Schema({
    name: String,
    image: String,
    active: {
        type: Boolean,
        default: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

// export
module.exports = mongoose.model('image', imageSchema);
module.exports.schema = imageSchema;