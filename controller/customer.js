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

module.exports = new CustomerController();