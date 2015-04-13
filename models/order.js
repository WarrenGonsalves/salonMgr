var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema({
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
});

// export
module.exports = mongoose.model('order', orderSchema);
module.exports.schema = orderSchema;