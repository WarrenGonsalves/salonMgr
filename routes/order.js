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
         * @api {post} /orders/customer Order: Order for customer
         * @apiName postOrderForCustomer
         * @apiGroup Order
         *
         * @apiParam {String} customer_id               customer id [Json Post parameter]
         * @apiParam {String} specialist_id             specialist id [Json Post parameter]
         * @apiParam {String} line_items                line item [Json Post parameter]
         * @apiParam {String} line_items.product_id     product_id child tag of line_item [Json Post parameter]
         * @apiParam {String} line_items.quantity       quantify child tag of line_item [Json Post parameter]
         *
         */
        {
            method: 'POST',
            path: BASE_URL + '/customer',
            config: OrderController.custOrderHandler
        },
        /**
         * @api {post} /orders/job Order: Order for job
         * @apiName postOrderForJob
         * @apiGroup Order
         *
         * @apiParam {String} job_id                    job id [Json Post parameter]
         * @apiParam {String} line_items                line item [Json Post parameter]
         * @apiParam {String} line_items.product_id     product_id child tag of line_item [Json Post parameter]
         * @apiParam {String} line_items.quantity       quantify child tag of line_item [Json Post parameter]
         */
        {
            method: 'POST',
            path: BASE_URL + '/job',
            config: OrderController.custOrderHandler
        }
    ];
}();