var BASE_URL = '/shopify';
var ADMIN_BASE_URL = '/admin/interface/shopify'
var controller = require('../controller/shopify');

module.exports = function() {
    return [
        /**
         * @api {post} /admin/interface/shopify/reload/customers Interface: reload customers
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
        },
        /**
         * @api {get} /shopify/customers Shopify: customers
         * @apiName shopifyCustomers
         * @apiGroup Shopify
         *
         * @apiExample Example usage:
         * /shopify/customers
         */
        {
            method: 'GET',
            path: BASE_URL + '/customers',
            config: controller.getCustomersHandler
        }
    ];
}();