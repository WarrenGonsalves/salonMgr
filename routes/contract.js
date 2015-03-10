var BASE_URL = '/contracts';
var controller = require('../controller/contract');

module.exports = function() {
    return [
        /**
         * @api {get} /contracts Contracts: get all
         * @apiName getContracts
         * @apiGroup Contract
         *
         * @apiExample Example usage:
         * /contracts
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: controller.getHandler
        },
        /**
         * @api {post} /contracts Contracts: create
         * @apiName postContracts
         * @apiGroup Contracts
         * @apiParam {String} customer_id                   Customer id [Post parameter]
         * @apiParam {file} img                             image for contract [Post parameter]
         *
         * @apiExample Example usage:
         * /contracts
         */
        {
            method: 'POST',
            path: BASE_URL,
            config: controller.postHandler
        }
    ];
}();