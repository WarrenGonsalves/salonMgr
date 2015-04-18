var CALLBACK_URL = '/hawaii';
var BASE_URL = '/txns';
var controller = require('../controller/transaction');

module.exports = function() {
    return [
        /**
         * @api {post} /txns Transaction: new transaction data
         * @apiName newTransaction
         * @apiGroup Transaction
         *
         * @apiExample Example usage:
         * /txns
         *
         * @apiParam {String} job_id        Job id [POST parameter]
         * @apiParam {String} amount        amount to be charged to customer [POST parameter]
         * @apiParam {String} channel_id    either WAP or WEB [POST parameter]
         */
        {
            method: 'POST',
            path: BASE_URL,
            config: controller.postHandler
        },
        /**
         * @api {post} /hawaii Transaction: callback url
         * @apiName callbackTransaction
         * @apiGroup Transaction
         *
         * @apiExample Example usage:
         * /hawaii
         */
        {
            method: 'POST',
            path: CALLBACK_URL,
            config: controller.hawaiiHandler
        }
    ];
}();