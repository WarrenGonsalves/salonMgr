var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema({
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
});

// export
module.exports = mongoose.model('order', orderSchema);
module.exports.schema = orderSchema;