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
        },
        /**
         * @api {get} /orders/{_id} Order: get order
         * @apiName getOrdersById
         * @apiGroup Order
         *
         * @apiExample Example usage:
         * /orders/551a559ec3ca9c5c1aad9b0d
         */
        {
            method: 'GET',
            path: BASE_URL+'/{_id}',
            config: OrderController.getOrderById
        },
        /**
         * @api {put} /orders
         * @apiName updateOrder
         * @apiGroup Order
         *
         * @apiParam {String} _id               Order id [Post parameter]
         * @apiParam {String} catalog_ids       Catalog ids [Post parameter] // comma-separated string
         */
        {
            method: 'PUT',
            path: BASE_URL,
            config: OrderController.updateOrder
        }
    ];
}();