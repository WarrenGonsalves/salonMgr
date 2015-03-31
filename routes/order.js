var db = require('../db');
var BASE_URL = '/orders';

var OrderController = require('../controller/order');

module.exports = function () {
    return [
        /**
         * @api {get} /orders Order: get order
         * @apiName getOrders
         * @apiGroup Order
         *
         * @apiExample Example usage:
         * /orders //will return all orders
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: OrderController.getAllOrders
        }
    ];
}();