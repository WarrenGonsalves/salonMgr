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
         * /contracts?customer_id=54fc5a41c4ee2a000025737c
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
        },
        /**
         * @api {post} /contracts Contracts: update
         * @apiName putContracts
         * @apiGroup Contracts
         * @apiParam {String} customer_id                   Customer id [Post parameter]
         * @apiParam {String} contract_type                   Customer id [Post parameter]
         * @apiParam {String} device_type                   Customer id [Post parameter]
         * @apiParam {String} vendor                   Customer id [Post parameter]
         * @apiParam {String} phone                   Customer id [Post parameter]
         * @apiParam {String} start_date                   Customer id [Post parameter]
         * @apiParam {String} end_date                   Customer id [Post parameter]
         * 
         *
         * @apiExample Example usage:
         * /contracts
         */
        {
            method: 'PUT',
            path: BASE_URL + '/{id}',
            config: controller.putHandler
        }
    ];
}();