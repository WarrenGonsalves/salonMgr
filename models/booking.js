var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// schema
var bookingSchema = new Schema({
    specialist_id: String,
    book_date: Date,
    cust_id: String,
    job_id: String,
    active: {
        type: Boolean,
        default: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    services: [{
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'service'},
            attribute1: String,
            attribute2: String
        }],
    practitioner: {type: mongoose.Schema.Types.ObjectId, ref: 'practitioner' },
    price: Number
})

// export
module.exports = mongoose.model('booking', bookingSchema);
module.exports.schema = bookingSchema;