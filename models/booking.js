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
    }
})

// export
module.exports = mongoose.model('booking', bookingSchema);
module.exports.schema = bookingSchema;