var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var counter = require('./counter');
var db = require('../db');

// schema
var bookingSchema = new Schema({
    studio_id: {type: mongoose.Schema.Types.ObjectId, ref: 'studio' },
    book_date: Date,
    cust_id: {type: mongoose.Schema.Types.ObjectId, ref: 'customer' },
    booking_no: String,
    job_ids: [{type: mongoose.Schema.Types.ObjectId, ref: 'job' }],
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
            title: String,
            price: Number
        }],
    practitioner: {type: mongoose.Schema.Types.ObjectId, ref: 'practitioner' },
    price: Number
})

// methods
bookingSchema.methods.setBookingNo = function(cb) {

    var currBooking = this;

    db.counter.getNextBooking(function(err, count) {
        currBooking.booking_no = count;
        currBooking.save(function (err, booking) {
            cb(booking);
        });
    });
}

bookingSchema.methods.getBookingNo = function() {
    return this.booking_no;
}

// export
module.exports = mongoose.model('booking', bookingSchema);
module.exports.schema = bookingSchema;