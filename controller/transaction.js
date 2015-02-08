var db = require('../db');
var util = require('../util');
var _ = require('underscore');

// Controller
function TransactionController() {};

TransactionController.prototype.postTransactionHandler = {
    handler: function(request, reply) {

        util.logger.info("Transaction", ["paytm callback" , JSON.stringify(request.payload)]);
        reply("ok");
    }
};

module.exports = new TransactionController();