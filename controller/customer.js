var db = require('../db');
var util = require('../util');

function CustomerController() {};

/**
 * Get all customers
 */
CustomerController.prototype.getConfigHandler = {
    handler: function(request, reply) {

        db.customer.find({}, function(err, data) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            reply(data);
        });
    }
};

CustomerController.prototype.pushNotificationConfigHandler = {
    handler: function(request, reply) {

        if (request.params.customer_id === undefined) {
            util.reply.error("Invalid customer_id", reply);
            return;
        }

        db.customer.findById(request.params.customer_id, function(err, customer) {

            var pushNotificationIdReceived = false;

            if (err) {
                util.reply.error(err, reply);
                return;
            }

            if (customer === null) {
                util.reply.error("customer not found for Id: " + request.params.customer_id, reply);
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
                util.reply.error("Invalid gcm_id / apn_id", reply);
                return;
            }

            customer.save();
            util.logger.info("customer", ["gcm_id", customer.gcm_id, "apn_id", customer.apn_id], customer);

            reply(customer);
        });
    }
};

module.exports = new CustomerController();