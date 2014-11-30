var BASE_URL = '/customers';
var CustomerController = require('../controller/customer');

module.exports = function() {
    return [
        /**
         * @api {get} /customers Customer: get all
         * @apiName customerGet
         * @apiGroup customer
         *
         * @apiExample Example usage:
         * /customers
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: CustomerController.getConfigHandler
        }
    ];
}();