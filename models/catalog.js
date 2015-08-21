var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var catalogSchema = new Schema({
<<<<<<< HEAD
    specialist_id: String,
    name: String,
    detail: String,
    price: Number,
    icon_size_image: String,
    medium_image: String,
    active: {
        type: Boolean,
        default: true
=======
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
>>>>>>> 26bf8858c57c88ab34ff16a23f9d41f9f43974c2
    }
});

// export
module.exports = mongoose.model('catalog', catalogSchema);
module.exports.schema = catalogSchema;