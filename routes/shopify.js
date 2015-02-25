var BASE_URL = '/shopify';
var ADMIN_BASE_URL = '/admin/interface/shopify'
var controller = require('../controller/shopify');

module.exports = function() {
    return [
        /**
         * @api {get} /admin/interface/shopify/reload/customers Interface: reload customers
         * @apiName interfaceCustomer
         * @apiGroup interface
         *
         * @apiExample Example usage:
         * /admin/interface/shopify/reload/customer
         */
        {
            method: 'POST',
            path: ADMIN_BASE_URL + '/reload/customers',
            config: controller.reloadCustomerHandler
        }, {
            method: 'GET',
            path: ADMIN_BASE_URL + '/customers',
            config: controller.getCustomersHandler
        }
    ];
}();