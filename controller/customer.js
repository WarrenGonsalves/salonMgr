var db = require("../db");

function CustomerController() {};

/**
 * Get all customers
 */
CustomerController.prototype.getConfigHandler = {
    handler: function(request, reply) {

        db.customer.find({}, function(err, data) {
            console.log("getting all customers ");
            reply(data);
        });
    }
};

CustomerController.prototype.pushNotificationConfigHandler = {
    handler: function(request, reply) {

        db.customer.findById(request.params.customer_id, function(err, customer) {

            if (err) {
                reply(err).code(510);
                return;
            }

            if (customer === null) {
                reply("customer not found ").code(510);
                return;
            }

            if (!(request.payload.gcm_id === undefined)) {
                customer.gcm_id = request.payload.gcm_id;
            }

            if (!(request.payload.apn_id === undefined)) {
                customer.apn_id = request.payload.apn_id;
            }

            customer.save();

            console.log("setting pushnotification key for customer: " + customer._id);

            reply(customer);
        });
    }
};

module.exports = new CustomerController();