var db = require('../db');
var BASE_URL = '/order';

var OrderController = require('../controller/order');

module.exports = function () {
    return [
        /**
         * @api {get} /orders Order: get order
         * @apiName getOrders
         * @apiGroup Order
         *
         * @apiExample Example usage:
         * /order //will return all orders
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: OrderController.getAllOrders
        }
    ];
}();