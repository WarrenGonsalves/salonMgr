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

CustomerController.prototype.putConfigHandler = {
    handler: function(request, reply) {

        if (request.payload.id === undefined) {
            util.reply.error("Provide valid customer id", reply);
            return;
        }

        if (request.payload.phone === undefined) {
            util.reply.error("Provide valid customer phone", reply);
            return;
        }

        db.customer.findById(request.payload.id, function(err, data) {
            if (err) {
                util.reply.error(err, reply);
                return;
            }

            data.ph = request.payload.phone;
            data.save();

            reply(data);
        });
    }
};

CustomerController.prototype.secretHandler = {
    handler: function(request, reply) {

        var isValidId = false;
        queryParams = {};

        if (!(request.payload.phone === undefined)) {
            queryParams['ph'] = request.payload.phone;
            isValidId = true;
        }

        if (!(request.payload.email === undefined)) {
            queryParams['email'] = request.payload.email;
            isValidId = true;
        }

        if (!(request.payload.customer_id === undefined)) {
            queryParams['_id'] = request.payload.customer_id;
            isValidId = true;
        }

        if (!isValidId) {
            util.reply.error("why u no give valid id :(", reply);
            return;
        }

        if (request.payload.secret === undefined) {
            util.reply.error("Provide secret to validate", reply);
            return;
        }

        util.logger.info("Customer", ["secret Handler", queryParams]);

        db.customer.findOne(queryParams, function(err, customer) {
            if (customer == null) {
                util.reply.error("No customer found for given criteria", reply);
                return;
            }

            if (customer.isValidSecret(request.payload.secret))
                reply(customer);
            else {
                util.reply.error("Invalid user and/or secret", reply);
            }
        });
    }
}

CustomerController.prototype.secretUpdateHandler = {
    handler: function(request, reply) {

        if (request.payload.customer_id === undefined) {
            util.reply.error("why u no give valid id :(", reply);
            return;
        }

        if (request.payload.old_secret === undefined) {
            util.reply.error("Provide secret to validate", reply);
            return;
        }

        if (request.payload.new_secret === undefined) {
            util.reply.error("Provide secret to set", reply);
            return;
        }

        db.customer.findById(request.payload.customer_id, function(err, customer) {
            if (customer == null) {
                util.reply.error("No customer found for given criteria", reply);
                return;
            }

            if (customer.isValidSecret(request.payload.old_secret)) {
                customer.setSecret(request.payload.new_secret)
                reply(customer);
            } else {
                util.reply.error("Invalid user and/or secret", reply);
            }
        });
    }
}

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