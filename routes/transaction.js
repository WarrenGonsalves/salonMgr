var BASE_URL = '/transactions';
var controller = require('../controller/transaction');

module.exports = function() {
    return [
        /**
         * @api {post} /transactions Transaction: callback url
         * @apiName processTransaction
         * @apiGroup Transaction
         *
         * @apiExample Example usage:
         * /transactions
         */
        {
            method: 'POST',
            path: BASE_URL,
            config: controller.postTransactionHandler
        }
    ];
}();