var db = require("../db");
var util = require("../util");
var config = require("../config/constants");

function BookingController() {};

/**
 * Get Booking
 */
BookingController.prototype.getConfigHandler = {
    handler: function(request, reply) {

        var query_param = {};

        if (!(request.query.customer === undefined)) {
            query_param['cust_id'] = request.query.customer;
        }

         if (!(request.query._id === undefined)) {
            query_param['_id'] = request.query._id;
        }

        if (!(request.query.cust_id === undefined)) {
            query_param['cust_id'] = request.query.cust_id;
        }

        if (!(request.query.complete === undefined)) {
            query_param['complete'] = request.query.complete;
        }
        console.log("query_param "  + JSON.stringify(request.query._id));

        // TODO sort by book date.
        db.booking.find(query_param).sort('book_date')
        .populate('specialist_id', null, 'studio')
        // .populate('service', null, 'category')
        .exec(function (err, bookings) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }
            console.log("GET BOOKING");
            console.log(bookings);
            reply({
                bookinglist: bookings
            });
        });
    }
};

module.exports = new BookingController();