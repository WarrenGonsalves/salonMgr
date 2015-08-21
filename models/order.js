var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema({
<<<<<<< HEAD
    job_id: String,
    total_price: {
        type: Number,
        default: 0
    },
    total_quantity: {
        type: Number,
        default: 0
    },
    line_items: [Schema.Types.Mixed]
=======
    total_price: {
            type: String,
            required: true
        },
    total_quantity: {
            type: String,
            required: true
        },
    line_items: [{
        catalog_id: {
            type: String,
            required: true
        },
        specialist_id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        detail: String,
        price: {
            type: String,
            required: true
        },
        icon_size_image: {
            type: String,
            required: true
        }, 
        medium_image: {
            type: String,
            required: true
        }
    }]
>>>>>>> 26bf8858c57c88ab34ff16a23f9d41f9f43974c2
});

// export
module.exports = mongoose.model('order', orderSchema);
module.exports.schema = orderSchema;