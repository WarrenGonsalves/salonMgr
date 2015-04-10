var db = require('../db');
var BASE_URL = '/orders';

var OrderController = require('../controller/order');

module.exports = function() {
    return [
        /**
         * @api {get} /orders Order: get orders
         * @apiName getOrders
         * @apiGroup Order
         *
         * @apiExample Example usage:
         * /orders
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: OrderController.getHandler
        },
        /**
         * @api {post} /orders Order: create Order
         * @apiName postOrder
         * @apiGroup Order
         *
         * @apiParam {String} _id               Order id [Post parameter]
         * @apiParam {String} catalog_ids       Catalog ids [Post parameter] // comma-separated string
         */
        {
            method: 'POST',
            path: BASE_URL,
            config: OrderController.postHandler
        }
    ];
}();