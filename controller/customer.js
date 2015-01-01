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

            var pushNotificationIdReceived = false;

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
                pushNotificationIdReceived = true;
            }

            if (!(request.payload.apn_id === undefined)) {
                customer.apn_id = request.payload.apn_id;
                pushNotificationIdReceived = true;
            }

            if (!pushNotificationIdReceived) {
                reply("Provide valid GCM or APN Id as POST parameter ").code(510);
                return;
            }

            customer.save();

            console.log("setting pushnotification key for customer: " + customer._id + " : " + customer.gcm_id||customer.apn_id);
            reply(customer);
        });
    }
};

module.exports = new CustomerController();