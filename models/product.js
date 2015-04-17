var mongoose = require("mongoose")
var Schema = mongoose.Schema

var productSchema = new Schema({
    specialist_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    detail: String,
    group: String,
    price: {
        type: Number,
        required: true
    },
    img_s: String,
    img_l: String,
    active: {
        type: Boolean,
        default: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
    id: false
})

// export
module.exports = mongoose.model('product', productSchema);
module.exports.schema = productSchema;