var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    total_price: String,
    total_quantity: String,
    line_items: [{
        catalog_id: String,
        specialist_id: String,
        name: String,
        detail: String,
        price: Number,
        icon_size_image: String, 
        medium_image: String
    }]
});

// export
module.exports = mongoose.model('order', orderSchema);
module.exports.schema = orderSchema;