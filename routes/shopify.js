var BASE_URL = '/shopify';
var ADMIN_BASE_URL = '/admin/interface/shopify'
var controller = require('../controller/shopify');

module.exports = function() {
    return [
        /**
         * @api {post} /admin/interface/shopify/reload/customer Interface: reload customer
         * @apiName interfaceCustomer
         * @apiGroup interface
         *
         * @apiExample Example usage:
         * /admin/interface/shopify/reload/customer
         */
        {
            method: 'POST',
            path: ADMIN_BASE_URL + '/reload/customer',
            config: controller.reloadCustomerHandler
        },
        /**
         * @api {post} /admin/interface/shopify/reload/specialist Interface: reload specialist
         * @apiName interfaceSpecialist
         * @apiGroup interface
         *
         * @apiExample Example usage:
         * /admin/interface/shopify/reload/specialist
         */
        {
            method: 'POST',
            path: ADMIN_BASE_URL + '/reload/specialist',
            config: controller.reloadSpecialistHandler
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
        },
        /**
         * @api {get} /shopify/customers Shopify:
         * @apiName shopifyCustomers
         * @apiGroup Shopify
         *
         * @apiExample Example usage:
         * /shopify/customers
         */
        {
            method: 'POST',
            path: BASE_URL + '/orders',
            config: controller.postOrderHandler
        }
    ];
}();