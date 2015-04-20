var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var invoiceSchema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'job'
    },
    specialist: {
        type: Schema.Types.ObjectId,
        ref: 'specialist'
    },
    customer_id: String,
    line_items: [{
        item: String,
        amount: Number
    }],
    total: Number,
    quantity: Number,
    accepted: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    accepted_date: Date
})

// export
module.exports = mongoose.model('invoice', invoiceSchema);
module.exports.schema = invoiceSchema;