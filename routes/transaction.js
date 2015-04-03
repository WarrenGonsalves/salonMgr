var CALLBACK_URL = '/hawaii';
var BASE_URL = '/tnxs';
var controller = require('../controller/transaction');

module.exports = function() {
    return [
        /**
         * @api {post} /tnxs Transaction: callback url
         * @apiName newTransaction
         * @apiGroup Transaction
         *
         * @apiExample Example usage:
         * /tnxs
         *
         * @apiParam {String} job_id        Job id [POST parameter]
         * @apiParam {String} amount        amount to be charged to customer [POST parameter]
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