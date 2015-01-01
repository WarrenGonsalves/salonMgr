var BASE_URL = '/invoices';
var controller = require('../controller/invoice');

module.exports = function() {
    return [
        /**
         * @api {get} /invoices Invoice: get all
         * @apiName getInvoices
         * @apiGroup Invoice
         *
         * @apiExample Example usage:
         * /invoices
         * /invoices?id=54a53db2c879ab0b8c5ea911
         */
        {
            method: 'GET',
            path: BASE_URL,
            config: controller.getConfigHandler
        },
        /**
         * @api {post} /invoices Invoice: new invoice
         * @apiName postInvoices
         * @apiGroup Invoice
         *
         * @apiParam {String} job_id        Job id for invoice [Post parameter]
         * @apiParam {String} total         Total amount for invoice [Post parameter]
         * @apiParam {String} line_item[]   {item:'fixers', amount: 6000} [Post parameter] - repeate key / value for multiple line items.
         *
         * @apiExample Example usage:
         * /invoices
         */
        {
            method: 'POST',
            path: BASE_URL,
            config: controller.postConfigHandler
        }
    ];
}();