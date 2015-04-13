var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var catalogSchema = new Schema({
    specialist_id: {
            type: String,
            required: true
        },
    name: {
            type: String,
            required: true
        },
    detail: {
            type: String,
            required: true
        },
    price: {
            type: Number,
            required: true
        },
    icon_size_image: {
            type: String,
            required: true
        }, 
    medium_image: {
            type: String,
            required: true
        },
    delete_status: {
        type: Number,
        default: 0
    }
});

// export
module.exports = mongoose.model('catalog', catalogSchema);
module.exports.schema = catalogSchema;