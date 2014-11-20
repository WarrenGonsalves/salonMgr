var db = require("../db");

function StoreController() {};

/**
 * [postConfigHandler: helper method to create a dummy sepcialist record]
 * @type {Object}
 */
StoreController.prototype.getConfigHandler = {
    handler: function(request, reply) {

        db.store.find({}, function(err, data) {
            console.log("getting all stores ");
            reply(data);
        });
    }
};

module.exports = new StoreController();